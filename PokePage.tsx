const PokePage = (data: object) => {
  return (
    <div className="card">
      <h1>PokePage</h1>
      <img src={data.sprites.front_default} alt="" />
      <p>{data.name}</p>
    </div>
  );
};

export default PokePage;
