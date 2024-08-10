import { sql } from "@vercel/postgres";
import Home from "./components/Home";


export default async function Main() {
  const { rows } = await sql`SELECT * from users`;
  console.log(rows);
  return (
    <main>
      <Home />
      {/* {rows.map((row) => (
        <div key={row.id}>
          <h1>{row.name}</h1>
        </div>
      ))} */}
    </main>
  );
}
