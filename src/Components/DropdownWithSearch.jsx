import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import $ from "jquery";
import select2 from "select2";
import "select2/dist/css/select2.min.css";
import { IoIosAddCircle } from "react-icons/io";

const DropdownWithSearch = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      placeholder,
      isRequired = false,
      onAddNew,
      apiEndpoint,
      extraParams = {},
    },
    ref
  ) => {
    const selectRef = useRef(null);
    const optionsCacheRef = useRef([]);

    // const injectAndSelectOption = (id, text) => {
    //   const $select = $(selectRef.current);

    //   // cache এ ঢুকাই
    //   optionsCacheRef.current.push({
    //     id,
    //     text,
    //   });

    //   // যদি option DOM এ না থাকে
    //   if ($select.find(`option[value="${id}"]`).length === 0) {
    //     const newOption = new Option(text, id, true, true);
    //     $select.append(newOption);
    //   }

    //   // select করে দেই
    //   $select.val(id).trigger("change.select2");
    // };

    useImperativeHandle(ref, () => ({
      injectAndSelectOption: (id, text) => {
        const $select = $(selectRef.current);

        // Update cache
        if (
          !optionsCacheRef.current.find((opt) => String(opt.id) === String(id))
        ) {
          optionsCacheRef.current.push({ id, text });
        }

        // Add to DOM if missing
        if ($select.find(`option[value="${id}"]`).length === 0) {
          const newOption = new Option(text, id, true, true);
          $select.append(newOption);
        }

        // Trigger selection
        $select.val(id).trigger("change.select2");
      },
    }));

    // useEffect(() => {
    //   if (!selectRef.current) return;
    //   selectRef.current.injectAndSelectOption = injectAndSelectOption;
    // }, []);

    useEffect(() => {
      if ($.fn && !$.fn.select2) {
        select2(window, $);
      }

      const $select = $(selectRef.current);

      $select.select2({
        placeholder: placeholder,
        allowClear: false,
        width: "100%",
        dropdownParent: $(document.body),
        ajax: apiEndpoint
          ? {
              url: apiEndpoint,
              dataType: "json",
              delay: 250,
              data: (params) => {
                return {
                  q: params.term || "",
                  search: params.term || "",
                  ...extraParams,
                };
              },
              processResults: (data) => {
                const items = data.result || data.results || data || [];

                const mapped = items.map((item) => ({
                  id: typeof item === "object" ? item.id || item.text : item,
                  text:
                    typeof item === "object"
                      ? item.text || item.name || item.client_name
                      : item,
                }));

                optionsCacheRef.current = mapped;

                return {
                  results: mapped,
                };
              },
              cache: true,
            }
          : null,
      });

      // Handle Change
      $select.on("change", () => {
        const selectedId = $select.val();

        const selectedOption = optionsCacheRef.current.find(
          (opt) => String(opt.id) === String(selectedId)
        );

        if (selectedOption) {
          onChange(selectedOption);
        } else {
          onChange(null);
        }
      });

      return () => {
        if ($.fn.select2) {
          $select.off("change");
          $select.select2("destroy");
        }
      };
    }, [apiEndpoint, placeholder, JSON.stringify(extraParams)]);

    // Sync state changes from outside
    // useEffect(() => {
    //   const $select = $(selectRef.current);

    //   if (!value) return;

    //   // cache থেকে selected option বের করি
    //   const selectedOption = optionsCacheRef.current.find(
    //     (opt) => String(opt.id) === String(value)
    //   );

    //   if (selectedOption) {
    //     // যদি option DOM এ না থাকে, manually add করি
    //     let optionExists = $select.find(`option[value="${value}"]`).length > 0;

    //     if (!optionExists) {
    //       const newOption = new Option(
    //         selectedOption.text,
    //         selectedOption.id,
    //         true,
    //         true
    //       );
    //       $select.append(newOption);
    //     }

    //     $select.val(value).trigger("change.select2");
    //   }
    // }, [value]);

    // Sync state changes from outside
    useEffect(() => {
      const $select = $(selectRef.current);
      if (!value) {
        $select.val(null).trigger("change.select2");
        return;
      }

      // 1. Check if the option already exists in the HTML DOM
      let optionExists = $select.find(`option[value="${value}"]`).length > 0;

      if (!optionExists) {
        // 2. Check if we have the text in our cache
        const cached = optionsCacheRef.current.find(
          (opt) => String(opt.id) === String(value)
        );

        const displayText = cached ? cached.text : value;

        const newOption = new Option(displayText, value, true, true);
        $select.append(newOption);
      }

      // 4. Set the value and refresh Select2
      if ($select.val() !== String(value)) {
        $select.val(value).trigger("change.select2");
      }
    }, [value]);

    return (
      <div className="w-full relative group">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-black font-medium text-base">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>

          {onAddNew && (
            <button
              type="button"
              onClick={onAddNew}
              className="flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors bg-purple-50 px-2 py-1 rounded-lg border border-purple-100"
            >
              <IoIosAddCircle className="text-lg" />
              <span>Add New</span>
            </button>
          )}
        </div>

        <div className="select2-wrapper-custom text-black">
          <select ref={selectRef} className="w-full">
            <option></option>
            {/* Internal options (for newly added items) */}
            {options &&
              options.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
      </div>
    );
  }
);

export default DropdownWithSearch;
