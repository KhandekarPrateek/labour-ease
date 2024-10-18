// Submit review for labour by shopkeeper
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { shopkeeper_id, labour_id, rating, review } = await req.json();

        // Insert the review into the shopkeeper_reviews_labour table
        const result = await sql`
            INSERT INTO shopkeeper_reviews_labour (shopkeeper_id, labour_id, rating, review, created_at, updated_at)
            VALUES (${shopkeeper_id}, ${labour_id}, ${rating}, ${review}, NOW(), NOW())
            ON CONFLICT (shopkeeper_id, labour_id) DO UPDATE 
            SET rating = EXCLUDED.rating, review = EXCLUDED.review, updated_at = NOW()
        `;

        return new Response(
            JSON.stringify({ message: "Review submitted successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error submitting review:", error);
        return new Response(
            JSON.stringify({ message: "Failed to submit review" }),
            { status: 500 }
        );
    }
}
