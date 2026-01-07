import { createPortal } from "react-dom";
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
  FiEdit2,
} from "react-icons/fi";
import { PiShippingContainer } from "react-icons/pi";
import DropdownWithSearch from "./DropdownWithSearch";

const PreviewSection = ({
  productInfo,
  setShipment,
  setCtnNo,
  setCustomerSections,
  shipmentOptions,
  ctnOptions,
  customerOptions,
}) => {
  const [expandedCustomers, setExpandedCustomers] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    type: "",
    field: "",
    value: "",
    id: null,
  });

  const toggleCustomer = (id) => {
    setExpandedCustomers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEditClick = (type, field, value, id = null) => {
    setEditData({ type, field, value, id });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editData.field === "Shipment No") {
      setShipment(editData.value);
    } else if (editData.field === "CTN No") {
      setCtnNo(editData.value);
    } else if (editData.field === "Customer Name") {
      setCustomerSections((prev) =>
        prev.map((section) =>
          section.id === editData.id
            ? { ...section, customerName: editData.value }
            : section
        )
      );
    }
    setIsEditModalOpen(false);
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
  const totalCost = (totalWeight * 2.5).toFixed(2);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
      {/* Edit Modal using Portal */}
      {isEditModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999999 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-300 text-black">
              <div className="bg-linear-to-r from-emerald-600 to-green-500 p-6 text-white rounded-t-2xl">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FiEdit2 /> Update {editData.field}
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  {editData.field === "Shipment No" && (
                    <DropdownWithSearch
                      label="Shipment"
                      options={shipmentOptions}
                      value={editData.value}
                      onChange={(val) =>
                        setEditData({ ...editData, value: val })
                      }
                      placeholder="Select Shipment"
                      apiEndpoint="/api/shipments"
                    />
                  )}
                  {editData.field === "CTN No" && (
                    <DropdownWithSearch
                      label="CTN No"
                      options={ctnOptions}
                      value={editData.value}
                      onChange={(val) =>
                        setEditData({ ...editData, value: val })
                      }
                      placeholder="Select CTN"
                      apiEndpoint="/api/shipments"
                    />
                  )}
                  {editData.field === "Customer Name" && (
                    <DropdownWithSearch
                      label="Customer Name"
                      options={customerOptions}
                      value={editData.value}
                      onChange={(val) =>
                        setEditData({ ...editData, value: val })
                      }
                      placeholder="Select Customer"
                      apiEndpoint="/api/shipments"
                    />
                  )}
                  {/* Default for fields that don't need dropdowns */}
                  {!["Shipment No", "CTN No", "Customer Name"].includes(
                    editData.field
                  ) && (
                    <input
                      type="text"
                      value={editData.value}
                      onChange={(e) =>
                        setEditData({ ...editData, value: e.target.value })
                      }
                      className="w-full text-black px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 outline-none"
                      autoFocus
                    />
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 shadow-md transition-all"
                  >
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Main Preview Content */}
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

      <div className="p-3 space-y-4 text-black">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 group relative h-22">
            <button
              onClick={() =>
                handleEditClick("shipment", "Shipment No", productInfo.shipment)
              }
              className="absolute top-2 right-2 p-1 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600 shadow-sm"
            >
              <FiEdit2 size={12} />
            </button>
            <div className="flex gap-2">
              <PiShippingContainer className="text-emerald-600" />
              <p className="text-xs text-emerald-600 font-bold uppercase">
                Shipment
              </p>
            </div>
            <p className="font-bold text-gray-800 mb-0">
              {productInfo.shipment || "Not selected"}
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 group relative h-22">
            <button
              onClick={() =>
                handleEditClick("shipment", "CTN No", productInfo.ctnNo)
              }
              className="absolute top-2 right-2 p-1 bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 shadow-sm"
            >
              <FiEdit2 size={12} />
            </button>
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
                <div className="flex items-center bg-gray-50 hover:bg-purple-50 transition-colors duration-200">
                  <button
                    onClick={() => toggleCustomer(customer.id)}
                    className="flex-1 flex items-center justify-between p-4"
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
                  <button
                    onClick={() =>
                      handleEditClick(
                        "customer",
                        "Customer Name",
                        customer.customerName,
                        customer.id
                      )
                    }
                    className="p-3 text-purple-400 hover:text-purple-600"
                  >
                    <FiEdit2 size={14} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="p-3 bg-white space-y-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-start justify-between p-3 bg-pink-50 rounded-lg group h-22">
                      <div className="flex items-start gap-2">
                        <FiBox className="text-pink-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-0">
                            Goods Name
                          </p>
                          <p className="font-bold text-gray-800 mb-0">
                            {customer.goodsName || "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {customer.chineseName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 rounded-lg relative group h-26">
                        <div className="flex gap-2">
                          <FiShoppingCart className="text-green-600 text-sm" />
                          <p className="text-xs text-green-600 uppercase font-medium">
                            Quantity
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-800">
                          {customer.goodsQuantity || 0}{" "}
                          <span className="text-xs font-normal">PCS</span>
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg relative group h-26">
                        <div className="flex gap-2">
                          <FiBarChart className="text-amber-600 text-sm" />
                          <p className="text-xs text-amber-600 uppercase font-medium">
                            Weight
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-800">
                          {weight}{" "}
                          <span className="text-xs font-normal">KGs</span>
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900 rounded-lg text-white flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="text-green-400" />
                        <span className="text-sm">Entry Cost</span>
                      </div>
                      <span className="text-lg font-bold text-green-400">
                        ${cost}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Section */}

        <div className="mt-6  border-t-2 border-dashed border-gray-100">
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
                <span className="text-gray-400 text-sm">Total Cost:</span>

                <span className="font-bold text-2xl text-green-400">
                  ${totalCost}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 text-xs text-center text-gray-400 rounded-2xl">
        Generated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default PreviewSection;
