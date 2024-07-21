import { ChangeEvent } from "react";

interface LabelSelectProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options: Array<{
    value: string;
    label: string;
  }>;
  selectedOption: string;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelSelect = ({
  id,
  label,
  name,
  required,
  options,
  selectedOption,
  handleSelectChange,
}: LabelSelectProps) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="text-sm font-normal block text-white mb-1 ml-1 lg:text-base"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={selectedOption}
        onChange={handleSelectChange}
        required={required}
        className="w-full p-4 text-sm rounded-lg outline-none bg-inputBgColor text-white appearance-none"
      >
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LabelSelect;