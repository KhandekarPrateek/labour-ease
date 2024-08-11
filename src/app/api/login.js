import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if the user exists in the database
      const user = await sql`
        SELECT * FROM users
        WHERE email = ${email}
        AND password = ${password}
      `;

      if (user.length > 0) {
        // User exists, login successful
        res.status(200).json({ message: "Login successful" });
      } else {
        // User not found or password mismatch
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}