type Props = {
  label?: string; // opcional
  value: string;
  onChange: (e: any) => void;
  options: string[];
};


export default function Select({ label, value, onChange, options }: Props) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="font-semibold">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded-lg bg-white"
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
