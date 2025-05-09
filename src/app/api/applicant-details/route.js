import { sql } from "@vercel/postgres";

export async function POST(req) {
  try {
    const { applicantId, jobPostingId } = await req.json();

    // Fetch labour details
    const result = await sql`
      SELECT id, name, phone, address, experience, created_at
      FROM labours
      WHERE id = ${applicantId}
    `;

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Applicant not found" }),
        { status: 404 }
      );
    }

    const labour = result.rows[0];

    // Format the response
    const applicantDetails = {
      id: labour.id,
      name: labour.name,
      phone: labour.phone,
      address: labour.address,
      experience: labour.experience,
      appliedAt: labour.created_at
    };

    return new Response(
      JSON.stringify(applicantDetails),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch applicant details" }),
      { status: 500 }
    );
  }
}