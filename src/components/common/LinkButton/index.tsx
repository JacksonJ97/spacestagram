import { NavLink } from "react-router";
import { cn } from "utils/functions";

interface LinkButtonProps extends React.ComponentProps<typeof NavLink> {
  variant: "solid" | "text";
  className?: string;
}

export default function LinkButton({
  variant,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <NavLink
      className={cn(
        variant === "solid" &&
          "flex h-8 items-center justify-center rounded-lg bg-(--meta-primary) px-4 text-sm font-semibold text-white hover:bg-(--meta-primary-hover)",
        variant === "text" &&
          "text-sm font-semibold text-(--meta-primary) hover:text-(--text-color)",
        className,
      )}
      {...props}
    />
  );
}
