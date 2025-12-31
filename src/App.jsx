import React, { useEffect, useState } from "react";
import { FiHome, FiPackage, FiTrendingUp, FiUsers } from "react-icons/fi";
import FormSection from "./Components/FormSection";
import PreviewSection from "./Components/PreviewSection";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    fetch("/demoData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setProductInfo(data);
        setTotalSubmissions(data.length);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(productInfo);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <FiPackage className="h-7 w-7" />
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Warehouse Product Entry
                      </h1>
                      <p className="text-blue-100 mt-2 text-lg">
                        Streamlined product intake system with real-time preview
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <FiUsers className="h-5 w-5" />
                      <div>
                        <p className="text-sm opacity-90">Active Entries</p>
                        <p className="text-xl font-bold">
                          {productInfo.length}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <FiTrendingUp className="h-5 w-5" />
                      <div>
                        <p className="text-sm opacity-90">Total Submissions</p>
                        <p className="text-xl font-bold">{totalSubmissions}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <FiHome className="h-5 w-5" />
                      <div>
                        <p className="text-sm opacity-90">Warehouse</p>
                        <p className="text-xl font-bold">Main</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3 bg-linear-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20">
                  <div className="h-3 w-3 rounded-full bg-emerald-300 animate-pulse"></div>
                  <div className="text-center">
                    <p className="text-sm opacity-90">System Status</p>
                    <p className="text-xl font-bold">Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Product Entry Form</h2>
                    <p className="text-blue-100">
                      Enter warehouse product details
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></div>
                    <span className="text-sm font-medium">Ready</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl overflow-hidden border border-gray-200">
              <FormSection />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-b-2xl rounded-tl-2xl shadow-2xl overflow-hidden border border-gray-200">
                <PreviewSection productInfo={productInfo} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded-2xl p-6 border border-gray-300">
            <p className="text-gray-600 font-medium">
              Warehouse Management System • v2.0
            </p>
            <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Real-time Sync
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                Secure Data
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                Mobile Ready
              </span>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
