import type { FormProps as AntFormProps } from "antd";
import { Form as AntForm, Input, Select, Switch } from "antd";
import type { ReactNode } from "react";

type FormProps = AntFormProps;

const Form = (props: FormProps) => <AntForm {...props} />;

interface FormItemProps {
  label?: string;
  children: ReactNode;
  name?: string;
  rules?: Array<Record<string, unknown>>;
  className?: string;
  required?: boolean;
}

const FormItem = ({
  label,
  children,
  name,
  rules,
  className,
  required,
  ...props
}: FormItemProps) => (
  <AntForm.Item
    label={label}
    name={name}
    rules={rules}
    className={className}
    required={required}
    {...props}
  >
    {children as React.ReactElement}
  </AntForm.Item>
);

interface FormInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  as?: string;
  rows?: number;
}

const FormInput = ({ as, rows, ...props }: FormInputProps) => {
  if (as === "textarea") {
    return <Input.TextArea rows={rows} {...props} />;
  }
  return <Input {...props} />;
};

interface FormSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FormSelect = ({
  children,
  options,
  value,
  onChange,
  ...props
}: FormSelectProps) => (
  <Select value={value} onChange={onChange} options={options} {...props}>
    {children}
  </Select>
);

const FormTextArea = (props: React.ComponentProps<typeof Input.TextArea>) => (
  <Input.TextArea {...props} />
);

interface FormSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const FormSwitch = ({ checked, onChange, disabled }: FormSwitchProps) => (
  <Switch checked={checked} onChange={onChange} disabled={disabled} />
);

export { FormItem, FormInput, FormSelect, FormTextArea, FormSwitch };

export default Form;
