import React from "react";

import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  name: string | null;
  surname: string | null;
  created_at: string | null;
}

export default function ProfilePreviewText({
  name,
  surname,
  created_at,
}: Props) {
  return (
    <div className="flex-column">
      <p className="heading h6 text-neutral-900">
        {name || "User"} {surname?.[0] || ""}
      </p>
      <p className="text-body l text-neutral-600">
        Дата регистрации:{" "}
        {created_at ? StringUtils.formatDateFromApi(created_at) : "неизвестна"}
      </p>
    </div>
  );
}
