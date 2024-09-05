import { sql } from "@vercel/postgres";

function generateJobPostingId(shopkeeperId, title) {
    let hash = 5381;  // Initial value for DJB2 algorithm
    const input = shopkeeperId.toString() + title;
    
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) + hash) + char; // hash * 33 + char
      hash = hash & 0x7FFFFFFF; // Ensure positive 32-bit integer
    }
    
    // Ensure the result is within PostgreSQL INT range
    return hash % 2147483647; // 2147483647 is the max value for PostgreSQL INT
  }

export async function POST(req) {
  try {
    const { title, description, skills, userID } = await req.json();

    // Generate unique job posting ID
    const jobPostingId = generateJobPostingId(userID, title);

    // Insert into job_postings table
    await sql`
      INSERT INTO job_postings (id, shopkeeper_id, title, description)
      VALUES (${jobPostingId}, ${userID}, ${title}, ${description})
    `;

    // Insert into posting_needs_skills table
    for (const skillId of skills) {
      await sql`
        INSERT INTO posting_needs_skills (job_posting_id, skill_id)
        VALUES (${jobPostingId}, ${skillId})
      `;
    }

    return new Response(
      JSON.stringify({ message: "Job posting created successfully", id: jobPostingId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create job posting" }),
      { status: 500 }
    );
  }
}