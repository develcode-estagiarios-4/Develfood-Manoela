import * as MdIcons from "react-icons/md";
import Select, { StylesConfig } from "react-select";

import "../../styles/common/typography.scss";
import style from "./style.module.scss";

export interface ISelectItem {
  value: string;
  label: string;
}

const defaultProps = {
  cNameInput: "",
  cNameIcon: "",
  cNameSpan: "",
  value: "",
};

interface IProps {
  placeholder: string;
  type: string;
  cNameSpan?: any;
  onChange: (e: any) => void;
  cNameIcon?: any;
  value?: any;
  cNameInput?: any;
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
      paddingLeft: "1rem",
      ":hover": { borderColor: "white" },
    };
  },
};

export function SelectSignUp({
  placeholder,
  type,
  onChange,
  value,
  cNameInput,
  cNameSpan,
  cNameIcon,
}: IProps & typeof defaultProps) {
  return (
    <span className={`${style.spanSelect} ${cNameSpan}`}>
      <div className={`${style.iconInput} ${cNameIcon}`}>
        {" "}
        <MdIcons.MdFastfood />
      </div>
      <Select
        value={value}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "Sem opções" : "No results found"
        }
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
        className={`${style.select} ${cNameInput}`}
      />
    </span>
  );
}

SelectSignUp.defaultProps = defaultProps;
