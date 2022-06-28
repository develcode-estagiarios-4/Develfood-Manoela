import { StylesConfig } from "react-select";

export const styleOptions: StylesConfig = {
  clearIndicator: (styles) => {
    return {
      ...styles,
      display: "none",
      color: "white",
      border: "1px solid",
    };
  },
  option: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      fontSize: "1.2rem",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
    };
  },
  placeholder: (styles) => {
    return {
      ...styles,
      color: "#8E8E8E",
      fontSize: "1.4rem",
      textAlign: "left",
      fontFamily: "Roboto, sans-serif",
    };
  },

  multiValue: (styles) => {
    return {
      ...styles,
      border: "0.5px solid",
      borderRadius: "5px",
      height: "2rem",
      width: "10.8rem",
      backgroundColor: "#C4C4C4",
    };
  },

  dropdownIndicator: (styles) => {
    return {
      ...styles,
      opacity: 0,
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      width: "7.8rem",
      textAlign: "left",
      height: "2rem",
      paddingTop: "1px",
      fontSize: "1.4rem",
      outline: "0",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "400",
      marginLeft: "0.5rem",
    };
  },
  control: (styles) => {
    return {
      ...styles,
      border: "0000.1px solid #8E8E8E",
      outline: "0",
    };
  },
};
