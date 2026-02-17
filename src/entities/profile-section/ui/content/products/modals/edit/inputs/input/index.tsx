import TextInput from "~/src/shared/ui/inputs/text-input";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import {
  IEditSellerProduct,
  IEditSellerProductInput,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props extends IEditSellerProductInput {
  onInputChange: (field: keyof IEditSellerProduct, v: string) => void;
  editData: IEditSellerProduct;
  loading: boolean;
  error: MessageI | null;
}

export default function EditProductInput({
  onInputChange,
  editData,
  placeholder,
  field,
  type,
  loading,
  error,
}: Props) {
  const value = Array.isArray(editData[field]) ? "" : editData[field];

  switch (type) {
    default:
      return null;
    case "text":
    case "numeric":
      return (
        <TextInput
          value={value}
          placeholder={placeholder}
          separatedPlaceholder
          onChange={(e) => {
            if (type === "numeric") {
              const numValue = Number(e.target.value);
              if (isNaN(numValue)) return;
            }
            onInputChange(field, e.target.value);
          }}
          disabled={loading}
          name={`etiketka-${field}`}
          errorText={error && error.field === field ? error.message : ""}
        />
      );
    case "textarea":
      return (
        <TextAreaInput
          value={value}
          placeholder={placeholder}
          separatedPlaceholder
          onChange={(e) => onInputChange(field, e.target.value)}
          name={`etiketka-${field}`}
          errorText={error && error.field === field ? error.message : ""}
        />
      );
  }
}
