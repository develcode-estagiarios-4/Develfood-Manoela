import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as MdIcons from "react-icons/md";
import * as yup from "yup";

import stepper from "../../assets/img/signUpStepperIII.png";
import {
  ButtonSignUp,
  InputSignUp,
  Logomark,
  InputSignUpDouble,
  Loader,
} from "../../components";
import { useAuth } from "../../context";
import { signUp } from "../../hooks/useSignUp";
import style from "./style.module.scss";

const schema = yup.object().shape({
  nickname: yup.string().required("O campo Apelido é obrigatório"),
  zipCode: yup.string().required("O campo CEP é obrigatório"),
  street: yup.string().required("O campo CNPJ é obrigatório"),
  city: yup.string().required("O campo Cidade é obrigatório"),
  neighborhood: yup.string().required("O campo Bairro é obrigatório"),
  state: yup.string().required("O campo Estado é obrigatório"),
  number: yup.string().required("O campo número é obrigatório"),
});
export function SignUpThird() {
  const { body } = useAuth();
  const { signUpPost, signUpSucceeded } = signUp();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function newDate() {
    const date = new Date();
    const dia = String(date.getDate());
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = String(date.getFullYear());
    const currentlyData = `${ano}-${mes}-${dia}`;
    return currentlyData;
  }
  const onSubmit = () => {
    const createdData = newDate();
    const values = getValues();
    body.restaurant.address.nickname = values.nickname;
    body.restaurant.address.zipCode = values.zipCode;
    body.restaurant.address.street = values.street;
    body.restaurant.address.city = values.city;
    body.restaurant.address.neighborhood = values.neighborhood;
    body.restaurant.address.number = values.number;
    body.restaurant.address.state = values.state;
    body.creationDate = createdData;
    signUpPost(body);
    console.log(values);
    console.log(body);
    console.log(signUpSucceeded);
  };
  return (
    <>
      <div className={style.spanSignUp}>
        <form className={style.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.spanLogomark}>
            <Logomark />
          </div>
          <img src={stepper} alt="Third stepper" className={style.stepper} />
          <div className={style.doubleInput}>
            <div className={style.doubleUpLeft}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="nickname"
                render={({ field: { onChange, value } }) => (
                  <InputSignUpDouble
                    placeholder="Apelido do endereço"
                    type="input"
                    value={value}
                    control={control}
                    onChange={onChange}
                  >
                    <MdIcons.MdHome />
                  </InputSignUpDouble>
                )}
              />
            </div>
            <div className={style.doubleUpRight}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="zipCode"
                render={({ field: { onChange, value } }) => (
                  <InputSignUpDouble
                    placeholder="CEP"
                    type="input"
                    value={value}
                    control={control}
                    onChange={onChange}
                  >
                    <MdIcons.MdHome />
                  </InputSignUpDouble>
                )}
              />
            </div>
          </div>
          <div className={style.spanErrorformUp}>
            <div className={style.formValidationDoubleNick}>
              {errors.nickname?.message}
            </div>
            <div className={style.formValidationDoubleZip}>
              {errors.zipCode?.message}
            </div>
          </div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="street"
            render={({ field: { onChange, value } }) => (
              <InputSignUp
                placeholder="Rua"
                type="input"
                control={control}
                value={value}
                onChange={onChange}
              >
                <MdIcons.MdHome />
              </InputSignUp>
            )}
          />
          <div className={style.formValidation}>{errors.street?.message}</div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="city"
            render={({ field: { onChange, value } }) => (
              <InputSignUp
                placeholder="Cidade"
                type="input"
                control={control}
                value={value}
                onChange={onChange}
              >
                <MdIcons.MdHome />
              </InputSignUp>
            )}
          />
          <div className={style.formValidation}>{errors.city?.message}</div>
          <Controller
            control={control}
            rules={{ required: true }}
            name="neighborhood"
            render={({ field: { onChange, value } }) => (
              <InputSignUp
                placeholder="Bairro"
                type="input"
                value={value}
                control={control}
                onChange={onChange}
              >
                <MdIcons.MdHome />
              </InputSignUp>
            )}
          />
          <div className={style.formValidation}>
            {errors.neighborhood?.message}
          </div>
          <div className={style.doubleInput}>
            <div className={style.doubleDownLeft}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <InputSignUpDouble
                    placeholder="Estado"
                    type="input"
                    value={value}
                    control={control}
                    onChange={onChange}
                  >
                    <MdIcons.MdHome />
                  </InputSignUpDouble>
                )}
              />
            </div>
            <div className={style.doubleDownRight}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="number"
                render={({ field: { onChange, value } }) => (
                  <InputSignUpDouble
                    placeholder="Número"
                    type="input"
                    control={control}
                    value={value}
                    onChange={onChange}
                  >
                    <MdIcons.MdHome />
                  </InputSignUpDouble>
                )}
              />
            </div>
          </div>
          <div className={style.spanErrorformUp}>
            <div className={style.formValidationDoubleState}>
              {errors.state?.message}
            </div>
            <div className={style.formValidationDoubleNumber}>
              {errors.number?.message}
            </div>
          </div>
          <ButtonSignUp type="submit"> Continuar</ButtonSignUp>
        </form>
      </div>
      {signUpSucceeded ? <Loader /> : " "}
    </>
  );
}
