import type { ModalProps as AntModalProps } from "antd";
import { Modal as AntModal } from "antd";

interface ModalProps extends Omit<AntModalProps, "open"> {
  show?: boolean;
  onHide?: () => void;
  size?: "sm" | "lg" | "xl";
}

const sizeMap: Record<string, AntModalProps["width"]> = {
  sm: 400,
  lg: 800,
  xl: 1000,
};

const Modal = ({
  show,
  onHide,
  size,
  width,
  onCancel,
  children,
  ...props
}: ModalProps) => (
  <AntModal
    open={show}
    onCancel={onCancel ?? onHide}
    width={width ?? sizeMap[size ?? "lg"]}
    footer={null}
    {...props}
  >
    {children}
  </AntModal>
);

export const ModalHeader = AntModal.Header;
export const ModalTitle = AntModal.Title;
export const ModalBody = AntModal.Body;
export const ModalFooter = AntModal.Footer;

export default Modal;
