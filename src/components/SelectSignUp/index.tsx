import * as MdIcons from "react-icons/md";
import Select, { ActionMeta, StylesConfig } from "react-select";

import { IFoodType } from "../../interface/IFoodType";

import "../../styles/common/typography.scss";
import style from "./style.module.scss";

export interface ISelectItem {
  value: string;
  label: string;
}

const defaultProps = {
  classNameSpan: "",
  classNameIcon: "",
  classNameInput: "",
  placeholder: "",
};

interface IProps {
  placeholder?: string;
  onChange: (e: any) => void;
  value: IFoodType[];
  classNameInput?: string;
  classNameSpan?: string;
  classNameIcon?: string;
}

const options = [
  { value: 1, label: "Fastfood" },
  { value: 2, label: "Pizza" },
  { value: 3, label: "Italiana" },
  { value: 4, label: "Doce" },
];

const styleOptions: StylesConfig = {
  clearIndicator: (styles) => {
    return {
      ...styles,
      padding: "0",
      display: "none",
    };
  },
  multiValueRemove: (styles) => {
    return {
      ...styles,
      padding: 0,
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
  dropdownIndicator: (styles) => {
    return {
      ...styles,
      display: "none",
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      fontSize: "1.4rem",
      display: "block",
      color: "black",
      paddingLeft: "1px",
      borderRadius: "0.4rem",
    };
  },
  noOptionsMessage: (styles) => {
    return {
      ...styles,
      fontSize: "1rem",
      fontFamily: "Roboto, sans-serif",
      color: "#8E8E8E",
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      display: "contents",
      fontSize: "2rem",
      outline: "0",
      fontFamily: "Roboto, sans-serif",
    };
  },
  multiValue: (styles) => {
    return {
      color: "black",
      display: "flex",
      borderRadius: "0.5rem",
      border: "1px black solid",
      backgroundColor: "#bfbaba",
      padding: "0 0 0 0.5rem",
      marginRight: "5px",
    };
  },
  control: (styles) => {
    return {
      ...styles,
      outline: "0",
      justifyContent: "flex-start",
      paddingLeft: "1rem",
      ":hover": { borderColor: "white" },
    };
  },
};

export function SelectSignUp({
  placeholder,
  onChange,
  value,
  classNameInput,
  classNameSpan,
  classNameIcon,
}: IProps & typeof defaultProps) {
  return (
    <span className={`${style.spanSelect} ${classNameSpan}`}>
      <div className={`${style.iconInput} ${classNameIcon}`}>
        {" "}
        <MdIcons.MdFastfood />
      </div>
      <Select
        value={value}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "Sem opções" : "No results found"
        }
        closeMenuOnSelect={false}
        onChange={onChange}
        placeholder={placeholder}
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
        isSearchable={false}
        options={options}
        className={`${style.select} ${classNameInput}`}
      />
    </span>
  );
}

SelectSignUp.defaultProps = defaultProps;
