import { useState } from "react";
import Tesseract from "tesseract.js";

const ReceiptScanner = ({ setAmount }) => {
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLoading(true);

    const { data } = await Tesseract.recognize(
      file,
      "eng"
    );

    

    const text = data.text;

    const numbers = text.match(/\d+(\.\d+)?/g);

    if (numbers && numbers.length > 0) {
      const maxAmount = Math.max(
        ...numbers.map(Number)
      );

      setAmount(maxAmount);
    }

    setLoading(false);
    
  };

  return (
    <div className="mt-4">

      <label className="block mb-2 font-medium">
        Scan Receipt
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleScan}
      />

      {loading && (
        <p className="text-sm mt-2">
          Scanning receipt...
        </p>
      )}

    </div>
  );
};

export default ReceiptScanner;