import { Flex } from "antd";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <Flex vertical gap={16} className={className} style={{ width: "100%" }}>
    {children}
  </Flex>
);

export default Container;
