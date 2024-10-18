import { sql } from "@vercel/postgres";

export async function GET(req) {
  try {
    // Fetch all shopkeepers from the database
    const result = await sql`
      SELECT id, shop_name FROM shopkeepers;
    `;
    
    const shopkeepers = result.rows; // Get the rows from the result

    return new Response(JSON.stringify(shopkeepers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch shopkeepers" }),
      { status: 500 }
    );
  }
}
