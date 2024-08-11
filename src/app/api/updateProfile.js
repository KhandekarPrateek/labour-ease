import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { shopName, email, address, bio } = req.body;

    try {
      // Check if the user exists
      const user = await sql`
        SELECT * FROM users
        WHERE email = ${email}
      `;
      //considering email as the primary key here for the time being

      if (user.length > 0) {
        // Update the user's profile information
        await sql`
          UPDATE users
          SET shop_name = ${shopName}, address = ${address}, bio = ${bio}
          WHERE email = ${email}
        `;

        res.status(200).json({ message: "Profile updated successfully" });
      } else {
        // User not found
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
