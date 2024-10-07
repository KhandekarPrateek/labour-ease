import { sql } from '@vercel/postgres';

export async function POST(req) {
  try {
    const { shopkeeper_id } = await req.json();

    if (!shopkeeper_id) {
      return new Response(JSON.stringify({ error: 'Shopkeeper ID is required' }), { status: 400 });
    }

    const result = await sql`
      SELECT 
        job_postings.id AS job_posting_id,
        job_postings.title AS job_title,
        ARRAY_AGG(labour_has_applied.labour_id) AS applicant_ids
      FROM job_postings
      LEFT JOIN labour_has_applied ON job_postings.id = labour_has_applied.job_posting_id
      WHERE job_postings.shopkeeper_id = ${shopkeeper_id}
      GROUP BY job_postings.id, job_postings.title
      ORDER BY job_postings.id
    `;

    const jobPostings = result.rows.map(row => ({
      job_posting_id: row.job_posting_id,
      job_title: row.job_title,
      applicants: row.applicant_ids.filter(id => id !== null)  // Filter out null values
    }));

    return new Response(JSON.stringify({ job_postings: jobPostings }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching job postings and applicants:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while fetching data' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}