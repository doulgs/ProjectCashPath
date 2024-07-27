import clsx from "clsx";
import { createContext, ReactNode, useContext } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  TextProps,
} from "react-native";

type Variants = "solid" | "outline" | "ghost";

type ButtonProps = PressableProps & {
  variant?: Variants;
  isLoading?: boolean;
  children: ReactNode;
};

const ThemeContext = createContext<{ variant?: Variants }>({});

function Button({
  variant = "solid",
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      className={clsx(
        "flex-1 flex-row items-center min-h-[50px] bg-green-800 px-4 rounded-2xl border border-zinc-700",
        {
          "border-0": variant === "solid",
          "bg-zinc-800": variant === "outline",
          "": variant === "ghost",
        },
        className
      )}
      disabled={isLoading}
      {...rest}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
      </ThemeContext.Provider>
    </Pressable>
  );
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext);

  return (
    <Text
      className={clsx(
        "flex-1 items-center justify-center text-center font-semibold text-2xl",
        {
          "text-zinc-50": variant === "solid",
          "text-zinc-900": variant === "outline",
        }
      )}
    >
      {children}
    </Text>
  );
}

Button.Title = Title;

export { Button };
