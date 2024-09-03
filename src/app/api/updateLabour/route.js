// app/api/updateLabour/route.js

import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');


  try {
    const result = await sql`
      SELECT * FROM labours
      WHERE id = ${id}
    `;

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ message: 'employee not found' }, { status: 404 });
    }
  } catch (error) {
    console.log("error from get");
    return NextResponse.json({ message: 'Error fetching labour data', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { id, name, phone, address, experience } = await request.json();
  console.log("from backend", id);
  if (!id) {
    return NextResponse.json({ message: 'id is required' }, { status: 400 });
  }
  try {
    // Check if the id exists in the users table
    const userExists = await sql`
      SELECT 1
      FROM users
      WHERE id = ${id}
    `;

    if (userExists.rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the labours table
    const result = await sql`
      UPDATE labours
      SET 
        name = ${name},
        phone = ${phone},
        address = ${address},
        experience = ${experience}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length > 0) {
      return NextResponse.json({ message: 'Profile updated successfully', data: result.rows[0] });
    } else {
      return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
    }
  } catch (error) {
    console.log("error from post");
    return NextResponse.json({ message: 'Error updating labour data', error: error.message }, { status: 500 });
  }
}