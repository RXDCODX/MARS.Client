import { Flex } from "antd";

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroup = ({ children, className }: ButtonGroupProps) => (
  <Flex gap={8} className={className}>
    {children}
  </Flex>
);

export default ButtonGroup;
