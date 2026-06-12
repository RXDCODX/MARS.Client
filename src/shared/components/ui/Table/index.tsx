import type { TableProps as AntTableProps } from "antd";
import { Table as AntTable } from "antd";

interface TableProps<T> extends AntTableProps<T> {
  bordered?: boolean;
}

const Table = <T extends object>({
  bordered,
  className,
  ...props
}: TableProps<T>) => (
  <AntTable
    bordered={bordered}
    className={className}
    pagination={false}
    {...props}
  />
);

export default Table;
