const Statistics = () => {
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Most Requested Product</h2>
          <p className="text-2xl mt-2">Product A</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold">Least Requested Product</h2>
          <p className="text-2xl mt-2">Product B</p>
        </div>
      </div>
    </div>
  );
};
