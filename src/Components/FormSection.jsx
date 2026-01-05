import React, { useState } from "react";
import { IoIosAddCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownWithSearch from "./DropdownWithSearch";
import { HiArrowPath } from "react-icons/hi2";
import { FaLocationArrow, FaTrash } from "react-icons/fa";
import { TiArrowSync } from "react-icons/ti";
import toast from "react-hot-toast";

const FormSection = () => {
  const [ctnNo, setCtnNo] = useState("");
  const [shipment, setShipment] = useState(""); // Add shipment state

  const [customerSections, setCustomerSections] = useState([
    {
      id: 1,
      customerName: "",
      chineseName: "",
      goodsName: "",
      goodsQuantity: "",
      weight: "",
      expressNumber: "",
      crm: "",
      isExpanded: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItemName, setNewItemName] = useState("");

  const [ctnOptions, setCtnOptions] = useState([
    "SKH 506",
    "SKH 507",
    "SKH 508",
    "SKH 509",
    "SKH 510",
    "SKH 511",
    "SKH 512",
    "SKH 513",
    "SKH 514",
    "SKH 515",
  ]);

  const [shipmentOptions, setShipmentOptions] = useState([
    "Shipment 1",
    "Shipment 2",
    "Shipment 3",
    "Shipment 4",
    "Shipment 5",
  ]);

  const [customerOptions, setCustomerOptions] = useState([
    "PURPLE WAVE",
    "ADNAN ROOMY",
    "ABDUI KADER",
    "ISRAT ENAMUL",
    "SLS OVI",
    "SRI COLLINS",
  ]);

  const handleAddNewItem = (type) => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  const handleSaveNewItem = () => {
    if (!newItemName.trim()) return;

    if (modalType === "ctn") {
      setCtnOptions([...ctnOptions, newItemName]);
      setCtnNo(newItemName);
    } else if (modalType === "customer") {
      setCustomerOptions([...customerOptions, newItemName]);
      setCustomerSections((sections) =>
        sections.map((section) => ({
          ...section,
          customerName:
            section.customerName === "" ? newItemName : section.customerName,
        }))
      );
    } else if (modalType === "shipment") {
      setShipmentOptions([...shipmentOptions, newItemName]);
      setShipment(newItemName);
    }

    setNewItemName("");
    setIsAddModalOpen(false);
  };

  const handleCustomerSectionChange = (sectionId, field, value) => {
    setCustomerSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const toggleSectionCollapse = (sectionId) => {
    setCustomerSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  const addCustomerSection = () => {
    const newId = Math.max(...customerSections.map((s) => s.id), 0) + 1;
    setCustomerSections([
      ...customerSections,
      {
        id: newId,
        customerName: "",
        chineseName: "",
        goodsName: "",
        goodsQuantity: "",
        weight: "",
        expressNumber: "",
        crm: "",
        isExpanded: true,
      },
    ]);
  };

  const removeCustomerSection = (sectionId) => {
    if (customerSections.length > 1) {
      setCustomerSections((sections) =>
        sections.filter((section) => section.id !== sectionId)
      );
    }
  };

  const resetForm = () => {
    setCtnNo("");
    setShipment("");
    setCustomerSections([
      {
        id: 1,
        customerName: "",
        chineseName: "",
        goodsName: "",
        goodsQuantity: "",
        weight: "",
        expressNumber: "",
        crm: "",
        isExpanded: true,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shipment.trim()) {
      toast.error("Please select or enter a Shipment.");
      return;
    }

    if (!ctnNo.trim()) {
      toast.error("Please select or enter a CTN No.");
      return;
    }

    const hasValidEntry = customerSections.some(
      (section) => section.customerName.trim() && section.goodsName.trim()
    );

    if (!hasValidEntry) {
      toast.error(
        "Please fill in at least one customer entry with Customer Name and Goods Name."
      );
      return;
    }

    const submissionData = {
      shipment,
      ctnNo,
      customerEntries: customerSections.map(({ ...rest }) => rest),
    };

    console.log("Form submitted:", submissionData);

    toast.success(
      `Form submitted successfully!\nShipment: ${shipment}\nCTN No: ${ctnNo}\nCustomer Entries: ${customerSections.length}`
    );

    resetForm();
  };

  return (
    <div>
      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-300">
            <div className="bg-linear-to-r from-purple-500 to-blue-500 p-6 text-white">
              <h3 className="text-2xl font-bold">
                Add New{" "}
                {modalType === "ctn"
                  ? "CTN No"
                  : modalType === "shipment"
                  ? "Shipment"
                  : "Customer"}
              </h3>
              <p className="text-purple-100 mt-1">Add to dropdown options</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter{" "}
                  {modalType === "ctn"
                    ? "CTN number"
                    : modalType === "shipment"
                    ? "shipment name"
                    : "customer name"}
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={`Enter ${
                    modalType === "ctn"
                      ? "CTN-XXX"
                      : modalType === "shipment"
                      ? "shipment name"
                      : "customer name"
                  }`}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewItemName("");
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewItem}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Add{" "}
                  {modalType === "ctn"
                    ? "CTN"
                    : modalType === "shipment"
                    ? "Shipment"
                    : "Customer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="text-black" onSubmit={handleSubmit}>
        <div className="p-6 md:p-8 space-y-6">
          {/* Form Header */}

          {/* Shipment field */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
            <DropdownWithSearch
              label="Shipment"
              options={shipmentOptions}
              value={shipment}
              onChange={setShipment}
              placeholder="Select shipment"
              isRequired
            />
          </div>

          {/* CTN No Field */}
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
            <DropdownWithSearch
              label="CTN No"
              options={ctnOptions}
              value={ctnNo}
              onChange={setCtnNo}
              placeholder="Select CTN"
              isRequired
            />
          </div>

          {/* Customer Information Sections */}
          {customerSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden transition-all duration-300 hover:border-purple-200"
            >
              {/* Section header */}
              <div className="flex justify-between items-center p-5 md:p-6 border-b border-blue-100 bg-linear-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="flex items-center gap-3 text-gray-800 hover:text-purple-600 transition-colors duration-200"
                  >
                    <div className="h-10 w-10 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">
                        Customer Entry #{index + 1}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Click to {section.isExpanded ? "collapse" : "expand"}
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    {section.isExpanded ? (
                      <>
                        <IoIosArrowUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <IoIosArrowDown className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {customerSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomerSection(section.id)}
                      className="px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                      <FaTrash className="h-4 w-4"></FaTrash>
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible content */}
              <div
                className={`transition-all duration-200 ease-in-out ${
                  section.isExpanded
                    ? "max-h-500 opacity-100 p-5 md:p-6"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="space-y-6">
                  {/* Customer Name Field */}
                  <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
                    <DropdownWithSearch
                      label="Customer Name"
                      options={customerOptions}
                      // Change selectedValue to value
                      value={section.customerName}
                      // Change onSelect to onChange
                      onChange={(value) =>
                        handleCustomerSectionChange(
                          section.id,
                          "customerName",
                          value || "" // Handle null from clear button
                        )
                      }
                      placeholder="Select or search customer"
                      isRequired={true}
                    />
                  </div>

                  {/* Other Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        label: "Chinese name",
                        field: "chineseName",
                        type: "text",
                      },
                      { label: "Goods name", field: "goodsName", type: "text" },
                      {
                        label: "Goods Quantity",
                        field: "goodsQuantity",
                        type: "number",
                      },
                      {
                        label: "Weight (KGs)",
                        field: "weight",
                        type: "number",
                        step: "0.01",
                      },
                      {
                        label: "Express Number",
                        field: "expressNumber",
                        type: "text",
                      },
                      {
                        label: "CBM",
                        field: "crm",
                        type: "number",
                        step: "0.001",
                      },
                    ].map((fieldConfig, idx) => (
                      <div key={idx} className="group">
                        <label className="block text-black font-medium text-lg mb-2">
                          {fieldConfig.label}
                        </label>
                        <input
                          type={fieldConfig.type}
                          value={section[fieldConfig.field]}
                          onChange={(e) =>
                            handleCustomerSectionChange(
                              section.id,
                              fieldConfig.field,
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 group-hover:border-blue-300"
                          placeholder={`Enter ${fieldConfig.label.toLowerCase()}`}
                          min={fieldConfig.type === "number" ? "0" : undefined}
                          step={fieldConfig.step}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Collapsed footer */}
              {!section.isExpanded && (
                <div className="p-4 border-t border-blue-100 bg-linear-to-r from-blue-50 to-purple-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg shadow-sm">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-semibold text-gray-800">
                          {section.customerName || "Not set"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg shadow-sm">
                        <span className="text-gray-600">Goods:</span>
                        <span className="font-semibold text-gray-800">
                          {section.goodsName || "Not set"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg shadow-sm">
                        <span className="text-gray-600">Qty:</span>
                        <span className="font-semibold text-gray-800">
                          {section.goodsQuantity || "0"}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSectionCollapse(section.id)}
                      className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                    >
                      Expand to edit →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Summary Section */}
          <div className="bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border border-blue-200">
            {/* Form Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 flex justify-center items-center gap-2 px-6 py-4 bg-linear-to-r from-[#008594] via-[#38b2ac] to-[#0ceded] text-white font-bold rounded-xl hover:from-[#026b77] hover:to-[#04c8c8] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FaLocationArrow /> Submit All Entries
              </button>

              <button
                type="button"
                onClick={addCustomerSection}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <IoIosAddCircle className="h-5 w-5" />
                </div>
                Add Customer Entry
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
