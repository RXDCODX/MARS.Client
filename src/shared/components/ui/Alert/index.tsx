import type { AlertProps as AntAlertProps } from "antd";
import { Alert as AntAlert } from "antd";

interface AlertProps extends Omit<AntAlertProps, "closable"> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  dismissible?: boolean;
  onClose?: () => void;
}

const typeMap: Record<string, AntAlertProps["type"]> = {
  primary: "info",
  secondary: "info",
  success: "success",
  danger: "error",
  warning: "warning",
  info: "info",
};

const Alert = ({
  variant = "info",
  dismissible,
  onClose,
  ...props
}: AlertProps) => (
  <AntAlert
    type={typeMap[variant] ?? "info"}
    closable={dismissible}
    onClose={onClose}
    {...props}
  />
);

export default Alert;
