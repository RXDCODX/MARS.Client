import { Flex } from "antd";

interface RowProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}

const Row = ({ children, className, gap = 16 }: RowProps) => (
  <Flex gap={gap} wrap="wrap" className={className}>
    {children}
  </Flex>
);

export default Row;
