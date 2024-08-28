import { sql } from "@vercel/postgres";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Fetch user with the provided email
    const result = await sql`
      SELECT * FROM users
      WHERE email = ${email}
    `;

    const user = result.rows[0]; // Get the user object

    if (user) {
      // Compare provided password with the plain text password in the database
      if (password === user.password) {
        return new Response(
          JSON.stringify({ message: "Login successful",role:user.role }), 
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Invalid email or password" }), 
          { status: 401 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }), 
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to login" }), 
      { status: 500 }
    );
  }
}
