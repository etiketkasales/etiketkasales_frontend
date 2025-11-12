import React from "react";

import QuoteRejected from "./rejected";
import QuotePending from "./pending";
import { SellerStatusType } from "~/src/features/user/model";

interface Props {
  moderationStage: SellerStatusType;
  rejectReason: string | null;
}

export default function ProfileQuote({ moderationStage, rejectReason }: Props) {
  switch (moderationStage) {
    default:
      return null;
    case "rejected":
      return <QuoteRejected reason={rejectReason} />;
    case "pending":
      return <QuotePending />;
    case "draft":
      return null;
  }
}
