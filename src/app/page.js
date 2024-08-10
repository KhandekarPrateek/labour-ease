import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT * from users`;
  console.log(rows);
  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          <h1>{row.name}</h1>
        </div>
      ))}
    </div>
  );
}
