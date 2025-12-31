import React from "react";
import {
  FiPackage,
  FiUser,
  FiBox,
  FiTag,
  FiTruck,
  FiHash,
  FiGlobe,
  FiCheckCircle,
  FiCalendar,
  FiBarChart2,
  FiDatabase,
  FiLayers,
} from "react-icons/fi";

const PreviewSection = ({ productInfo }) => {
  // If no productInfo, show empty state
  if (!productInfo || Object.keys(productInfo).length === 0) {
    return (
      <div className="min-h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-6">
          <FiPackage className="h-10 w-10 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No Product Data
        </h3>
        <p className="text-gray-500 max-w-md">
          Product information will appear here after form submission. Fill out
          the form to see a beautiful preview of your product data.
        </p>
      </div>
    );
  }

  // Extract data with defaults
  const {
    ctn_no = "Not provided",
    customer_mark = "Not provided",
    chinese_name = "Not provided",
    goods_name = "Not provided",
    goods_quantity = "0",
    weight = "0",
    express_number = "Not provided",
    cbm = "Not provided",
  } = productInfo;

  // Format values for display
  const formattedWeight = parseFloat(weight) || 0;
  const formattedQuantity = parseInt(goods_quantity) || 0;
  const formattedCBM = cbm ? `${cbm} m³` : "Not provided";

  // Get status based on completion
  const getStatusColor = () => {
    if (ctn_no && customer_mark && goods_name) {
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    }
    return "bg-gradient-to-r from-yellow-500 to-orange-500";
  };

  const getStatusText = () => {
    if (ctn_no && customer_mark && goods_name) {
      return "Complete";
    }
    return "Incomplete";
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 h-32 w-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FiPackage className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Product Preview
                </h2>
                <p className="text-blue-100">Detailed product information</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <div
                className={`h-3 w-3 rounded-full ${
                  getStatusColor().includes("green")
                    ? "bg-green-300"
                    : "bg-yellow-300"
                } animate-pulse`}
              ></div>
              <span className="font-semibold">{getStatusText()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* CTN & Customer Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CTN Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <FiHash className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    CTN Information
                  </h3>
                  <p className="text-sm text-gray-600">Carton Number Details</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <FiTag className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">CTN No</span>
                  </div>
                  <span className="font-bold text-gray-800 text-lg">
                    {ctn_no}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Customer Details
                  </h3>
                  <p className="text-sm text-gray-600">Customer Information</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FiUser className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-600">Customer Mark</span>
                  </div>
                  <span className="font-bold text-gray-800 text-lg">
                    {customer_mark}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Product Name */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-5 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <FiBox className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Product Name</h3>
                <p className="text-sm text-gray-600">Goods Information</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">English Name</p>
                <p className="font-bold text-gray-800 text-lg">{goods_name}</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Chinese Name</p>
                <p className="font-bold text-gray-800 text-lg">
                  {chinese_name}
                </p>
              </div>
            </div>
          </div>

          {/* Quantity & Weight */}
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-5 border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <FiBarChart2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Quantity & Weight</h3>
                <p className="text-sm text-gray-600">Product Measurements</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Quantity</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-800 text-xl">
                    {formattedQuantity}
                  </p>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm font-medium">
                    PCS
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Weight</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-800 text-xl">
                    {formattedWeight.toFixed(2)}
                  </p>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm font-medium">
                    KGs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-5 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <FiTruck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Shipping Details</h3>
                <p className="text-sm text-gray-600">Express & Dimensions</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Express Number</p>
                <div className="flex items-center gap-2">
                  <FiTruck className="h-4 w-4 text-blue-500" />
                  <p className="font-bold text-gray-800 truncate">
                    {express_number}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">CBM</p>
                <div className="flex items-center gap-2">
                  <FiGlobe className="h-4 w-4 text-purple-500" />
                  <p className="font-bold text-gray-800">{formattedCBM}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCheckCircle className="h-6 w-6 text-purple-500" />
            Product Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-2">
                <FiHash className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">CTN No</p>
              <p className="font-bold text-gray-800 text-lg">{ctn_no}</p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center mx-auto mb-2">
                <FiBox className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-600">Product</p>
              <p className="font-bold text-gray-800 text-lg truncate">
                {goods_name}
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-2">
                <FiDatabase className="h-6 w-6 text-orange-500" />
              </div>
              <p className="text-sm text-gray-600">Total Weight</p>
              <p className="font-bold text-gray-800 text-lg">
                {formattedWeight.toFixed(2)} KGs
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-2">
                <FiCalendar className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-sm text-gray-600">Status</p>
              <p
                className={`font-bold text-lg ${
                  getStatusColor().includes("green")
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {getStatusText()}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Last Updated:</span> Just now
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">
                  Ready for Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-t border-gray-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p className="text-sm text-gray-600">
            Product ID:{" "}
            <span className="font-medium text-gray-800">
              {ctn_no.replace(/\s/g, "-")}-{Date.now().toString().slice(-6)}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium">
              Warehouse Entry
            </span>
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
