type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({ children, onClick, disabled, className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold 
        hover:bg-blue-500 transition disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}
