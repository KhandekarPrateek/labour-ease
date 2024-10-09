import { sql } from "@vercel/postgres";
import Home from "./components/Home";

export default async function Main() {
  
  return (
    <main>
      <Home />
    </main>
  );
}