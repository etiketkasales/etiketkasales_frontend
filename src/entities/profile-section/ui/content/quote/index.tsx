import QuoteRejected from "./rejected";
import QuotePending from "./pending";
import QuoteDraft from "./draft";
import { SellerStatusType } from "~/src/features/user/model";

interface Props {
  moderationStage: SellerStatusType;
  rejectReason: string | null;
}

export default function ProfileQuote({ moderationStage, rejectReason }: Props) {
  switch (moderationStage) {
    default:
      return null;
    case "failed":
      return <QuoteRejected reason={rejectReason} />;
    case "seller_pending":
      return <QuotePending />;
    case "draft":
      return <QuoteDraft />;
  }
}
