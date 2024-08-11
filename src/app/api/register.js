import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, createPassword, typeOfUser } = req.body;

    try {
      await sql`
        INSERT INTO users (firstName, lastName, email, password, typeOfUser)
        VALUES (${firstName}, ${lastName}, ${email}, ${createPassword}, ${typeOfUser})
      `;
      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}