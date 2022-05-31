import React, { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps {
  placeholder: string;
  type: string;
  value: string;
  children: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  control: object;
}

export function InputSignUp({
  placeholder,
  type,
  value,
  children,
  onChange,
  control,
}: IProps) {
  return (
    <span className={style.spanInput}>
      <div className={style.iconInput}>{children}</div>
      <input
        placeholder={placeholder}
        type={type}
        className={style.inputForm}
        onChange={(e) => onChange(e)}
      />
    </span>
  );
}
