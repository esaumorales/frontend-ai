type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  };
  
  export function Button({ children, ...props }: Props) {
    return (
      <button
        {...props}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
      >
        {children}
      </button>
    );
  }
  