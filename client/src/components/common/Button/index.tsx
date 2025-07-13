import { cn } from "utils/functions";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  type = "button",
  disabled,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      data-loading={isLoading}
      className={cn(
        "relative flex h-9 cursor-pointer items-center justify-center rounded-md bg-(--meta-primary) px-4 text-sm font-semibold text-white hover:bg-(--meta-primary-hover)",
        "disabled:pointer-events-none disabled:opacity-50 disabled:select-none",
        "data-[loading=true]:pointer-events-none",
        className,
      )}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
}
