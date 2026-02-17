import classes from "./select-location.module.scss";
import Geo from "~/public/header/geo.svg";
import Select from "~/src/shared/ui/select/ui";

export default function HeaderSelectLocation() {
  return (
    <Select
      options={["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург"]}
      activeOption="Москва"
      renderItem={(item, index) => (
        <div key={index} className={classes.item}>
          {item}
        </div>
      )}
      optionsPosTop={12}
      optionsFromBottom={false}
      optionsPosLeft={0}
      optionsPosRight={0}
      HeadingIconLeft={<Geo />}
      selectButtonClassName={`grid-column gap-1`}
      selectedOptionClassName="text-body m text-neutral-1000"
      optionsClassName={`${classes.options} flex-column`}
    />
  );
}
