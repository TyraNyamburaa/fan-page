// app/page.js
import { items } from "./data";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";

export default function Home() {
  return (
    <main>
      <h1>🕹️ Welcome to Hogwarts library</h1>
      <p>
        Welcome to the land of the living! Abandon all hope, ye who enter here!
      </p>
      <CardGrid items={items} />
    </main>
  );
}
