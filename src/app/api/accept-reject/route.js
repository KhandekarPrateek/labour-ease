import { sql } from '@vercel/postgres';

export async function POST(req) {
  try {
    const { action, applicantId, jobPostingId, shopkeeperId } = await req.json();

    if (!applicantId || !jobPostingId || !shopkeeperId || !['accept', 'reject'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    if (action === 'accept') {
      // Check if the applicant is already accepted
      const existingEntry = await sql`
        SELECT 1 FROM works_for
        WHERE labour_id = ${applicantId} AND job_posting_id = ${jobPostingId} AND shopkeeper_id = ${shopkeeperId}
      `;

      if (existingEntry.rowCount > 0) {
        // Entry already exists
        return new Response(JSON.stringify({ message: 'Applicant already accepted' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Insert into `works_for` table when accepting the applicant
      await sql`
        INSERT INTO works_for (labour_id, job_posting_id, shopkeeper_id)
        VALUES (${applicantId}, ${jobPostingId}, ${shopkeeperId})
      `;
      console.log('Applicant accepted and added to works_for');

      // Fetch and log the contents of the `works_for` table
      const result = await sql`
        SELECT * FROM works_for
        WHERE shopkeeper_id = ${shopkeeperId} AND job_posting_id = ${jobPostingId}
      `;
      console.log('Current contents of works_for table:', result.rows);

      return new Response(JSON.stringify({ message: 'Applicant accepted and added to works_for' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'reject') {
      // Remove from `labour_has_applied` when rejecting the applicant
      const deleteResult = await sql`
        DELETE FROM labour_has_applied
        WHERE labour_id = ${applicantId} AND job_posting_id = ${jobPostingId}
      `;

      // Check if any rows were deleted
      if (deleteResult.rowCount === 0) {
        // No rows were deleted
        return new Response(JSON.stringify({ message: 'No matching applicant found to reject' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Fetch and log the current state of the `labour_has_applied` table
      const result = await sql`
        SELECT * FROM labour_has_applied
      `;
      console.log('Current contents of labour_has_applied table:', result.rows);

      return new Response(JSON.stringify({ message: 'Applicant rejected and removed from labour_has_applied' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error handling applicant action:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
