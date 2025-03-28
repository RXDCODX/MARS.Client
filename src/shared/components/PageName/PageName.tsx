interface Props {
  title: string;
}

export default function PageName({ title }: Props) {
  document.title = title;

  return null;
}
