import { colors } from "@/styles/colors";
import clsx from "clsx";
import React from "react";
import {
  Control,
  Controller,
  ErrorOption,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Platform, Text, TextInput, TextInputProps, View, ViewProps } from "react-native";

type Variants = "flat" | "outlined";

type InputProps = ViewProps & {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
};

function Input({ children, variant = "flat", className, ...rest }: InputProps) {
  return (
    <View
      className={clsx(
        "h-[50px] bg-zinc-800 px-4 rounded-2xl",
        {
          "border border-zinc-700": variant === "flat",
          "border-b-2 border-primary-200": variant === "outlined",
        },
        className
      )}
      {...rest}
    >
      {children}
    </View>
  );
}

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  className?: string;
  /* error?: ErrorOption;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >; */
} & TextInputProps;

function ControlledField<T extends FieldValues>({
  name,
  control,
  className,
  /*   error,
  rules, */
  ...rest
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      /* rules={rules} */
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            className={clsx("flex-1 text-zinc-100", className)}
            placeholderTextColor={colors.zinc[400]}
            cursorColor={colors.zinc[100]}
            selectionColor={Platform.OS === "ios" ? colors.zinc[100] : undefined}
            onChangeText={(text) => {
              onChange(text);
              rest.onChangeText?.(text);
            }}
            onBlur={(e) => {
              onBlur();
              rest.onBlur?.(e);
            }}
            value={value}
            {...rest}
          />
          {/*  {error && <Text className="text-red-500">{error.message}</Text>} */}
        </>
      )}
    />
  );
}

Input.ControlledField = ControlledField;

export { Input };
