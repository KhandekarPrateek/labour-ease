import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });
    // in future if we will use sessions
    response.cookies.delete('auth-token'); 
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error logging out', error: error.message }, { status: 500 });
  }
}
