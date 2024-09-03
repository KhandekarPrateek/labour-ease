import { sql } from "@vercel/postgres";
import Home from "./components/Home";

export default async function Main() {
  const response=await sql`SELECT * FROM labours`;
  console.log(response);
  return (
    <main>
      <Home />
    </main>
  );
}