import React, { useEffect, useState } from "react";
import { IoIosAddCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownWithSearch from "./DropdownWithSearch";
import { FaLocationArrow, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const FormSection = ({
  shipment,
  setShipment,
  ctnNo,
  setCtnNo,
  customerSections,
  setCustomerSections,
  shipmentOptions,
  setShipmentOptions,
  ctnOptions,
  setCtnOptions,
  customerOptions,
  setCustomerOptions,
}) => {
  const [allShipmentDetails, setAllShipmentDetails] = useState([]);
  const [allCustomerDetails, setAllCustomerDetails] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const [newItemData, setNewItemData] = useState({
    shipmentName: "",
    shipmentType: "",
    description: "",
    status: "",
    updatedBy: "",
    entryBy: "",
    name: "",
    mobile: "",
    address: "",
  });

  const handleAddNewItem = (type) => {
    setModalType(type);
    setIsAddModalOpen(true);
  };

  const handleSaveNewItem = async () => {
    let url = "";
    let formData = new URLSearchParams();

    if (modalType === "shipment") {
      if (!newItemData.shipmentName.trim()) {
        toast.error("Shipment Name is required");
        return;
      }
      url = "http://localhost/invi/index.php/plugins/freight/save-shipment";
      formData.append("shipment_name", newItemData.shipmentName);
      formData.append("shipment_type", newItemData.shipmentType);
      formData.append("shipment_description", newItemData.description);
      formData.append("shipment_status", newItemData.status);
    } else if (modalType === "customer") {
      if (!newItemData.name.trim()) {
        toast.error("Customer Name is required");
        return;
      }
      url = "http://localhost/invi/index.php/sell_con/saveInstantClient";
      formData.append("client_name", newItemData.name);
      formData.append("client_mobile", newItemData.mobile);
      formData.append("client_address", newItemData.address);
      formData.append("client_star", "0");
    } else if (modalType === "ctn") {
      if (!newItemData.shipmentName.trim()) {
        toast.error("CTN Number is required");
        return;
      }
      url = "http://localhost/invi/index.php/plugins/freight/save-carton";
      formData.append("ctn_no", newItemData.shipmentName);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const result = await response.json();

      if (result.code === 1) {
        toast.success(result.message || "Added successfully");

        const finalName =
          result.name ||
          (modalType === "customer"
            ? newItemData.name
            : newItemData.shipmentName);

        if (modalType === "ctn") {
          setCtnOptions([...ctnOptions, finalName]);
          setCtnNo(finalName);
        } else if (modalType === "shipment") {
          setShipmentOptions([...shipmentOptions, finalName]);
          setAllShipmentDetails([
            ...allShipmentDetails,
            { ...newItemData, id: result.id },
          ]);
          setShipment(finalName);
        } else if (modalType === "customer") {
          setCustomerOptions([...customerOptions, finalName]);
          setAllCustomerDetails([
            ...allCustomerDetails,
            { ...newItemData, id: result.id },
          ]);

          setCustomerSections((sections) =>
            sections.map((section) => ({
              ...section,
              customerName:
                section.customerName === "" ? finalName : section.customerName,
            }))
          );
        }

        setNewItemData({
          shipmentName: "",
          shipmentType: "",
          description: "",
          status: "",
          updatedBy: "",
          entryBy: "",
          name: "",
          mobile: "",
          address: "",
        });
        setIsAddModalOpen(false);
      } else {
        toast.error(result.message || "Failed to add item");
      }
    } catch (error) {
      console.error("AJAX Error:", error);
      toast.error("Could not connect to the server");
    }
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
    setCustomerSections((prevSections) => [
      ...prevSections.map((section) => ({ ...section, isExpanded: false })),
      {
        id: newId,
        customerName: "",
        chineseName: "",
        goodsName: "",
        goodsQuantity: "",
        weight: "",
        expressNumber: "",
        cbm: "",
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
        cbm: "",
        isExpanded: true,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shipment.trim() || !ctnNo.trim()) {
      toast.error("Please fill required fields.");
      return;
    }

    const selectedShipmentMeta = allShipmentDetails.find(
      (s) => s.shipmentName === shipment
    );

    const submissionData = {
      shipment,
      shipmentMeta: selectedShipmentMeta || null,
      ctnNo,
      customerEntries: customerSections.map((section, index) => {
        const extraCust = allCustomerDetails.find(
          (c) => c.name === section.customerName
        );
        const { isExpanded: _isExpanded, id: _id, ...cleanData } = section;
        return { id: index + 1, ...cleanData, customerMeta: extraCust || null };
      }),
    };

    console.log("Submission Data:", submissionData);
    toast.success("Form submitted!");
    resetForm();
  };

  useEffect(() => {
    if (customerSections.length > 1) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [customerSections.length]);

  return (
    <div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-300">
            <div className="bg-linear-to-r from-purple-500 to-blue-500 px-4 py-3 text-white rounded-t-2xl">
              <h3 className="text-lg mb-0 font-bold">
                Add New{" "}
                {modalType === "ctn"
                  ? "CTN No"
                  : modalType === "shipment"
                  ? "Shipment"
                  : "Customer"}
              </h3>
            </div>

            <div className="p-6 space-y-2! max-h-[60vh] overflow-y-auto">
              {modalType === "shipment" && (
                <>
                  <input
                    type="text"
                    name="shipment_name"
                    placeholder="Shipment Name"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all"
                    value={newItemData.shipmentName}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        shipmentName: e.target.value,
                      })
                    }
                  />

                  <select
                    name="shipment_type"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.shipmentType}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        shipmentType: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Shipment Type
                    </option>
                    <option value="BY_AIR">BY AIR</option>
                    <option value="BY_SHIP">BY SHIP</option>
                    <option value="BY_ROAD">BY ROAD</option>
                  </select>

                  <textarea
                    name="shipment_description"
                    placeholder="Description"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.description}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        description: e.target.value,
                      })
                    }
                  />

                  <select
                    name="shipment_status"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.status}
                    onChange={(e) =>
                      setNewItemData({ ...newItemData, status: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="CHINA_WAREHOUSE">CHINA WAREHOUSE</option>
                    <option value="BD_WAREHOUSE">BD WAREHOUSE</option>
                    <option value="ON_AIR">ON AIR</option>
                    <option value="ON_SHIP">ON SHIP</option>
                  </select>
                </>
              )}

              {modalType === "customer" && (
                <>
                  <input
                    type="text"
                    name="client_name"
                    placeholder="Customer Name"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.name}
                    onChange={(e) =>
                      setNewItemData({ ...newItemData, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    name="client_mobile"
                    placeholder="Mobile"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.mobile}
                    onChange={(e) =>
                      setNewItemData({ ...newItemData, mobile: e.target.value })
                    }
                  />
                  <textarea
                    name="client_address"
                    placeholder="Address"
                    className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition-all bg-white"
                    value={newItemData.address}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        address: e.target.value,
                      })
                    }
                  />
                </>
              )}

              {modalType === "ctn" && (
                <input
                  type="text"
                  placeholder="Enter CTN-XXX"
                  className="w-full text-black px-4 py-2 border-2 border-gray-300 rounded-xl"
                  value={newItemData.shipmentName}
                  onChange={(e) =>
                    setNewItemData({
                      ...newItemData,
                      shipmentName: e.target.value,
                    })
                  }
                />
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 font-medium rounded-xl! hover:bg-gray-100! transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewItem}
                  className="flex-1 px-6 py-2 bg-linear-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl! shadow-md hover:-translate-y-1! transition-all duration-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="text-black" onSubmit={handleSubmit}>
        <div className="p-3 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
              <DropdownWithSearch
                label="Shipment"
                apiEndpoint="http://localhost/invi/index.php/plugins/freight/shipments"
                value={shipment}
                onChange={setShipment}
                placeholder="Select shipment"
                isRequired
                onAddNew={() => handleAddNewItem("shipment")}
                options={shipmentOptions}
              />
            </div>

            <div className="flex-1 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
              <DropdownWithSearch
                label="CTN No"
                options={ctnOptions}
                value={ctnNo}
                onChange={setCtnNo}
                placeholder="Select CTN"
                isRequired
                onAddNew={() => handleAddNewItem("ctn")}
                apiEndpoint="http://localhost/invi/index.php/plugins/freight/cartons"
              />
            </div>
          </div>

          {customerSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-linear-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-100 overflow-hidden transition-all duration-300 hover:border-purple-200"
            >
              <div className="flex justify-between items-center p-3 rounded-t-2xl border-b border-blue-100 bg-linear-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="flex items-center gap-3 text-gray-800 hover:text-purple-600 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-[20px] font-extrabold mb-0">
                        Customer Entry #{index + 1}
                      </h4>
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(section.id)}
                    className="px-3 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md"
                  >
                    {section.isExpanded ? (
                      <IoIosArrowUp className="h-4 w-4" />
                    ) : (
                      <IoIosArrowDown className="h-4 w-4" />
                    )}
                  </button>
                  {customerSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomerSection(section.id)}
                      className="px-3 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  section.isExpanded
                    ? "opacity-100 p-3 visible"
                    : "max-h-0 opacity-0 invisible overflow-hidden"
                }`}
                style={section.isExpanded ? { maxHeight: "none" } : {}}
              >
                <div className="space-y-6">
                  <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-3 border border-purple-100">
                    <DropdownWithSearch
                      label="Customer Name"
                      options={customerOptions}
                      value={section.customerName}
                      onChange={(val) =>
                        handleCustomerSectionChange(
                          section.id,
                          "customerName",
                          val || ""
                        )
                      }
                      placeholder="Select customer"
                      isRequired={true}
                      onAddNew={() => handleAddNewItem("customer")}
                      apiEndpoint="http://localhost/invi/index.php/client/ajax_clientDropdown"
                    />
                  </div>
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
                      { label: "CBM", field: "cbm", type: "text" },
                    ].map((config, idx) => (
                      <div key={idx} className="group">
                        <label className="block text-black font-medium text-base mb-1">
                          {config.label}
                        </label>
                        <input
                          type={config.type}
                          value={section[config.field]}
                          onChange={(e) =>
                            handleCustomerSectionChange(
                              section.id,
                              config.field,
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all group-hover:border-blue-300"
                          placeholder={`Enter ${config.label.toLowerCase()}`}
                          step={config.step}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-3 border border-blue-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 flex justify-center items-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#008594] via-[#38b2ac] to-[#0ceded] text-white font-bold rounded-xl! hover:shadow-xl! transform hover:-translate-y-0.5 transition-all"
              >
                <FaLocationArrow /> Submit All Entries
              </button>
              <button
                type="button"
                onClick={addCustomerSection}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl! hover:shadow-xl! transform hover:-translate-y-0.5 transition-all"
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
