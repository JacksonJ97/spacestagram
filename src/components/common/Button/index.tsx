import { cn } from "utils/functions";

export default function Button({
  type = "button",
  disabled,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "flex h-8 cursor-pointer items-center justify-center rounded-lg bg-(--meta-primary) px-4 text-sm font-semibold text-white hover:bg-(--meta-primary-hover)",
        disabled && "cursor-default opacity-50 hover:bg-(--meta-primary)",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
