import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react";

import { Control, FieldValues } from "react-hook-form";


import style from "./style.module.scss";

const defaultProps = {
  children: "",
};

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode | any;
   control: FieldValues | any;
}

export function Input({
  placeholder,
  value,
  type,
  onChange,
  className,
  children,
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
        className={style.input}
      />
    </span>
  );
}

Input.defaultProps = defaultProps;
