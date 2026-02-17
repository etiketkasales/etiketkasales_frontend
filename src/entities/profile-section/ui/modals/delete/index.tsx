import { useDeleteShop } from "~/src/entities/profile-section/lib/hooks";

import ProfileConfirmModal from "~/src/pages-components/profile/ui/role/modal/confirm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteCompanyModal({ isOpen, onClose }: Props) {
  const { loading, deleteShop } = useDeleteShop();

  return (
    <ProfileConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Вы действительно хотите удалить свой магазин?"
      loading={loading}
      buttons={[
        {
          title: "Отмена",
          onClick: () => onClose(),
          type: "yellow",
        },
        {
          title: "Удалить",
          onClick: async () => {
            await deleteShop(onClose);
          },
          type: "gray-border",
        },
      ]}
    />
  );
}
