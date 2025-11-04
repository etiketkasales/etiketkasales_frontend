import React from "react";

import classes from "./user-preview.module.scss";
import ProfileAvatar from "./avatar";
import ProfilePreviewText from "./text";

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
  return (
    <div className={`flex-row align-center gap-4`}>
      <ProfileAvatar avatar={avatar} />
      <ProfilePreviewText
        name={name}
        surname={surname}
        created_at={created_at}
      />
    </div>
  );
}
