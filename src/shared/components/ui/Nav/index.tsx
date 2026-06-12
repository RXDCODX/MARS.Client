import type { MenuProps } from "antd";
import { Menu } from "antd";

interface NavbarProps {
  bg?: string;
  variant?: string;
  expand?: string;
  className?: string;
  children?: React.ReactNode;
}

const Navbar = ({ className, children }: NavbarProps) => (
  <nav className={className}>{children}</nav>
);

interface NavProps {
  className?: string;
  activeKey?: string;
  onSelect?: (key: string | null) => void;
  children?: React.ReactNode;
}

const NavLinks = ({ className, activeKey, onSelect, children }: NavProps) => {
  const items: MenuProps["items"] = [];

  const processChildren = (child: React.ReactNode) => {
    if (!child) return;
    React.Children.forEach(child, c => {
      if (React.isValidElement(c) && c.type === NavItem) {
        const { eventKey, children: label } = c.props as NavItemProps;
        items?.push({ key: eventKey, label });
      }
    });
  };

  processChildren(children);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={activeKey ? [activeKey] : []}
      onClick={({ key }) => onSelect?.(key)}
      items={items}
      className={className}
    />
  );
};

interface NavItemProps {
  eventKey?: string;
  children?: React.ReactNode;
}

const NavItem = (_props: NavItemProps): null => null;

interface NavTabsProps {
  activeKey?: string;
  onSelect?: (key: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const NavTabs = ({
  activeKey,
  onSelect,
  className,
  children,
}: NavTabsProps) => {
  const items: MenuProps["items"] = [];

  const processChildren = (child: React.ReactNode) => {
    if (!child) return;
    React.Children.forEach(child, c => {
      if (React.isValidElement(c) && c.type === NavItem) {
        const { eventKey, children: label } = c.props as NavItemProps;
        items?.push({ key: eventKey, label });
      }
    });
  };

  processChildren(children);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={activeKey ? [activeKey] : []}
      onClick={({ key }) => onSelect?.(key)}
      items={items}
      className={className}
    />
  );
};

export { Navbar, NavLinks, NavTabs, NavItem };
