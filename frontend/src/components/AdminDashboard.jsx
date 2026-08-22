import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";
import useProductCatalog from "../hooks/useProductCatalog";
import useUserCatalog from "../hooks/useUserCatalog";

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 border border-(--oatmeal) rounded-lg bg-(--bg) px-5 py-4">
    <div className="h-11 w-11 shrink-0 rounded-full bg-(--oatmeal)/40 flex items-center justify-center text-(--ablue) text-xl">
      <i className={icon}></i>
    </div>
    <div>
      <h2 className="text-xl font-bold text-(--ablue)">{value}</h2>
      <h4 className="text-xs font-light opacity-70">{label}</h4>
    </div>
  </div>
);

const ChartCard = ({ title, subtitle, children }) => (
  <div className="flex flex-col gap-3 border border-(--oatmeal) rounded-lg bg-(--bg) px-5 py-4">
    <div>
      <h2 className="text-sm font-semibold text-(--ablue)">{title}</h2>
      {subtitle && <h4 className="text-xs font-light opacity-70">{subtitle}</h4>}
    </div>
    {children}
  </div>
);

const tooltipStyle = {
  backgroundColor: "var(--bg)",
  border: "1px solid var(--oatmeal)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--ablue)"
};

const AdminDashboard = () => {
  const { categories, subCategories, products } = useProductCatalog();
  const { orders, users } = useUserCatalog();

  const totalSales = useMemo(() => {
    return orders.reduce((sum, order) => {
      const product = products.find((p) => p._id === order.productId);
      const price = product?.price ?? 0;
      return sum + price * (order.quantity ?? 0);
    }, 0);
  }, [orders, products]);

  const overviewData = useMemo(() => ([
    { name: "Products", count: products.length },
    { name: "Categories", count: categories.length },
    { name: "Subcategories", count: subCategories.length },
    { name: "Users", count: users.length },
    { name: "Orders", count: orders.length },
  ]), [products, categories, subCategories, users, orders]);

  const orderStatusData = useMemo(() => {
    const delivered = orders.filter((o) => o.deliveredStatus).length;
    const pending = orders.length - delivered;
    return [
      { name: "Delivered", value: delivered },
      { name: "Pending", value: pending },
    ];
  }, [orders]);

  const topProductsData = useMemo(() => {
    const revenueByProduct = {};
    orders.forEach((order) => {
      const product = products.find((p) => p._id === order.productId);
      if (!product) return;
      const revenue = (product.price ?? 0) * (order.quantity ?? 0);
      revenueByProduct[product._id] = {
        name: product.name,
        revenue: (revenueByProduct[product._id]?.revenue ?? 0) + revenue
      };
    });
    return Object.values(revenueByProduct)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders, products]);

  const pieColors = ["var(--flame)", "var(--truffle)"];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-(--ablue)">Dashboard</h1>
        <h4 className="text-xs font-light">Overview of your store</h4>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon="ri-box-1-line" label="Products" value={products.length} />
        <StatCard icon="ri-box-3-line" label="Categories" value={categories.length} />
        <StatCard icon="ri-box-2-line" label="Subcategories" value={subCategories.length} />
        <StatCard icon="ri-user-line" label="Users" value={users.length} />
        <StatCard icon="ri-store-2-line" label="Orders" value={orders.length} />
        <StatCard icon="ri-money-rupee-circle-line" label="Total Sales" value={`₹${totalSales.toLocaleString("en-IN")}`} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <ChartCard title="Store overview" subtitle="Counts across your catalog">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--oatmeal)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--fblue)" }} axisLine={{ stroke: "var(--oatmeal)" }} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "var(--fblue)" }} axisLine={{ stroke: "var(--oatmeal)" }} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--oatmeal)", opacity: 0.2 }} />
                  <Bar dataKey="count" fill="var(--flame)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Order status" subtitle="Delivered vs pending">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} stroke="var(--bg)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => <span style={{ color: "var(--fblue)", fontSize: 12 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Top selling products" subtitle="By revenue generated from orders">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProductsData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--oatmeal)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "var(--fblue)" }} axisLine={{ stroke: "var(--oatmeal)" }} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12, fill: "var(--fblue)" }} axisLine={{ stroke: "var(--oatmeal)" }} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--oatmeal)", opacity: 0.2 }} formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="var(--truffle)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default AdminDashboard;