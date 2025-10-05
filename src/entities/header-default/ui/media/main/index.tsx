import React from "react";

import HeaderLogo from "~/src/entities/header-default/ui/logo";
import HeaderForBussiness from "~/src/entities/header-default/ui/for-bussiness";

export default function HeaderMediaMain() {
  return (
    <div className="flex-row space-between gap-10px align-center">
      <HeaderLogo imageSrc="/header/logo-media.svg" width={125} height={40} />
      <HeaderForBussiness />
    </div>
  );
}
