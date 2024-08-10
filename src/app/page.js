




import Navbar from './components/Navbar';
import { sql } from "@vercel/postgres";
export default function Home() {
  const { rows } = await sql`SELECT * from users`;
  console.log(rows);
  return (
    <main>
        <Navbar/>
//     {rows.map((row) => (
//         <div key={row.id}>
//           <h1>{row.name}</h1>
//         </div>
//       ))}
    </main>

  );
}
