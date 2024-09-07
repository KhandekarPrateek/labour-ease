import { sql } from "@vercel/postgres";
export const fetchCache = "force-no-store"

export async function GET() {
 
  try {
    const result = await sql`
      SELECT 
    jp.id AS job_id,
    jp.title,
    jp.description,
    STRING_AGG(s.name, ', ') AS skills
FROM job_postings jp
LEFT JOIN posting_needs_skills pns ON jp.id = pns.job_posting_id
LEFT JOIN skills s ON pns.skill_id = s.id
GROUP BY jp.id, jp.title, jp.description;
    `;
    console.log("Query result:", result.rows);

    
    return new Response(
      JSON.stringify({ jobs: result.rows }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch job postings" }),
      { status: 500 }
    );
  }
}
