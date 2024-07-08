import { renderToString } from "react-dom/server";
import express from "express";
import App from "./src/App";
import Teste from "./src/Teste";
import PokePage from "./PokePage";

const app = express();
app.use("/src", express.static("src"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const html = renderToString(App());
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React SSR</title>
            <link rel="stylesheet" href="/src/index.css" />
            <script src="https://unpkg.com/htmx.org@latest/dist/htmx.js"></script>
        </head>
        <body>
            <div id="root">${html}</div>
            <script type="module" src="/src/main.tsx"></script>
        </body>
        </html>
    `);
});

app.get("/api", (req, res) => {
  console.log("GET /api");
  const html = renderToString(Teste());
  res.send(html);
});

app.get("/api/poke", async (req, res) => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const json = await data.json();
  res.send(renderToString(PokePage(json)));
});

app.post("/api/form", async (req, res) => {
  console.log(req.body);
  try {
    const data = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + req.body.pokeName
    );
    const json = await data.json();
    res.send(renderToString(PokePage(json)));
  } catch (e) {
    res.send("Pokemon not found");
  }
});

app.listen(3000);
