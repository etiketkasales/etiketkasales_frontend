interface Props {
  children: React.ReactNode;
}

export default function HeaderLinksSect({ children }: Props) {
  return <div className="flex-row align-center gap-8">{children}</div>;
}
