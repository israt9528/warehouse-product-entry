import React, { useState } from "react";
import {
  FiPackage,
  FiUser,
  FiBox,
  FiTag,
  FiTruck,
  FiHash,
  FiCheckCircle,
  FiShoppingCart,
  FiBarChart,
  FiDollarSign,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const PreviewSection = ({ productInfo }) => {
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(false);

  console.log(productInfo);
  if (!productInfo || productInfo.length === 0) {
    return (
      <div className="min-h-100 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-6">
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

  const {
    ctn_no,
    customer_mark,
    chinese_name,
    goods_name,
    goods_quantity,
    weight,
    express_number,
    cbm,
  } = productInfo[0];

  // Format values
  const formattedWeight = parseFloat(weight) || 0;
  const formattedQuantity = parseInt(goods_quantity) || 0;
  const shippingCost = (formattedWeight * 2.5).toFixed(2);

  return (
    <div className=" bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FiPackage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Product Preview</h2>
              <p className="text-sm text-blue-100 opacity-90">
                Real-time product overview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
            <FiCheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        <div className="space-y-4">
          {/* CTN Number */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FiHash className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">CTN Number</p>
                <p className="text-sm text-gray-500">Tracking identifier</p>
              </div>
            </div>
            <span className="font-bold text-lg text-gray-800">{ctn_no}</span>
          </div>

          {/* Customer Information - Collapsible */}
          <div
            className="cursor-pointer"
            onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
          >
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Customer</p>
                  <p className="text-sm text-gray-500">Shipment recipient</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800 truncate max-w-35">
                  {customer_mark}
                </span>
                <div className="ml-2">
                  {isCustomerExpanded ? (
                    <FiChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Name Section - Collapsible Content */}
          {isCustomerExpanded && (
            <div className="space-y-3 ml-3 pl-3 border-l-2 border-purple-200 animate-fadeIn">
              {/* Product Name Section */}
              <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                    <FiBox className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Product Name</p>
                    <p className="text-sm text-gray-500">Chinese Name</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {goods_name}
                  </h3>
                  <p className="text-gray-600">{chinese_name}</p>
                </div>
              </div>

              {/* Quantity & Weight Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center">
                      <FiShoppingCart className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Quantity</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {formattedQuantity}
                    </span>
                    <span className="text-gray-600">PCS</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center">
                      <FiBarChart className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Weight</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {formattedWeight.toFixed(2)}
                    </span>
                    <span className="text-gray-600">KGs</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Information */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <FiTruck className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-700">Shipping Details</p>
                <p className="text-sm text-gray-500">Delivery information</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiTag className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Tracking #</span>
                </div>
                <span className="font-medium text-gray-800 text-sm truncate max-w-45">
                  {express_number}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">CBM</span>
                </div>
                <span className="font-medium text-gray-800">
                  {cbm ? `${cbm} m³` : "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Cost Estimate */}
          <div className="p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">Shipping Cost</p>
                  <p className="text-sm text-gray-500">
                    Estimated delivery cost
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ${shippingCost}
                </p>
                <p className="text-xs text-gray-500">USD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Last updated: Just now</span>
          </div>
          <span className="font-medium">ID: {ctn_no}</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
