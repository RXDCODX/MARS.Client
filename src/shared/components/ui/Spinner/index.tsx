import { Spin as AntSpin } from "antd";

interface SpinnerProps {
  animation?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap: Record<string, "small" | "default" | "large"> = {
  sm: "small",
  md: "default",
  lg: "large",
};

const Spinner = ({ size = "md", className }: SpinnerProps) => (
  <AntSpin size={sizeMap[size] ?? "default"} className={className} />
);

export default Spinner;
