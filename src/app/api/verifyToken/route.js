import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { token } = await req.json();

    const decoded = jwt.verify(token, "your-secret-key");

    if (decoded) {
      return new Response(JSON.stringify({ valid: true }), { status: 200 });
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return new Response(JSON.stringify({ valid: false }), { status: 401 });
  }
}
