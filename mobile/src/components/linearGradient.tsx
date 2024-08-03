import clsx from "clsx";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

type GradientProps = {
  colors: string[];
  className?: string;
  children: React.ReactNode;
};

function LinearGradient({ children }: Props) {
  return (
    <ExpoLinearGradient colors={["#001309", "#001309", "#020202"]} className="flex-1">
      {children}
    </ExpoLinearGradient>
  );
}
function CustomLinearGradient({ colors, className, children }: GradientProps) {
  return (
    <ExpoLinearGradient colors={colors} className={clsx("flex-1", { className })}>
      {children}
    </ExpoLinearGradient>
  );
}

export { LinearGradient, CustomLinearGradient };
