type Props = {
    label: string;
    value: string;
    onChange: (e: any) => void;
    type?: string;
  };
  
  export default function Input({ label, value, onChange, type = "text" }: Props) {
    return (
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="border px-3 py-2 rounded-lg bg-white"
        />
      </div>
    );
  }
  