import React from "react";

export const removeLetters = (value: string) => {
  return value.replace(/\D/g, "");
};

export const normalizePhone = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d)/, "$1");
};

export const cnpj = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(.\d{3})(\d)/, "$1.$2")
    .replace(/(.\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})(\d)/, "$1");
};

export const cep = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})(\d)/, "$2");
};

export const currency = (e: React.ChangeEvent<HTMLInputElement> | any) => {
  // eslint-disable-next-line prefer-destructuring
  let value = e.target.value;
  value = value
    .replace(/[\D]/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".")
    .replace(/(\d)/, "R$ $1");
  e.target.value = value;
  return e;
};

export const percent = (value: string | undefined) => {
  if (!value) return "";

  if (value.length > 0) {
    return `${value}%`;
  }
  return `${value}%`;
};

export const formatCurrency = (value: number) => {
  const valor = value.toString();
  return valor
    .replace(/[\D]/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".")
    .replace(/(\d)/, "R$ $1");
};

export const formatPrice = (value: string) => {
  return value
    .replace(/[\D]/g, "")
    .replace(/(\d)(\d{2})$/, "$1.$2")
    .replace(/(?=(\d{3})+(\D))\B/g, "");
};
