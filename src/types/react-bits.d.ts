declare module "react-bits/src/content/Animations/ElectricBorder/ElectricBorder" {
  import type { CSSProperties, PropsWithChildren } from "react";
  export interface ElectricBorderProps {
    color?: string;
    speed?: number;
    chaos?: number;
    thickness?: number;
    className?: string;
    style?: CSSProperties;
  }
  const ElectricBorder: (
    props: PropsWithChildren<ElectricBorderProps>
  ) => JSX.Element;
  export default ElectricBorder;
}

declare module "react-bits/src/ts-default/TextAnimations/GradientText/GradientText" {
  import type { PropsWithChildren } from "react";
  const GradientText: (props: PropsWithChildren<object>) => JSX.Element;
  export default GradientText;
}
