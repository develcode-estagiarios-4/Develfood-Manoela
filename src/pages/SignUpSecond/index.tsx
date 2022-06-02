import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperII.png";
import { ButtonSignUp, InputSignUp, Logomark } from "../../components";
import { SelectSignUp } from "../../components/SelectInput";
import { useAuth } from "../../context";
import style from "./style.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  phone: yup.string().required("O campo telefone é obrigatório"),
  foodTypes: yup.string(),
});
export function SignUpSecond() {
  const navigate = useNavigate();
  const { body } = useAuth();
  const [selectedOption, setSelectedOption] = useState([]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (e: any) => {
    setSelectedOption(e);
    console.log(e);
  };

  function formatSelectedOptions() {
    const optionsList = selectedOption.map((option: any) => {
      const hasValue = !!option.value;
      if (hasValue) {
        const optionObject = { id: option.value };
        return optionObject;
      }
      return "";
    });
    return optionsList;
  }

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    body.restaurant.name = values.name;
    body.restaurant.phone = values.phone;
    body.restaurant.foodTypes = formatSelectedOptions();
    navigate("/signupthird");
    console.log(body);
  };

  return (
    <div className={style.spanSignUp}>
      <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.spanLogomark}>
          <Logomark />
        </div>
        <img src={stepper} alt="Second stepper" className={style.stepper} />
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputSignUp
              placeholder="Nome"
              type="input"
              value={value}
              control={control}
              onChange={onChange}
            >
              <MdIcons.MdAccessibility />
            </InputSignUp>
          )}
        />
        <div className={style.formValidation}>{errors.name?.message}</div>
        <Controller
          control={control}
          rules={{ required: true }}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputSignUp
              placeholder="Telefone"
              type="tel"
              control={control}
              value={value}
              onChange={onChange}
            >
              <MdIcons.MdPhone />
            </InputSignUp>
          )}
        />
        <div className={style.formValidation}>{errors.phone?.message}</div>
        <SelectSignUp
          placeholder="Tipos de comida"
          type="select"
          onChange={handleChange}
        />
        <div className={style.formValidation}>{errors.foodTypes?.message}</div>
        <ButtonSignUp type="submit"> Continuar</ButtonSignUp>{" "}
      </form>
    </div>
  );
}
