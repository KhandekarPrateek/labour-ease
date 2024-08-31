import { sql } from "@vercel/postgres";
import Home from "./components/Home";

export default async function Main() {
  // try {
  //   // Insert into users table
  //   const userResult = await sql`
  //     INSERT INTO users (id, username, password, email, role)
  //     VALUES (299, 'john', '1234', 'john.shop@example.com', 'shopkeeper')
  //     ON CONFLICT (id) DO NOTHING
  //     RETURNING *;
  //   `;
    
  //   console.log("User inserted:", userResult.rows[0]);

  //   // Insert into shopkeepers table
  //   const shopkeeperResult = await sql`
  //     INSERT INTO shopkeepers (id, shop_name, shop_address, shop_phone)
  //     VALUES (299, 'John''s Shop', '123 Shop Street, Shop City', '9102934241')
  //     ON CONFLICT (id) DO NOTHING
  //     RETURNING *;
  //   `;

  //   console.log("Shopkeeper inserted:", shopkeeperResult.rows[0]);
  // } catch (error) {
  //   console.error("Error inserting data:", error);
  // }
  // const result = await sql`SELECT * FROM users`;
  // console.log(result);


  return (
    <main>
      <Home />
    </main>
  );
}