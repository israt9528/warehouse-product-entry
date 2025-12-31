import React, { useEffect, useState } from "react";
import { FiHome, FiPackage } from "react-icons/fi";
import FormSection from "./Components/FormSection";
import PreviewSection from "./Components/PreviewSection";

const App = () => {
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    fetch("/demoData.json")
      .then((res) => res.json())
      .then((data) => setProductInfo(data));
  }, []);
  console.log(productInfo);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FiPackage className="h-6 w-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Warehouse Product Entry System
                </h1>
              </div>
              <p className="text-blue-100 mt-2">
                Enter product details that arrive at the warehouse. Add multiple
                products at once.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-xl">
              <FiHome className="h-6 w-6" />
              <div>
                <p className="font-bold">Total Submissions</p>
                <p className="text-2xl font-bold"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left panel */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Product Entry Form
              </h2>
              <p className="text-blue-100">
                Fill in product details for warehouse inventory
              </p>
            </div>
            <FormSection></FormSection>
          </div>
          {/* right panel */}
          <div className="lg:col-span-1 border">
            <PreviewSection productInfo={productInfo}></PreviewSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
