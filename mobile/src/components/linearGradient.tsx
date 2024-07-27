import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import * as React from "react";

type Props = {
  children: React.ReactNode;
};

function LinearGradient({ children }: Props) {
  return (
    <ExpoLinearGradient colors={["#001309", "#001309", "#020202"]} className="flex-1">
      {children}
    </ExpoLinearGradient>
  );
}

export { LinearGradient };
