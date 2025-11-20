type Props = {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  
  export function FormField({ label, name, value, options, onChange }: Props) {
    return (
      <div>
        <label className="block font-semibold mb-1">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md bg-gray-50"
        >
          <option value="">Seleccione...</option>
          {options.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
    );
  }
  