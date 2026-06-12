import type { BadgeProps as AntBadgeProps } from "antd";
import { Badge as AntBadge } from "antd";

interface BadgeProps extends AntBadgeProps {
  bg?: string;
}

const Badge = ({ bg, color, ...props }: BadgeProps) => (
  <AntBadge color={color ?? bg} {...props} />
);

export default Badge;
