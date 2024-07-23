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
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  inputId?: string;
  inputName?: string;
  otherValue?: string | number;
  inputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabelSelect = ({
  id,
  label,
  name,
  required,
  options,
  selectedOption,
  onChange,
}: LabelSelectProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // const value = event.target.value;
    onChange(event);
  };

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
        className="w-full p-4 text-sm rounded-lg outline-none bg-inputBgColor text-white"
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
