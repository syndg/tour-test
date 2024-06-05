import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CustomFormFieldProps = {
  label?: string;
  type?: "text" | "email" | "password";
  placeholderText?: string;
  optional?: boolean;
  disabled?: boolean;
};

const CustomInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  placeholderText,
  type = "text",
  optional = false,
  disabled,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  CustomFormFieldProps) => {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-2">
            <FormLabel className="font-semibold text-gray-600">
              {label}{" "}
              {optional && (
                <span className="text-sm font-normal">(Optional)</span>
              )}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholderText}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
      {...props}
    />
  );
};

export default CustomInput;
