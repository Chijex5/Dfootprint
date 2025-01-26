const DashboardOverview = () => {
  return (
    <div className="mx-10 p-8">
    <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow dark:bg-darkSecondary">
        <h2 className="text-xl font-bold text-primary dark:text-darkAccent">Total Products</h2>
        <p className="text-3xl mt-2 text-secondary dark:text-darkPrimary">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow dark:bg-darkSecondary">
        <h2 className="text-xl font-bold text-primary dark:text-darkAccent">Pending Orders</h2>
        <p className="text-3xl mt-2 text-secondary dark:text-darkPrimary">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow dark:bg-darkSecondary">
        <h2 className="text-xl font-bold text-primary dark:text-darkAccent">Highest Requested Item</h2>
        <p className="text-2xl mt-2 text-secondary dark:text-darkPrimary">Product A</p>
        </div>
    </div>
    </div>

  );
};

export default DashboardOverview;
