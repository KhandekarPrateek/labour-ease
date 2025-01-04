// Fetch ratings for a specific labourer
import { sql } from "@vercel/postgres";

export async function POST(req) {
  try {
    const { labour_id } = await req.json();

    // Updated query according to the schema provided
    const result = await sql`
      SELECT r.rating, r.review, s.shop_name  -- Changed s.name to s.shop_name
      FROM shopkeeper_reviews_labour r
      JOIN shopkeepers s ON r.shopkeeper_id = s.id
      WHERE r.labour_id = ${labour_id}
    `;

    return new Response(
      JSON.stringify({ ratings: result.rows }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch ratings" }),
      { status: 500 }
    );
  }
}
