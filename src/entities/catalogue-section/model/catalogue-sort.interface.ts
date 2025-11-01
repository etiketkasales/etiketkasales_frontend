interface ISortBase {
  key: string;
}

export interface IOptionOrder extends ISortBase {
  name: string;
}

export interface ISortOption extends ISortBase {
  orders: IOptionOrder[];
}
