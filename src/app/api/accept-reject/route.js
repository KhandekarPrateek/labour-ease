import { sql } from '@vercel/postgres';

export async function POST(req) {
  try {
    const { action, applicantId, jobPostingId, shopkeeperId } = await req.json();

    if (!jobPostingId || !shopkeeperId || (action && !['accept', 'reject', 'fetch'].includes(action))) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), { status: 400 });
    }

    if (action === 'fetch') {
      const acceptedApplicants = await sql`
        SELECT labour_id FROM works_for
        WHERE job_posting_id = ${jobPostingId} AND shopkeeper_id = ${shopkeeperId}
      `;

      return new Response(JSON.stringify({ acceptedApplicants: acceptedApplicants.rows }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle accepting applicants
    if (action === 'accept') {
      const existingEntry = await sql`
        SELECT 1 FROM works_for
        WHERE labour_id = ${applicantId} AND job_posting_id = ${jobPostingId} AND shopkeeper_id = ${shopkeeperId}
      `;

      if (existingEntry.rowCount > 0) {
        return new Response(JSON.stringify({ message: 'Applicant already accepted' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await sql`
        INSERT INTO works_for (labour_id, job_posting_id, shopkeeper_id)
        VALUES (${applicantId}, ${jobPostingId}, ${shopkeeperId})
      `;

      return new Response(JSON.stringify({ message: 'Applicant accepted and added to works_for' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Handle rejecting applicants
    if (action === 'reject') {
      const deleteResult = await sql`
        DELETE FROM labour_has_applied
        WHERE labour_id = ${applicantId} AND job_posting_id = ${jobPostingId}
      `;

      if (deleteResult.rowCount === 0) {
        return new Response(JSON.stringify({ message: 'No matching applicant found to reject' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

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
