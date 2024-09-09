import { sql } from "@vercel/postgres";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { jobId } = body;
    
    if (!jobId) {
      return new Response(
        JSON.stringify({ message: "Job ID is required" }),
        { status: 400 }
      );
    }

    console.log("Job ID to delete:", jobId);

    const result = await sql`
      DELETE FROM job_postings WHERE id = ${jobId} RETURNING *;
    `;

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Job posting not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Job posting deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete job posting" }),
      { status: 500 }
    );
  }
}
