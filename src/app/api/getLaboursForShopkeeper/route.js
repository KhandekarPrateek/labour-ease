// Fetch labours working for the shopkeeper
import { sql } from "@vercel/postgres";

export async function POST(req) {
    try {
        const { shopkeeper_id } = await req.json();

        // Query to fetch laborers working for the shopkeeper from works_for table
        const result = await sql`
            SELECT l.id AS labour_id, l.name, l.phone
            FROM works_for w
            JOIN labours l ON l.id = w.labour_id
            WHERE w.shopkeeper_id = ${shopkeeper_id}
        `;

        return new Response(
            JSON.stringify({ labours: result.rows }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching labours:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch labours" }),
            { status: 500 }
        );
    }
}
