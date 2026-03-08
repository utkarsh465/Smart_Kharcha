import { useState } from "react";
import Tesseract from "tesseract.js";

const ReceiptScannerPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);

    const handleScan = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        setLoading(true);

        const { data } = await Tesseract.recognize(file, "eng");

        const text = data.text;

        const numbers = text.match(/\d+(\.\d+)?/g);

        if (numbers && numbers.length > 0) {
            const maxAmount = Math.max(...numbers.map(Number));
            setAmount(maxAmount);
        }

        setLoading(false);
    };
  const [preview, setPreview] = useState(null);

  const handleAddExpense = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allTransactions =
      JSON.parse(localStorage.getItem("transactions")) || {};

    const userTransactions =
      allTransactions[currentUser.email] || [];

    const newTransaction = {
      type: "Expense",
      amount: amount,
      category: "Other",
      date: new Date().toISOString().split("T")[0],
    };

    const updatedTransactions = [...userTransactions, newTransaction];

    allTransactions[currentUser.email] = updatedTransactions;

    localStorage.setItem(
      "transactions",
      JSON.stringify(allTransactions)
    );

    alert("Expense added successfully");

    setAmount(null);
  };

  return (
    <div className="p-6 flex justify-center">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-4">

        <h2 className="text-xl font-bold text-center dark:text-white">
          Receipt Scanner
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleScan}
        />

        {preview && (
            <div className="flex justify-center">
                <img
                    src={preview}
                    alt="Receipt Preview"
                    className="max-h-60 rounded shadow"
                />
            </div>
        )}

        {loading && (
          <p className="text-sm text-gray-500">
            Scanning receipt...
          </p>
        )}

        {amount && (
          <>
            <div className="text-center">
              <p className="text-gray-500">Detected Amount</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{amount}
              </p>
            </div>

            <button
              onClick={handleAddExpense}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Add to Expenses
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default ReceiptScannerPage;