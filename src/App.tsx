// import "./App.css";
function App() {
  return (
    <>
      <button hx-get="/api/poke">click me</button>
      <form>
        <input type="email" name="pokeName" />
        <button
          hx-post="http://localhost:3000/api/form"
          hx-target="#render"
          hx-swap="beforeend"
        >
          Submit
        </button>
      </form>
      <div id="render"></div>
    </>
  );
}

export default App;
