import { sql } from "@vercel/postgres";

export async function POST(req) {
  const { username, password, email, role } = await req.json();

  try {
    // Insert the new user into the database
    await sql`
      INSERT INTO users (username, password, email, role)
      VALUES (${username}, ${password}, ${email}, ${role})
    `;
    return new Response(JSON.stringify({ message: "User registered successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
}
