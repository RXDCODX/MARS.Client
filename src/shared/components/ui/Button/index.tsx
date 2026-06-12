import type { ButtonProps as AntButtonProps } from "antd";
import { Button as AntButton } from "antd";

interface ButtonProps extends Omit<AntButtonProps, "variant"> {
  variant?:
    | "primary"
    | "secondary"
    | "outline-primary"
    | "outline-secondary"
    | "success"
    | "danger"
    | "warning"
    | "link"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<string, AntButtonProps["size"]> = {
  sm: "small",
  md: "middle",
  lg: "large",
};

const Button = ({
  variant = "primary",
  size = "md",
  type,
  danger,
  ghost,
  ...props
}: ButtonProps) => {
  const isOutline = variant?.startsWith("outline-");
  const variantBase = isOutline ? variant.replace("outline-", "") : variant;

  const antdType: AntButtonProps["type"] = isOutline
    ? "default"
    : variant === "link"
      ? "link"
      : "primary";

  const isDanger = variantBase === "danger";
  const isGhost = variant === "ghost" || variantBase === "secondary";

  return (
    <AntButton
      type={type ?? antdType}
      danger={danger ?? isDanger}
      ghost={ghost ?? isGhost}
      size={sizeMap[size] ?? "middle"}
      bordered={isOutline ? true : undefined}
      {...props}
    />
  );
};

export default Button;
