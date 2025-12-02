const Home = () => {
  return (
    <>
      <div className="container">
        <div className="mb-5 mt-5 border">
          <h1>Header</h1>
          <p>Monitoring</p>
        </div>
        <div className="mb-5  grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>title</p>
              <p>Icone</p>
            </div>
            <div>
              <p>Price/data</p>
              <p>12%</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>title</p>
              <p>Icone</p>
            </div>
            <div>
              <p>Price/data</p>
              <p>12%</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>title</p>
              <p>Icone</p>
            </div>
            <div>
              <p>Price/data</p>
              <p>12%</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full p-5">
            <div className="flex justify-between  mb-5">
              <p>title</p>
              <p>Icone</p>
            </div>
            <div>
              <p>Price/data</p>
              <p>12%</p>
            </div>
          </div>
        </div>
        <div className=" border">
          <p>Tableau</p>
        </div>
      </div>
    </>
  );
};

export default Home;
