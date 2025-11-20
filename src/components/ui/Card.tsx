export function Card({ children }: { children: React.ReactNode }) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {children}
      </div>
    );
  }
  