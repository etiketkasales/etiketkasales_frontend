import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./default.module.scss";
import Icon from "~/public/order/geo-alt-fill.svg";
import { IUserAddress } from "~/src/features/user/model";

interface Props extends IUserAddress {}

export default function OrderDefaultAddress(address: Props) {
  return (
    <div className={`flex-row gap-1 align-center ${classes.container}`}>
      <Icon />
      <span className="heading h7 text-blue-500 nowrap-text">
        {StringUtils.formatAddress(address)}
      </span>
    </div>
  );
}
