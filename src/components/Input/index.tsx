import React, { InputHTMLAttributes, ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import style from "./style.module.scss";

const defaultProps = {
  children: "",
  classNameSpan: "",
  classNameIcon: "",
  classNameInput: "",
};

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode | any;
  control: FieldValues;
  classNameIcon?: string;
  classNameSpan?: string;
  classNameInput?: string;
}

export function Input({
  placeholder,
  value,
  type,
  onChange,
  classNameInput,
  children,
  classNameIcon,
  classNameSpan,
  control,
}: IProps & typeof defaultProps) {
  return (
    <span className={`${style.spanInput} ${classNameSpan}`}>
      <div className={`${style.iconInput} ${classNameIcon}`}>{children}</div>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => onChange(e)}
        className={`${style.input} ${classNameInput}`}
      />
    </span>
  );
}

Input.defaultProps = defaultProps;
