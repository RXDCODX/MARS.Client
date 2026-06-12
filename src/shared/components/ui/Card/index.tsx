import type { CardProps as AntCardProps } from "antd";
import { Card as AntCard } from "antd";

const Card = (props: AntCardProps) => <AntCard {...props} />;

export const CardBody = AntCard.Body;
export const CardHeader = AntCard;
export const CardFooter = AntCard;
export const CardTitle = AntCard;

export default Card;
