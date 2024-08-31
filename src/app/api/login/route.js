import { sql } from "@vercel/postgres";

// Define the generateUserId function outside the POST function
function generateUserId(email) {
  const localPart = email.split('@')[0];
  let hash = 5381;  // Initial value for DJB2 algorithm
  for (let i = 0; i < localPart.length; i++) {
    const char = localPart.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; // hash * 33 + char
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);  // Ensure positive value
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Generate the unique ID from the provided email
    const uniqueId = generateUserId(email);

    // Fetch user with the provided unique ID
    const result = await sql`
      SELECT * FROM users
      WHERE id = ${uniqueId}
    `;

    const user = result.rows[0]; // Get the user object

    if (user) {
      // Compare provided password with the plain text password in the database
      if (password === user.password) {
        return new Response(
          JSON.stringify({ message: "Login successful", role: user.role , userID:user.id }),
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