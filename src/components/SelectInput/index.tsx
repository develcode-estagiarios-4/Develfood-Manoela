import * as MdIcons from "react-icons/md";
import Select, {
  ActionMeta,
  MultiValue,
  OnChangeValue,
  OptionProps,
  Options,
} from "react-select";
import "../../styles/common/typography.scss";

import style from "./style.module.scss";

export interface ISelectItem {
  value: string;
  label: string;
}

interface IProps {
  placeholder: string;
  type: string;
  onChange: (e: any) => void;
}

const options = [
  { value: 1, label: "Fastfood" },
  { value: 2, label: "Pizza" },
  { value: 3, label: "Italiana" },
  { value: 4, label: "Doce" },
];

export function SelectSignUp({ placeholder, type, onChange }: IProps) {
  return (
    <span className={style.spanInput}>
      <div className={style.iconInput}>
        {" "}
        <MdIcons.MdFastfood />
      </div>
      <Select
        placeholder="Tipos de comida"
        closeMenuOnSelect={false}
        onChange={onChange}
        isMulti
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "white",
            neutral20: "white",
          },
        })}
        options={options}
        defaultValue={undefined}
        className={style.selectFoodtype}
      />
    </span>
  );
}
