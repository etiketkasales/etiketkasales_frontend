import {
  IParsedFilter,
  IFiltersItemDefault,
} from "~/src/features/filters/model";
import { INewProductInput } from "~/src/entities/profile-section/model";
import { ISellerProductBase } from "~/src/entities/profile-section/model";

export function convertParsedFiltersToInputs(
  parsedFilters: IParsedFilter[],
): INewProductInput[] {
  return parsedFilters
    .filter((f) => f.type !== "delivery")
    .map((filter): INewProductInput | null => {
      let type: INewProductInput["type"] = "text";
      let selectOptions: string[] = [];

      switch (filter.type) {
        case "default":
          type = "select";
          selectOptions = (filter.data as IFiltersItemDefault).filters;
          break;

        case "range":
          if (filter.name.includes("price")) {
            return null;
          }
          type = "number";
          break;

        default:
          return null;
      }

      return {
        placeholder: filter.data.title,
        field: filter.name as keyof ISellerProductBase,
        type,
        selectOptions,
      };
    })
    .filter((i) => i !== null);
}
