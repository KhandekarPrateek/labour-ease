import { sql } from "@vercel/postgres";

export async function POST(req) {
  try {
    const { shopkeeperId, labourId, rating, review } = await req.json();

    // Insert the review into the database
    const result = await sql`
      INSERT INTO labour_reviews_shopkeeper (shopkeeper_id, labour_id, rating, review)
      VALUES (${shopkeeperId}, ${labourId}, ${rating}, ${review})
      RETURNING *; 
    `;

    // You can also log the result if needed
    console.log("Review submitted:", result.rows[0]);

    return new Response(
      JSON.stringify({ message: "Review submitted successfully!" }),
      { status: 201 }  // 201 Created
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to submit review" }),
      { status: 500 }
    );
  }
}
