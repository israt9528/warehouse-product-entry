import React, { useState } from "react";
import {
  FiPackage,
  FiUser,
  FiBox,
  FiTruck,
  FiHash,
  FiCheckCircle,
  FiShoppingCart,
  FiBarChart,
  FiDollarSign,
  FiChevronDown,
} from "react-icons/fi";
import { PiShippingContainer } from "react-icons/pi";

const PreviewSection = ({ productInfo }) => {
  const [expandedCustomers, setExpandedCustomers] = useState({});

  const toggleCustomer = (id) => {
    setExpandedCustomers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (
    !productInfo ||
    !productInfo.customerEntries ||
    productInfo.customerEntries.length === 0
  ) {
    return (
      <div className="min-h-100 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-6">
          <FiPackage className="h-10 w-10 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          No Product Data
        </h3>
        <p className="text-gray-500 max-w-md">
          Fill out the form to see a real-time preview.
        </p>
      </div>
    );
  }

  const totalWeight = productInfo.customerEntries.reduce(
    (sum, entry) => sum + (parseFloat(entry.weight) || 0),
    0
  );

  // Calculate Total PCS (Quantity)
  const totalPcs = productInfo.customerEntries.reduce(
    (sum, entry) => sum + (parseInt(entry.goodsQuantity) || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden relative">
      {/* Main Preview Header */}
      <div className="bg-linear-to-r from-[#008594] via-[#0d9c90] to-[#10b981] px-4 py-2 text-white rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <FiPackage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="mb-0 text-lg mt-2 font-bold">Product Preview</h2>
              <p className="text-sm opacity-90">Real-time overview</p>
            </div>
          </div>
          <FiCheckCircle className="w-6 h-6 text-green-300" />
        </div>
      </div>

      <div className="p-3 space-y-3 text-black">
        <div className="grid grid-cols-2 gap-3">
          <div className="px-3 pt-1 bg-emerald-50 leading-0! rounded-lg border flex flex-col justify-center border-emerald-100 h-15">
            <div className="flex gap-2">
              <PiShippingContainer className="text-emerald-600" />
              <p className="text-xs text-emerald-600 font-bold uppercase">
                Shipment
              </p>
            </div>
            <p className="font-bold text-gray-800">
              {productInfo.shipment || "Not selected"}
            </p>
          </div>

          <div className="px-3 pt-1 bg-blue-50 leading-0! rounded-lg border flex flex-col justify-center  border-blue-100 h-15">
            <div className="flex gap-2">
              <FiHash className="text-blue-600" />
              <p className="text-xs text-blue-600 font-bold uppercase">
                CTN No
              </p>
            </div>
            <p className="font-bold text-gray-800">
              {productInfo.ctnNo || "Not selected"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {productInfo.customerEntries.map((customer) => {
            const isExpanded = expandedCustomers[customer.id];
            const weight = parseFloat(customer.weight) || 0;
            const cost = (weight * 2.5).toFixed(2);

            return (
              <div
                key={customer.id}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <div className="flex items-center bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors duration-200">
                  <button
                    onClick={() => toggleCustomer(customer.id)}
                    className="flex-1 flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FiUser className="text-purple-600" />
                      </div>
                      <span className="font-bold text-gray-700">
                        {customer.customerName || "Empty Customer"}
                      </span>
                    </div>
                    <FiChevronDown
                      className={`text-purple-600 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-3 bg-white space-y-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start justify-between p-3 bg-pink-50 rounded-lg h-18">
                      <div className="flex items-start gap-2">
                        <FiBox className="text-pink-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-0">
                            Goods Name
                          </p>
                          <p className="font-bold text-gray-800 my-0">
                            {customer.goodsName || "N/A"}
                            <span className="text-sm text-gray-600 italic ml-2">
                              ({customer.chineseName})
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded-lg leading-0! h-22">
                        <div className="flex gap-2 my-0 h-4">
                          <FiShoppingCart className="text-green-600 text-sm" />
                          <p className="text-xs text-green-600 uppercase font-medium">
                            Quantity
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-800 my-0">
                          {customer.goodsQuantity || 0}{" "}
                          <span className="text-xs font-normal">PCS</span>
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg leading-0! h-22">
                        <div className="flex gap-2 my-0 h-4">
                          <FiBarChart className="text-amber-600 text-sm" />
                          <p className="text-xs text-amber-600 uppercase font-medium">
                            Weight
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-800 my-0">
                          {weight}{" "}
                          <span className="text-xs font-normal">KGs</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="mt-6 border-t-2 border-dashed border-gray-100">
          <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-xl text-white">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-3">
              <FiTruck className="text-blue-400 mb-2" />
              <h3 className="font-bold text-lg">Shipment Summary</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Weight:</span>
                <span className="font-bold text-lg">
                  {totalWeight.toFixed(2)} KGs
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total Quantity:</span>
                <span className="font-bold text-2xl text-[#10b981]">
                  {totalPcs} PCS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
