import { sql } from "@vercel/postgres";

// Fetch reviews for a specific shopkeeper
export async function POST(req) {
    try {
        const { shopkeeper_id } = await req.json();

        // Fetch reviews for the specified shopkeeper ID
        const result = await sql`
            SELECT labour_id, rating, review, created_at
            FROM labour_reviews_shopkeeper
            WHERE shopkeeper_id = ${shopkeeper_id}
        `;

        // Check if reviews are found
        if (result.rows.length > 0) {
            return new Response(
                JSON.stringify({ reviews: result.rows }),
                { status: 200 }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "No reviews found for this shopkeeper." }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Database error:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch reviews" }),
            { status: 500 }
        );
    }
}
