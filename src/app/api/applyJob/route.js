import { sql } from '@vercel/postgres';

// Named export for the POST method
export async function POST(req) {
  try {
    const { jobId, labourId } = await req.json(); // Use req.json() instead of req.body in Next.js

    if (!jobId || !labourId) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Check if the labourId and jobId combination already exists
    const existingApplication = await sql`
      SELECT * FROM labour_has_applied
      WHERE labour_id = ${labourId} AND job_posting_id = ${jobId}
    `;

    if (existingApplication.rowCount > 0) {
      // If the application already exists, return an error response
      return new Response(
        JSON.stringify({ message: 'You have already applied for this job.' }),
        { status: 409 } // 409 Conflict status code
      );
    }

    // Insert into the database using a SQL query
    await sql`
      INSERT INTO labour_has_applied (labour_id, job_posting_id)
      VALUES (${labourId}, ${jobId})
    `;

    // Fetching the result for confirmation or logging (optional)
    

    return new Response(JSON.stringify({ message: 'Application submitted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error submitting application:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
