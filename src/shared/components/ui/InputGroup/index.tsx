import { Input } from "antd";

interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

const InputGroup = ({ children, className }: InputGroupProps) => (
  <Input.Group compact className={className}>
    {children}
  </Input.Group>
);

export default InputGroup;
