import FormUtils from "~/src/shared/lib/utils/form.util";
import { MessageI } from "~/src/shared/model";
import { IChangeableProfile } from "~/src/features/user/model";

export function getSpecificQuoteError(
  data: IChangeableProfile,
): MessageI | null {
  if (data.inn) {
    const err = FormUtils.getINNError(data.inn);
    if (err) return err;
  }
  if (data.kpp) {
    const err = FormUtils.getKPPError(data.kpp);
    if (err) return err;
  }
  if (data.ogrn) {
    const err = FormUtils.getOGRNError(data.ogrn);
    if (err) return err;
  }
  if (data.bank_bik) {
    const err = FormUtils.getBankBicError(data.bank_bik);
    if (err) return err;
  }
  if (data.bank_account) {
    const err = FormUtils.getBankAccountError(data.bank_account);
    if (err) return err;
  }
  if (data.correspondent_account) {
    const err = FormUtils.getBankAccountError(
      data.correspondent_account,
      "correspondent_account",
    );
    if (err) return err;
  }

  return null;
}
