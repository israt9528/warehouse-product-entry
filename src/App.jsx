import React, { useEffect, useState } from "react";
import FormSection from "./Components/FormSection";
import PreviewSection from "./Components/PreviewSection";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaLocationArrow } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const BASE = "http://localhost/invi/";

const App = () => {
  const [productInfo, setProductInfo] = useState({
    shipment: "",
    ctnNo: "",
    customerEntries: [],
  });

  const [shipment, setShipment] = useState("");
  const [ctnNo, setCtnNo] = useState("");
  const [customerSections, setCustomerSections] = useState([
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

  const [allShipmentDetails, setAllShipmentDetails] = useState([]);
  const [allCustomerDetails, setAllCustomerDetails] = useState([]);

  useEffect(() => {
    fetch("/demoData.json")
      .then((res) => res.json())
      .then((data) => setProductInfo(data))
      .catch((err) => console.error(err));
  }, []);

  // ADD CUSTOMER LOGIC (Moved from FormSection)
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

  // SUBMIT LOGIC (Moved from FormSection)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!shipment || !ctnNo) {
      toast.error("Please select Shipment and CTN No.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("shipment_id", shipment);
    formData.append("carton_id", ctnNo);

    customerSections.forEach((section) => {
      formData.append("client_id[]", section.customerName);
      formData.append("chinese_name[]", section.chineseName);
      formData.append("goods_name[]", section.goodsName);
      formData.append("goods_qty[]", section.goodsQuantity);
      formData.append("weight[]", section.weight);
      formData.append("express_no[]", section.expressNumber);
      formData.append("cbm[]", section.cbm);
    });

    try {
      const response = await fetch(
        `${BASE}index.php/plugins/freight/save-products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const res = await response.json();

      if (res.code === 1) {
        toast.success(res.message || "Data saved successfully!");

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
      } else {
        toast.error(res.message || "Failed to save data.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Server error. Please try again.");
    }
  };

  // Inside the App component function...

  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    const loadPreview = async () => {
      if (!shipment || !ctnNo) {
        setPreviewHtml("");
        return;
      }

      try {
        const response = await fetch(
          `${BASE}index.php/plugins/freight/preview-products`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              shipment_id: shipment,
              carton_id: ctnNo,
            }).toString(),
          }
        );

        const res = await response.json();

        if (res.html) {
          setPreviewHtml(res.html);
        } else {
          setPreviewHtml("");
        }
      } catch (error) {
        console.error("Preview Load Error:", error);
        toast.error("Failed to load server preview");
      }
    };

    loadPreview();
  }, [shipment, ctnNo]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-2">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-linear-to-r from-[#008594] via-[#3b82f6] to-[#8b5cf6] rounded-t-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-0">Product Entry Form</h2>
              <p className="text-blue-100 mb-0">
                Enter warehouse product details
              </p>
            </div>
            <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden border border-gray-200">
              <FormSection
                shipment={shipment}
                setShipment={setShipment}
                ctnNo={ctnNo}
                setCtnNo={setCtnNo}
                customerSections={customerSections}
                setCustomerSections={setCustomerSections}
                allShipmentDetails={allShipmentDetails}
                setAllShipmentDetails={setAllShipmentDetails}
                allCustomerDetails={allCustomerDetails}
                setAllCustomerDetails={setAllCustomerDetails}
                hideButtons={true}
              />

              {/* ACTION BUTTONS MOVED HERE */}
              <div className="p-3 pt-0">
                <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-3 border border-blue-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleSubmit}
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
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <PreviewSection
                  productInfo={productInfo}
                  setShipment={setShipment}
                  setCtnNo={setCtnNo}
                  setCustomerSections={setCustomerSections}
                />
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h5 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    Product Record Preview
                  </h5>
                </div>

                <div className="p-4">
                  {previewHtml ? (
                    <div
                      className="prose prose-sm max-w-none text-gray-800"
                      dangerouslySetInnerHTML={{ __html: previewHtml }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center border-2 border-dashed border-gray-100 rounded-xl">
                      <div className="bg-blue-50 p-3 rounded-full mb-3">
                        <svg
                          className="w-6 h-6 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500">
                        Select <strong>Shipment</strong> &{" "}
                        <strong>Carton</strong> to view existing records from
                        server.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
