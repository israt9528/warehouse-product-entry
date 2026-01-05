import { useEffect, useRef } from "react";
import $ from "jquery";
// Import the JS and CSS directly
import select2 from "select2";
import "select2/dist/css/select2.min.css";

const DropdownWithSearch = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  isRequired = false,
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    // 1. Manually attach select2 to the jQuery instance ($)
    // This solves the "is not a function" and "not loaded" error
    if ($.fn && !$.fn.select2) {
      select2(window, $);
    }

    const $select = $(selectRef.current);

    $select.select2({
      placeholder: placeholder,
      allowClear: true,
      width: "100%",
      dropdownParent: $select.parent(),
    });

    // 2. Sync changes to React
    $select.on("change", (e) => {
      const val = $select.val();
      onChange(val);
    });

    return () => {
      if ($.fn.select2) {
        $select.select2("destroy");
      }
    };
  }, []); // Only run once

  // 3. Sync React state changes (like form reset) back to Select2 UI
  useEffect(() => {
    const $select = $(selectRef.current);
    if ($select.val() !== value) {
      $select.val(value).trigger("change.select2");
    }
  }, [value]);

  return (
    <div className="w-full select2-parent">
      <label className="block text-black font-medium text-lg mb-2">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>

      <select ref={selectRef} className="w-full">
        <option></option> {/* Required for placeholder */}
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownWithSearch;
