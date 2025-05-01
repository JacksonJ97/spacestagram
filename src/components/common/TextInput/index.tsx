import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { cn } from "utils/functions";

interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "type" | "disabled" | "defaultValue"
  > {
  label: string;
  type?: "text" | "password";
}

export default function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type = "text",
  label,
  required,
  className,
  // ControllerProps
  name,
  rules,
  control,
  disabled,
  defaultValue,
  ...props
}: TextInputProps & UseControllerProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
    disabled,
    defaultValue,
  });

  const isRequired = required || !!rules?.required;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-(--text-color)"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoCorrect="off"
        autoCapitalize="off"
        aria-label={label}
        aria-required={isRequired ? true : undefined}
        aria-invalid={error ? true : undefined}
        aria-errormessage={error ? `${name}-error` : undefined}
        className={cn(
          "h-9 rounded-xs border border-(--border-color) bg-(--secondary-background-color) p-2 text-sm text-(--text-color)",
          error && "border-(--error-color)",
          className,
        )}
        {...field}
        {...props}
      />
      {error && error.message && (
        <p id={`${name}-error`} className="text-sm text-(--error-color)">
          {error.message}
        </p>
      )}
    </div>
  );
}
