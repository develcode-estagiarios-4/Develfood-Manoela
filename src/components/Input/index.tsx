import React, { Children, ReactNode } from "react";

import style from "./style.module.scss";

interface IProps {
  placeholder: string;
  type: string;
  value: any;
  onChange: (event: any) => void;
  children: ReactNode;
}

export function Input({
  placeholder,
  type,
  value,
  onChange,
  children,
}: IProps) {
  return (
    <span className={style.spaniput}>
      <div className={style.iconeInput}>{children}</div>
      <input
        placeholder={placeholder}
        type={type}
        className={style.inputForm}
        onChange={(e) => onChange(e.target.value)}
      />
    </span>
  );
}
