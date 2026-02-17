"use client";

import ProfileAvatar from "./avatar";
import ProfilePreviewText from "./text";
import useChangeAvatar from "~/src/entities/profile-section/lib/hooks/profile/useChangeAvatar.hook";
import FileInput from "~/src/shared/ui/inputs/file";

interface Props {
  avatar: string | null;
  name: string | null;
  surname: string | null;
  created_at: string | null;
}

export default function ProfileUserPreview({
  avatar,
  name,
  surname,
  created_at,
}: Props) {
  const { onFileLoad, fileLoading, inputRef } = useChangeAvatar();

  return (
    <div className={`flex-row align-center gap-4`}>
      <ProfileAvatar
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
        avatar={avatar}
        loading={fileLoading}
      />
      <ProfilePreviewText
        name={name}
        surname={surname}
        created_at={created_at}
      />
      <FileInput
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onFileLoad(file);
        }}
      />
    </div>
  );
}
