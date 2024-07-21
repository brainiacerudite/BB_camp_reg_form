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
    <div>
      <label htmlFor={id} className="text-lg font-medium lg:text-xl block text-white mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={selectedOption}
        onChange={handleSelectChange}
        required={required}
        className="w-full p-4 rounded-lg outline-none bg-inputBgColor text-white appearance-none"
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
