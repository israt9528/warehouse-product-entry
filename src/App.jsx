import React, { useEffect, useState } from "react";
import { FiHome, FiPackage, FiTrendingUp, FiUsers } from "react-icons/fi";
import FormSection from "./Components/FormSection";
import PreviewSection from "./Components/PreviewSection";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [productInfo, setProductInfo] = useState({
    shipment: "",
    ctnNo: "",
    customerEntries: [],
  });
  // Lifted States
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

  const [shipmentOptions, setShipmentOptions] = useState([
    "Shipment 1",
    "Shipment 2",
    "Shipment 3",
  ]);
  const [ctnOptions, setCtnOptions] = useState([
    "SKH 506",
    "SKH 507",
    "SKH 508",
    "SKH 509",
    "SKH 510",
  ]);
  const [customerOptions, setCustomerOptions] = useState([
    "PURPLE WAVE",
    "ADNAN ROOMY",
    "ABDUI KADER",
  ]);

  // useEffect(() => {
  //   setProductInfo({ shipment, ctnNo, customerEntries: customerSections });
  // }, [shipment, ctnNo, customerSections]);

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
      })
      .catch((err) => console.error(err));
  }, []);
  // console.log(productInfo);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-2">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-3">
          <div className="bg-linear-to-r from-[#008594] via-[#0ea5e9] to-[#0284c7] rounded-3xl p-4 text-white relative overflow-hidden">
            {" "}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <FiPackage className="h-7 w-7" />
                    </div>
                    <div className="leading-0!">
                      <h1 className="text-2xl font-bold bg-linear-to-r from-white to-cyan-200! bg-clip-text! text-transparent! mb-0!">
                        Warehouse Product Entry
                      </h1>
                      <p className="text-cyan-100 text-base my-0">
                        Streamlined product intake system with real-time preview
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex  gap-3 bg-linear-to-r from-emerald-500/30 to-cyan-500/30 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/5">
                  <div className="text-center">
                    <p className="text-sm opacity-90 my-0">System Status</p>
                    <p className="text-lg font-bold my-0">Operational</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <div className="bg-linear-to-r from-[#008594] via-[#3b82f6] to-[#8b5cf6] rounded-t-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-0">
                      Product Entry Form
                    </h2>
                    <p className="text-blue-100 mb-0">
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
            <div className="bg-white rounded-b-2xl shadow-2xl overflow-hidden border border-gray-200">
              <FormSection
                shipment={shipment}
                setShipment={setShipment}
                ctnNo={ctnNo}
                setCtnNo={setCtnNo}
                customerSections={customerSections}
                setCustomerSections={setCustomerSections}
                shipmentOptions={shipmentOptions}
                setShipmentOptions={setShipmentOptions}
                ctnOptions={ctnOptions}
                setCtnOptions={setCtnOptions}
                customerOptions={customerOptions}
                setCustomerOptions={setCustomerOptions}
              />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <PreviewSection
                  productInfo={productInfo}
                  setShipment={setShipment}
                  setCtnNo={setCtnNo}
                  setCustomerSections={setCustomerSections}
                  shipmentOptions={shipmentOptions}
                  ctnOptions={ctnOptions}
                  customerOptions={customerOptions}
                />
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
