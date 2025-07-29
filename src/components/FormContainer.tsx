interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FormContainer({ children, className = '' }: FormContainerProps) {
  return (
    <div
      className={`mx-auto h-full rounded-xl border border-white/40 bg-white/20 p-4 shadow-xl backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
