import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed">
      <h2 className="text-2xl font-bold text-center py-4">Admin Dashboard</h2>
      <ul className="space-y-4 p-4">
        <li>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-700" onClick={() => router.push('/admin/dashboard')}>
            Dashboard
          </button>
        </li>
        <li>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-700" onClick={() => router.push('/admin/products')}>
            Manage Products
          </button>
        </li>
        <li>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-700" onClick={() => router.push('/admin/orders')}>
            View Orders
          </button>
        </li>
        <li>
          <button className="w-full text-left py-2 px-4 hover:bg-gray-700" onClick={() => router.push('/admin/statistics')}>
            Statistics
          </button>
        </li>
      </ul>
    </div>
  );
};
