import React, { useEffect, useState } from "react";
import FormSection from "./Components/FormSection";
import PreviewSection from "./Components/PreviewSection";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaLocationArrow } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";

const BASE = "http://localhost/invi/";

const App = () => {
  const [previewData, setPreviewData] = useState(null);

  const [shipmentId, setShipmentId] = useState("");
  const [shipmentName, setShipmentName] = useState("");

  const [ctnId, setCtnId] = useState("");
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

    if (!shipmentId || !ctnId) {
      toast.error("Please select Shipment and CTN No.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("shipment_id", shipmentId);
    formData.append("carton_id", ctnId);

    customerSections.forEach((section) => {
      formData.append("client_id[]", section.customerId);
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
        Swal.fire({
          icon: "success",
          html: `
    <div style="text-align: center;">
      <h2 style="color: #3b82f6; font-weight: bold; margin-bottom: 10px;">Submission Successful!</h2>
      <p style="color: #64748b;">${res.message}</p>
      <hr style="border: 0; border-top: 1px dashed #cbd5e1; margin: 15px 0;">
      <p style="font-size: 0.8rem; color: #94a3b8;">Shipment and products have been logged.</p>
    </div>
  `,
          showConfirmButton: false,
          timer: 2500,
          borderRadius: "20px",
        });
        // toast.success(res.message || "Data saved successfully!");

        setCtnNo("");
        setCtnId("");
        setShipmentId("");
        setShipmentName("");
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

  useEffect(() => {
    const loadPreview = async () => {
      if (!shipmentId || !ctnId) {
        setPreviewData(null);
        return;
      }

      try {
        const response = await fetch(
          `${BASE}index.php/plugins/freight/preview-products`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              shipment_id: shipmentId,
              carton_id: ctnId,
            }).toString(),
          }
        );

        const res = await response.json();

        if (res.code === 1 && res.clients) {
          const transformedData = {
            shipment: res.header.shipment_name,
            ctnNo: res.header.carton_name,
            customerEntries: Object.keys(res.clients).map((clientId) => {
              const client = res.clients[clientId];
              const item =
                client.items && client.items.length > 0 ? client.items[0] : {};
              return {
                id: clientId,
                customerName: client.client_name,
                chineseName: item.chinese_name || "",
                goodsName: item.goods_name || "",
                goodsQuantity: item.qty || 0,
                weight: item.kg || 0,
              };
            }),
          };
          setPreviewData(transformedData);
        } else {
          setPreviewData(null);
        }
      } catch (error) {
        console.error("Preview Load Error:", error);
        setPreviewData(null);
      }
    };

    loadPreview();
  }, [shipmentId, ctnId]);

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
                shipmentId={shipmentId}
                setShipmentId={setShipmentId}
                shipmentName={shipmentName}
                setShipmentName={setShipmentName}
                ctnId={ctnId}
                setCtnId={setCtnId}
                ctnNo={ctnNo}
                setCtnNo={setCtnNo}
                customerSections={customerSections}
                setCustomerSections={setCustomerSections}
                BASE={BASE}
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
                <PreviewSection productInfo={previewData} />
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
