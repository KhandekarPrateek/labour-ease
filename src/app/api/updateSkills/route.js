import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const body = await request.json();
    const { labour_id, skills } = body; // Expect labour_id and skills array
    console.log(body); 
    if (!labour_id || !Array.isArray(skills)) {
      return new Response(
        JSON.stringify({ message: "Labour ID and skills are required" }),
        { status: 400 }
      );
    }

    // First, clear existing skills for this labour_id
    await sql`DELETE FROM labour_has_skills WHERE labour_id = ${labour_id};`;

    // Insert the new set of skills
    for (const skill_id of skills) {
      await sql`INSERT INTO labour_has_skills (labour_id, skill_id) VALUES (${labour_id}, ${skill_id});`;
    }

    return new Response(
      JSON.stringify({ message: "Skills updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update skills" }),
      { status: 500 }
    );
  }
}
