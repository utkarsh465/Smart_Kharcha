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
    const lines = text.split("\n");
    let maxAmount = 0;
    let foundAmounts = [];

    // 1. First, try to find lines that explicitly mention "Total", "Amount", or "Net"
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      // Look for keywords or currency symbols
      if (
        lowerLine.includes("total") ||
        lowerLine.includes("amount") ||
        lowerLine.includes("net") ||
        lowerLine.includes("₹") ||
        lowerLine.includes("rs")
      ) {
        // Extract all numbers from this interesting line
        const numbersInLine = line.match(/\d+(\.\d+)?/g);
        if (numbersInLine) {
           numbersInLine.forEach(n => {
             const num = Number(n);
             // Amounts usually aren't over 10 lakh in daily expenses, and aren't 0
             if (!isNaN(num) && num > 0 && num < 1000000) {
                foundAmounts.push(num);
             }
           });
        }
      }
    }

    // 2. If we found potential amounts from matching lines, get the highest one format
    if (foundAmounts.length > 0) {
      maxAmount = Math.max(...foundAmounts);
    } 
    // 3. Fallback: If no keywords/symbols found, find the largest reasonable decimal number in the whole text
    else {
      const allNumbers = text.match(/\d+(\.\d+)?/g);
      if (allNumbers && allNumbers.length > 0) {
        const validNumbersStr = allNumbers.filter(n => {
          const num = Number(n);
          return !isNaN(num) && num < 1000000;
        });
        
        const decimalsStr = validNumbersStr.filter(n => n.includes('.'));
        
        if (decimalsStr.length > 0) {
          maxAmount = Math.max(...decimalsStr.map(Number));
        } else if (validNumbersStr.length > 0) {
          maxAmount = Math.max(...validNumbersStr.map(Number));
        }
      }
    }

    if (maxAmount > 0) {
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