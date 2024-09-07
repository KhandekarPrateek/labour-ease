import { sql } from "@vercel/postgres";
// export const fetchCache = "force-no-store"

export async function GET(request) {
 
  try {
    const url = new URL(request.url);
    const shopkeeperId = url.searchParams.get('shopkeeper_id');
    const result = await sql`
      Select
id,
shopkeeper_id,
title,
description
from job_postings  WHERE shopkeeper_id = ${shopkeeperId}   `;
    console.log("Query result:", result.rows);

    
    return new Response(
      JSON.stringify({ jobs: result.rows }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch job opeings" }),
      { status: 500 }
    );
  }
}
