import React from "react";

import style from "./style.module.scss";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Props {
  placeholder: string;
  type: string;
  value: any;
  onChange: (newValue: string) => void;
}

// eslint-disable-next-line react/function-component-definition, react/prop-types
export const Input: React.FC<Props> = ({
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={style.inputForm}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
