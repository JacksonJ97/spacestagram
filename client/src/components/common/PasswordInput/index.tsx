import { useState } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { cn, cx } from "utils/functions";
import XIcon from "components/common/Icons/X";
import EyeIcon from "components/common/Icons/Eye";
import CheckIcon from "components/common/Icons/Check";
import EyeOffIcon from "components/common/Icons/EyeOff";

interface PasswordInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "name" | "type" | "defaultValue"
  > {
  hideHints?: boolean;
}

export default function PasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  required,
  hideHints,
  className,
  // ControllerProps
  name,
  control,
  defaultValue,
  ...props
}: PasswordInputProps & UseControllerProps<TFieldValues, TName>) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const checkStrength = (value: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    ];

    return requirements.map((requirement) => ({
      met: requirement.regex.test(value),
      text: requirement.text,
    }));
  };

  const strength = checkStrength(field.value);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={name}
          className="text-sm font-semibold text-(--text-color)"
        >
          Password
        </label>
        <div className="relative">
          <input
            id={name}
            type={isVisible ? "text" : "password"}
            autoCorrect="off"
            autoCapitalize="off"
            aria-required={required}
            aria-describedby={
              hideHints
                ? undefined
                : `${name}-requirements ${name}-requirements-list`
            }
            aria-invalid={error ? true : undefined}
            aria-errormessage={error ? `${name}-error` : undefined}
            className={cn(
              "h-9 w-full rounded-xs border border-(--border-color) bg-(--secondary-background-color) p-2 text-sm text-(--text-color)",
              error && "border-(--error-color)",
              className,
            )}
            {...field}
            {...props}
          />
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-controls="password"
            aria-pressed={isVisible}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 end-0 flex w-9 cursor-pointer items-center justify-center rounded-e-xs text-(--text-color) hover:text-(--text-color)/75"
          >
            {isVisible ? (
              <EyeOffIcon width={16} height={16} aria-hidden="true" />
            ) : (
              <EyeIcon width={16} height={16} aria-hidden="true" />
            )}
          </button>
        </div>
        {error && error.message && (
          <p id={`${name}-error`} className="text-sm text-(--error-color)">
            {error.message}
          </p>
        )}
      </div>

      {!hideHints && (
        <>
          <p
            id={`${name}-requirements`}
            className="mt-3 text-sm text-(--text-color)"
          >
            Password must contain:
          </p>

          <ul
            id={`${name}-requirements-list`}
            className="mt-1.5 flex flex-col gap-1.5"
          >
            {strength.map((requirement, index) => (
              <li key={index} className="flex items-center gap-2">
                {requirement.met ? (
                  <CheckIcon
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="text-emerald-500"
                  />
                ) : (
                  <XIcon
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="text-(--text-color)"
                  />
                )}
                <span
                  className={cx(
                    "text-sm",
                    requirement.met
                      ? "text-emerald-600"
                      : "text-(--text-color)",
                  )}
                >
                  {requirement.text}
                  <span className="sr-only">
                    {requirement.met
                      ? " - Requirement met"
                      : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
