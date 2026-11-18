import {
  useController,
  type FieldValues,
  type FieldPathByValue,
  type UseControllerProps,
} from "react-hook-form";
import { cn } from "utils/functions";

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "type" | "defaultValue" | "value" | "onChange" | "onBlur" | "disabled"
>;

type TextInputProps<
  T extends FieldValues,
  N extends FieldPathByValue<T, string>,
> = NativeInputProps & {
  label: string;
  controller: UseControllerProps<T, N>;
  type?: "text" | "email";
};

export default function TextInput<T extends FieldValues, N extends FieldPathByValue<T, string>>({
  type = "text",
  label,
  required,
  className,
  controller,
  ...props
}: TextInputProps<T, N>) {
  const {
    field,
    fieldState: { error },
  } = useController(controller);

  const { name } = controller;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-(--text-color)">
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoCorrect="off"
        autoCapitalize="off"
        required={required}
        aria-required={required}
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
