"use client";

import { useLogout } from "~/src/features/login/lib/hooks";

import ProfileConfirmModal from "~/src/pages-components/profile/ui/role/modal/confirm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: Props) {
  const { loading, handleLogout } = useLogout();

  return (
    <ProfileConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Вы точно хотите выйти?"
      loading={loading}
      buttons={[
        {
          title: "Отмена",
          onClick: () => onClose(),
          type: "yellow",
        },
        {
          title: "Да, выйти",
          onClick: async () => {
            await handleLogout().then(() => onClose());
          },
          type: "gray-border",
        },
      ]}
    />
  );
}
