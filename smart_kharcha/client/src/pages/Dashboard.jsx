import { useState, useEffect } from "react";
import Analytics from "../components/Analytics";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    category: "",
    date: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const [budgetLimit] = useState(10000);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ FIX: searchTerm ko upar shift kiya
  const [searchTerm, setSearchTerm] = useState("");

  // Load from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allTransactions =
      JSON.parse(localStorage.getItem("transactions")) || {};

    if (currentUser && allTransactions[currentUser.email]) {
      setTransactions(allTransactions[currentUser.email]);
    } else {
      setTransactions([]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const allTransactions =
      JSON.parse(localStorage.getItem("transactions")) || {};

    allTransactions[currentUser.email] = transactions;

    localStorage.setItem(
      "transactions",
      JSON.stringify(allTransactions)
    );
  }, [transactions]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!formData.amount || !formData.category || !formData.date) {
      alert("Fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = formData;
      setTransactions(updated);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, formData]);
    }

    setFormData({
      type: "Income",
      amount: "",
      category: "",
      date: "",
    });
  };

  const handleDelete = (indexToDelete) => {
    const updated = transactions.filter(
      (_, index) => index !== indexToDelete
    );
    setTransactions(updated);
  };

  const exportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const headers = ["Type", "Amount", "Category", "Date"];

    const rows = transactions.map((t) => [
      t.type,
      t.amount,
      t.category,
      t.date,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const handleEdit = (index) => {
    setFormData(transactions[index]);
    setEditIndex(index);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = totalIncome - totalExpense;

  const filteredTransactions =
    selectedCategory === "All"
      ? transactions
      : transactions.filter(
          (t) => t.category === selectedCategory
        );

  const finalTransactions = filteredTransactions.filter((t) =>
    (t.category || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (t.amount || "")
      .toString()
      .includes(searchTerm)
  );

  const percentage = Math.min(
    (totalExpense / budgetLimit) * 100 || 0,
    100
  );

  return (
    <div className="p-6 space-y-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search history"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        />

      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2>Total Income</h2>
          <p className="text-green-600 text-2xl">₹{totalIncome}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2>Total Expense</h2>
          <p className="text-red-600 text-2xl">₹{totalExpense}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2>Balance</h2>
          <p className="text-blue-600 text-2xl">₹{balance}</p>
        </div>
      </div>

      {/* Monthly Budget */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Budget</h2>

        <p className="text-gray-600 mb-2">
          Limit: ₹{budgetLimit}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              percentage >= 100 ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {percentage.toFixed(1)}% Used
        </p>
      </div>

      {/* Add Transaction */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <button
        onClick={exportCSV}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Download CSV
      </button>

      {/* Transaction History */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {finalTransactions.map((t, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className={`p-3 ${t.type === "Income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type}
                  </td>
                  <td className="p-3">₹{t.amount}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">{t.date}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Analytics Section */}
      <Analytics transactions={transactions} />

    </div>
  );
};

export default Dashboard;