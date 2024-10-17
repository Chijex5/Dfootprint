const DashboardOverview = () => {
  return (
    <div className="mx-10 p-8">
    <div className="grid grid-cols-3 gap-6">
        <div className="bg-background p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-primary">Total Products</h2>
        <p className="text-3xl mt-2 text-secondary">56</p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-primary">Pending Orders</h2>
        <p className="text-3xl mt-2 text-secondary">12</p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-primary">Highest Requested Item</h2>
        <p className="text-2xl mt-2 text-secondary">Product A</p>
        </div>
    </div>
    </div>

  );
};

export default DashboardOverview;
