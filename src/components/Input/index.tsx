import React, { InputHTMLAttributes, ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import style from "./style.module.scss";

const defaultProps = {
  children: "",
  classInput: "",
};

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode | any;
  control: FieldValues;
  classInput?: string;
}

export function Input({
  placeholder,
  value,
  type,
  onChange,
  className,
  children,
  classInput,
  control,
}: IProps & typeof defaultProps) {
  return (
    <span className={`${style.spanInput} ${className}`}>
      <div className={style.iconInput}>{children}</div>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(e) => onChange(e)}
        className={`${style.input} ${classInput}`}
      />
    </span>
  );
}

Input.defaultProps = defaultProps;
