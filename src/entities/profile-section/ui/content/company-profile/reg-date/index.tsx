import React from "react";

import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  created_at: string;
}

export default function CompanyRegDate({ created_at }: Props) {
  return (
    <p className="text-body xl text-neutral-600">
      Дата регистрации: {StringUtils.formatDateFromApi(created_at)}
    </p>
  );
}
