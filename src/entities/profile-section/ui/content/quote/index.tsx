"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import QuoteRejected from "./rejected";
import QuotePending from "./pending";
import QuoteDraft from "./draft";
import {
  CompanyVerificationStatusType,
  SellerStatusType,
} from "~/src/features/user/model";

interface Props {
  moderationStage: SellerStatusType | CompanyVerificationStatusType;
  rejectReason: string | null;
  profileReady: boolean;
}

export default function ProfileQuote({
  moderationStage,
  rejectReason,
  profileReady,
}: Props) {
  const { push } = useRouter();

  useEffect(() => {
    if (!profileReady) return;

    if (moderationStage === "approved" || moderationStage === "verified") {
      push("/profile/seller?active_section=profile");
    }
  }, [moderationStage, profileReady, push]);

  switch (moderationStage) {
    default:
      return null;
    case "failed":
      return <QuoteRejected reason={rejectReason} />;
    case "seller_pending":
    case "pending":
      return <QuotePending />;
    case "approved":
    case "verified":
      return null;
    case "draft":
      return <QuoteDraft />;
  }
}
