import { ArrowDropDown } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

export const Select = ({
  options,
  placeholder,
  value,
  onChange,
  className,
  initialValue,
}) => {
  const [isDropdownVisible, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((isVisible) => !isVisible);
  };

  const valueLabelMap = useMemo(() => options.reduce((acc, option) => {
    acc.set(option.value, option.label);
    return acc;
  }, new Map()), [options]);

  return (
    <div className={`relative flex items-center rounded p-1 gap-[10px] hover:bg-gray-300 ${isDropdownVisible && 'bg-gray-lighter'}`}>
      <p onClick={toggleDropdown} className="cursor-pointer ">{valueLabelMap.get(value) || placeholder}</p>
      <ul hidden={!isDropdownVisible} className="absolute top-4 left-0 border w-full mt-5 rounded bg-white">
        {options.map((option) => (
          <li
            onClick={() => {
              onChange(option.value);
              toggleDropdown();
            }}
            className="px-2 py-1 hover:bg-gray-lightest cursor-pointer"
            key={crypto.randomUUID()}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <ArrowDropDown className=" " />
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  initialValue: PropTypes.string,
};
