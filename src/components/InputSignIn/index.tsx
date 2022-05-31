import React, { ReactNode } from "react";

import style from "./style.module.scss";

interface IProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

export function InputSignIn({
  placeholder,
  type,
  value,
  onChange,
  children,
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
