import React, { useState } from "react";
import { IoIosAddCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownWithSearch from "./DropdownWithSearch";

const FormSection = () => {
  // CTN No state
  const [ctnNo, setCtnNo] = useState("");

  // Customer sections state - now an array of sections
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
      isExpanded: true, // New property for collapsible state
    },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newItemName, setNewItemName] = useState("");

  // Sample data
  const [ctnOptions, setCtnOptions] = useState([
    "CTN-001",
    "CTN-002",
    "CTN-003",
    "CTN-004",
    "CTN-005",
    "CTN-101",
    "CTN-102",
    "CTN-201",
    "CTN-202",
  ]);

  const [customerOptions, setCustomerOptions] = useState([
    "PURPLE WAVE",
    "ADNAN ROOMY",
    "ABDUI KADER",
    "ISRAT ENAMUL",
    "SLS OVI",
    "SRI COLLINS",
  ]);

  // Handle adding new item
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
      // Update customer name in all sections if needed
      setCustomerSections((sections) =>
        sections.map((section) => ({
          ...section,
          customerName:
            section.customerName === "" ? newItemName : section.customerName,
        }))
      );
    }

    setNewItemName("");
    setIsAddModalOpen(false);
  };

  // Handle input change for a specific customer section
  const handleCustomerSectionChange = (sectionId, field, value) => {
    setCustomerSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  // Toggle collapsible section
  const toggleSectionCollapse = (sectionId) => {
    setCustomerSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, isExpanded: !section.isExpanded }
          : section
      )
    );
  };

  // Add new customer section
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

  // Remove customer section
  const removeCustomerSection = (sectionId) => {
    if (customerSections.length > 1) {
      setCustomerSections((sections) =>
        sections.filter((section) => section.id !== sectionId)
      );
    }
  };

  // Reset form function
  const resetForm = () => {
    setCtnNo("");
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!ctnNo.trim()) {
      alert("Please select or enter a CTN No.");
      return;
    }

    // Check if at least one customer entry has required fields
    const hasValidEntry = customerSections.some(
      (section) => section.customerName.trim() && section.goodsName.trim()
    );

    if (!hasValidEntry) {
      alert(
        "Please fill in at least one customer entry with Customer Name and Goods Name."
      );
      return;
    }

    // Prepare data for submission
    const submissionData = {
      ctnNo,
      customerEntries: customerSections.map(({ ...rest }) => rest), // Remove isExpanded from submission
    };

    console.log("Form submitted:", submissionData);

    // Show success message with counts
    alert(
      `Form submitted successfully!\n\nCTN No: ${ctnNo}\nCustomer Entries: ${customerSections.length}`
    );

    // Reset form after successful submission
    resetForm();
  };

  return (
    <div>
      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Add New {modalType === "ctn" ? "CTN No" : "Customer"}
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter {modalType === "ctn" ? "CTN number" : "customer name"}
              </label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={`Enter ${
                  modalType === "ctn" ? "CTN-XXX" : "customer name"
                }`}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
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
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewItem}
                className="flex-1 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <form className="text-black" onSubmit={handleSubmit}>
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">#</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              Product Entry Form
            </h3>
          </div>

          {/* CTN No Field */}
          <div className="mb-6">
            <DropdownWithSearch
              label="CTN No"
              options={ctnOptions}
              selectedValue={ctnNo}
              onSelect={setCtnNo}
              onAddNew={() => handleAddNewItem("ctn")}
              placeholder="Select or search CTN no"
              icon={IoIosAddCircle}
              isRequired={true}
            />
          </div>

          {/* Add Customer Section Button */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={addCustomerSection}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <IoIosAddCircle className="h-5 w-5" />
              Add Customer Entry
            </button>
          </div>

          {/* Customer Information Sections */}
          {customerSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100 overflow-hidden transition-all duration-300"
            >
              {/* Section header with collapsible button and remove button */}
              <div className="flex justify-between items-center p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="flex items-center gap-2 text-gray-800 hover:text-purple-600 transition-colors duration-200"
                  >
                    {section.isExpanded ? (
                      <IoIosArrowUp className="h-5 w-5" />
                    ) : (
                      <IoIosArrowDown className="h-5 w-5" />
                    )}
                    <h4 className="text-xl font-bold">
                      Customer Entry #{index + 1}
                    </h4>
                  </button>

                  {/* Status indicator */}
                  <div
                    className={`h-2 w-2 rounded-full ${
                      section.customerName && section.goodsName
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Collapsible button */}
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    {section.isExpanded ? (
                      <>
                        <IoIosArrowUp className="h-4 w-4" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <IoIosArrowDown className="h-4 w-4" />
                        Expand
                      </>
                    )}
                  </button>

                  {/* Remove button */}
                  {customerSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomerSection(section.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Collapsible content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  section.isExpanded
                    ? "max-h-[2000px] opacity-100 p-6"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="space-y-6">
                  {/* Customer Name Field */}
                  <div>
                    <DropdownWithSearch
                      label="Customer Name"
                      options={customerOptions}
                      selectedValue={section.customerName}
                      onSelect={(value) =>
                        handleCustomerSectionChange(
                          section.id,
                          "customerName",
                          value
                        )
                      }
                      onAddNew={() => handleAddNewItem("customer")}
                      placeholder="Select or search customer"
                      icon={IoIosAddCircle}
                      isRequired={true}
                    />
                  </div>

                  {/* Other Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        Chinese name
                      </label>
                      <input
                        type="text"
                        value={section.chineseName}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "chineseName",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter Chinese name"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        Goods name
                      </label>
                      <input
                        type="text"
                        value={section.goodsName}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "goodsName",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter goods name"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        Goods Quantity
                      </label>
                      <input
                        type="number"
                        value={section.goodsQuantity}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "goodsQuantity",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter quantity"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        Weight (KGs)
                      </label>
                      <input
                        type="number"
                        value={section.weight}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "weight",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter weight in KGs"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        Express Number
                      </label>
                      <input
                        type="text"
                        value={section.expressNumber}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "expressNumber",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter express number"
                      />
                    </div>

                    <div>
                      <label className="block text-black font-medium text-lg mb-2">
                        CBM
                      </label>
                      <input
                        type="number"
                        value={section.crm}
                        onChange={(e) =>
                          handleCustomerSectionChange(
                            section.id,
                            "crm",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter CBM"
                        step="0.001"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section footer with quick info */}
              {!section.isExpanded && (
                <div className="p-4 border-t border-purple-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        Customer:{" "}
                        <span className="font-semibold text-gray-800">
                          {section.customerName || "Not set"}
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Goods:{" "}
                        <span className="font-semibold text-gray-800">
                          {section.goodsName || "Not set"}
                        </span>
                      </span>
                      <span className="text-gray-600">
                        Qty:{" "}
                        <span className="font-semibold text-gray-800">
                          {section.goodsQuantity || "0"}
                        </span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSectionCollapse(section.id)}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Expand to edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Customer Sections Counter */}
          {customerSections.length > 1 && (
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 text-center">
              <p className="text-gray-700 font-medium">
                You have added{" "}
                <span className="text-purple-600 font-bold">
                  {customerSections.length}
                </span>{" "}
                customer entr{customerSections.length > 1 ? "ies" : "y"}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Expand all sections
                    setCustomerSections((sections) =>
                      sections.map((section) => ({
                        ...section,
                        isExpanded: true,
                      }))
                    );
                  }}
                  className="px-3 py-1 text-sm bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Collapse all sections
                    setCustomerSections((sections) =>
                      sections.map((section) => ({
                        ...section,
                        isExpanded: false,
                      }))
                    );
                  }}
                  className="px-3 py-1 text-sm bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                >
                  Collapse All
                </button>
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Submit All Entries
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
