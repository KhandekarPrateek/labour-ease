import { sql } from "@vercel/postgres";

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
  const { username, password, email, role } = await req.json();
  const userId = generateUserId(email);

  try {
    // Check if the user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.rowCount > 0) {
      return new Response(JSON.stringify({ error: "User already registered" }), {
        status: 409, // Conflict status code
      });
    }

    // If user doesn't exist, proceed with registration
    await sql`
      INSERT INTO users (id, username, password, email, role)
      VALUES (${userId}, ${username}, ${password}, ${email}, ${role})
    `;
    if (role === 'shopkeeper') {
      await sql`
        INSERT INTO shopkeepers (id, shop_name, shop_address, shop_phone, bio)
        VALUES (${userId}, 'Edit', 'Edit', 'Edit','Edit')
      `;
    }
    if (role === 'labour') {
      await sql`
        INSERT INTO labours (id, name, phone, address, experience)
        VALUES (${userId}, 'Edit', 'Edit', 'Edit','Edit')
      `;
    }
    return new Response(JSON.stringify({ message: "User registered successfully", userId }), {
      status: 200,
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
    });
  }
}