import { useEffect, useRef } from "react";

import $ from "jquery";

import select2 from "select2";

import "select2/dist/css/select2.min.css";

import { IoIosAddCircle } from "react-icons/io";

const DropdownWithSearch = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  isRequired = false,
  onAddNew,
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if ($.fn && !$.fn.select2) {
      select2(window, $);
    }

    const $select = $(selectRef.current);

    $select.select2({
      placeholder: placeholder,
      allowClear: true,
      width: "100%",
      // ATTACH TO BODY: This is the gold standard for fixing z-index/cut-off issues
      dropdownParent: $(document.body),
      minimumResultsForSearch: 0,
    });

    // Use select2 specific events for React state updates
    $select.on("change", (e) => {
      onChange($select.val());
    });

    return () => {
      if ($.fn.select2) {
        $select.select2("destroy");
      }
    };
  }, [options]);

  // Sync state changes

  useEffect(() => {
    const $select = $(selectRef.current);

    if ($select.val() !== value) {
      $select.val(value).trigger("change.select2");
    }
  }, [value]);

  return (
    <div className="w-full relative group">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-black font-medium text-lg">
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

      <div className="select2-wrapper text-black">
        <select ref={selectRef} className="w-full">
          <option></option>

          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownWithSearch;
