import { Flex } from "antd";

interface StackProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  gap?: number;
  className?: string;
}

const Stack = ({
  children,
  direction = "horizontal",
  gap = 8,
  className,
}: StackProps) => (
  <Flex
    vertical={direction === "vertical"}
    gap={gap}
    className={className}
    align="center"
  >
    {children}
  </Flex>
);

export default Stack;
