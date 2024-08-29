// app/api/updateShopkeeper/route.js

import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const result = await sql`
      SELECT * FROM shopkeepers
      WHERE id = ${id}
    `;
    console.log(result);

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ message: 'Shopkeeper not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching shopkeeper data', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { id, shop_name, shop_address, shop_phone } = await request.json();

  try {
    const result = await sql`
      UPDATE shopkeepers
      SET 
        shop_name = ${shop_name},
        shop_address = ${shop_address},
        shop_phone = ${shop_phone},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length > 0) {
      return NextResponse.json({ message: 'Profile updated successfully', data: result.rows[0] });
    } else {
      return NextResponse.json({ message: 'Shopkeeper not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error updating shopkeeper data', error: error.message }, { status: 500 });
  }
}