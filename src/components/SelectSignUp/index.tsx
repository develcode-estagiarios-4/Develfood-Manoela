import * as MdIcons from "react-icons/md";
import Select, {
  ActionMeta,
  MultiValue,
  OnChangeValue,
  OptionProps,
  Options,
  StylesConfig,
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
  { value: 1, label: "Fastfood", className: `${style.oi}` },
  { value: 2, label: "Pizza" },
  { value: 3, label: "Italiana" },
  { value: 4, label: "Doce" },
];

const styleOptions: StylesConfig = {
  input: (styles) => {
    return {
      ...styles,
      fontSize: "2rem",
      outline: "0",
    };
  },
  placeholder: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      fontSize: "1.4rem",
      fontFamily: "Roboto, sans-serif",
    };
  },
  option: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      fontSize: "1.4rem",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      fontSize: "1.4rem",
      color: "#8E8E8E",
      fontFamily: "Arial",
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      fontSize: "2.4rem",
      outline: "0",
      fontFamily: "Roboto, sans-serif",
    };
  },
  control: (styles) => {
    return {
      ...styles,
      outline: "0",
      ":hover": { borderColor: "white" },
    };
  },
};

export function SelectSignUp({ placeholder, type, onChange }: IProps) {
  return (
    <span className={style.spanSelect}>
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
        styles={styleOptions}
        options={options}
        defaultValue={undefined}
        className={style.select}
      />
    </span>
  );
}
