interface Props {
  ref: React.Ref<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  multiple?: boolean;
  name?: string;
  id?: string;
}

export default function FileInput({
  ref,
  onChange,
  multiple = false,
  name,
  id,
}: Props) {
  return (
    <input
      type="file"
      accept="image/*"
      hidden={true}
      multiple={multiple}
      onChange={onChange}
      ref={ref}
      name={name}
      id={id}
    />
  );
}
