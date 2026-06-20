import { companyRegFieldsRequired } from "~/src/entities/company-registration/model";
import FormUtils from "~/src/shared/lib/utils/form.util";
import { IProfile } from "~/src/features/user/model";

/**
 * Куда вести пользователя по «Для бизнеса» / «Стать продавцом».
 */
export function resolveBusinessEntryHref(
  user: IProfile | null | undefined,
  isLoggedIn: boolean,
): string {
  if (!isLoggedIn || !user) {
    return "/for-bussiness";
  }

  if (user.role === "seller" && user.seller_status === "approved") {
    return "/profile/seller";
  }

  if (
    user.seller_status === "seller_pending" ||
    user.company_verification_status === "pending"
  ) {
    return "/profile/seller-pending?active_section=quote";
  }

  const regIncomplete = FormUtils.getFormError({
    requiredFields: companyRegFieldsRequired,
    checkData: user,
  });

  if (regIncomplete === null) {
    return "/profile/seller-pending?active_section=quote";
  }

  return "/company/registrate/personal";
}

export function shouldSkipForBusinessLanding(
  user: IProfile | null | undefined,
  isLoggedIn: boolean,
): boolean {
  const target = resolveBusinessEntryHref(user, isLoggedIn);
  return (
    target !== "/for-bussiness" && target !== "/company/registrate/personal"
  );
}
