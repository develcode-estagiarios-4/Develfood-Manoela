import { yupResolver } from "@hookform/resolvers/yup";
import { PropsWithChildren, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import * as yup from "yup";

import img from "../../assets/img/previewPromotion.png";
import {
  AlertMessage,
  Button,
  ErrorMessage,
  Input,
  SelectSignUp,
} from "../../components";
import { Container } from "../../components/Container";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IFoodType } from "../../interface/IFoodType";
import { IFoodTypeBackend } from "../../interface/IFoodTypeBackend";
import { IRestaurantUpdate } from "../../interface/IRestaurantEdit";
import {
  capitalizeFirstLetter,
  cnpj,
  normalizePhone,
  zipCode,
} from "../../utils/textUtils";
import style from "./style.module.scss";

const schema = yup.object().shape({
  email: yup.string().required("O campo Email é obrigatório"),
  cnpj: yup.string().required("O campo CNPJ é obrigatório"),
  name: yup.string().required("O campo Nome é obrigatório"),
  phone: yup.string().required("O campo Telefone é obrigatório"),
  street: yup.string().required("O campo Rua é obrigatório"),
  number: yup.string().required("O campo Número é obrigatório"),
  neighborhood: yup.string().required("O campo Bairro é obrigatório"),
  city: yup.string().required("O campo Cidade é obrigatório"),
  zipCode: yup.string().required("O campo CEP é obrigatório"),
  state: yup.string().required("O campo Estado é obrigatório"),
  nickname: yup.string().required("O campo Apelido é obrigatório"),
});

function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
        marginBottom: "1.57rem",
        width: "35rem",
        height: "5rem",
        justifyContent: "space-between",
        marginLeft: "3.5rem",
        columnGap: "6rem",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

export function Perfil() {
  const [imageBanner, setImageBanner] = useState(img);
  const [selectFoodType, setSelectFoodType] = useState<IFoodType[]>([]);
  const [foodType, setFoodType] = useState<IFoodTypeBackend[]>([]);
  const {
    restaurant,
    getPhoto,
    photoRestaurant,
    getRestaurant,
    restaurantAuth,
    editRestaurant,
    putRestaurantSucceeded,
    putRestaurantError,
  } = useRestaurant();
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    restaurantAuth();
    // getPhoto();
    getRestaurant();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const foodTypeOptions: any = [];

  useEffect(() => {
    if (foodType) {
      foodType.forEach((item: IFoodTypeBackend) => {
        const lwrLabel = capitalizeFirstLetter(item.name);
        foodTypeOptions.push({ value: item.id, label: lwrLabel });
        setSelectFoodType(foodTypeOptions);
      });
    }
  }, [foodType]);

  useEffect(() => {
    if (restaurant) {
      setFoodType(restaurant?.restaurant.foodTypes);
    }
    setValue("email", restaurant?.email);
    setValue("cnpj", restaurant?.restaurant.cnpj);
    setValue("name", restaurant?.restaurant.name);
    setValue("nickname", restaurant?.restaurant.address.nickname);
    setValue("phone", restaurant?.restaurant.phone);
    setValue("street", restaurant?.restaurant.address.street);
    setValue("number", restaurant?.restaurant.address.number);
    setValue("neighborhood", restaurant?.restaurant.address.neighborhood);
    setValue("city", restaurant?.restaurant.address.city);
    setValue("zipCode", restaurant?.restaurant.address.zipCode);
    setValue("state", restaurant?.restaurant.address.state);
  }, [restaurant]);

  const onLoad = (fileString: any) => {
    setImageBanner(fileString);
  };

  const getBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      getBase64(file);
    }
  };

  const body: IRestaurantUpdate = {
    photo: { code: "" },
    user: { id: 0 },
    id: 0,
    name: "",
    cnpj: "",
    phone: "",
    address: {
      id: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      zipCode: "",
      state: "",
      nickname: "",
    },
    foodTypes: [{ id: 0, name: "" }],
  };

  const foodTypeBackend: any = [];

  const onSubmit = () => {
    const values = getValues();
    body.photo.code = imageBanner;
    if (restaurant) {
      body.id = restaurant?.restaurant.id;
      body.user.id = restaurant.id;
      body.address.id = restaurant?.restaurant.address.id;
    }
    body.name = values.name;
    body.cnpj = values.cnpj;
    body.phone = values.phone;
    body.address.street = values.street;
    body.address.number = values.number;
    body.address.neighborhood = values.neighborhood;
    body.address.city = values.city;
    body.address.nickname = values.nickname;
    body.address.zipCode = values.zipCode;
    body.address.state = values.state;

    selectFoodType?.forEach((item) => {
      foodTypeBackend.push({ id: item.value, name: item.label.toUpperCase() });
    });
    body.foodTypes = foodTypeBackend;
    if (selectFoodType?.length !== 0 && restaurant?.restaurant.id) {
      editRestaurant(restaurant?.restaurant.id, body);
    }
    console.log(body);
  };

  return (
    <Container>
      {putRestaurantSucceeded && (
        <AlertMessage variant="green">
          Restaurante editado com sucesso
        </AlertMessage>
      )}
      {putRestaurantError && (
        <AlertMessage variant="green">
          Erro ao editadar restaurante
        </AlertMessage>
      )}
      {loading ? (
        <div className={style.spanSkeleton}>
          <Skeleton count={1} className={style.skeletonTitle} />

          <Skeleton count={6} wrapper={Box} className={style.oi} />
        </div>
      ) : (
        <>
          <div className={style.perfil}>Olá {restaurant?.restaurant.name}</div>
          <form onSubmit={handleSubmit(onSubmit)} className={style.spanPerfil}>
            <div className={style.spanform}>
              Informações pessoais
              <div className={style.form}>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.email?.message}</ErrorMessage>
                </div>

                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="cnpj"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={cnpj(value)}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.cnpj?.message}</ErrorMessage>
                </div>

                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.name?.message}</ErrorMessage>
                </div>

                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={normalizePhone(value)}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.phone?.message}</ErrorMessage>
                </div>

                <div className={style.spanInputItem}>
                  <SelectSignUp
                    onChange={(value) => setSelectFoodType(value)}
                    classNameInput={style.selectInput}
                    classNameIcon={style.selectIcon}
                    classNameSpan={style.selectSpan}
                    value={selectFoodType}
                  />

                  {selectFoodType.length === 0 && (
                    <ErrorMessage>
                      {" "}
                      O campo Tipo de Comida é obrigatório{" "}
                    </ErrorMessage>
                  )}
                </div>

                <Link to="/home" className={style.link}>
                  Alterar Senha
                </Link>
              </div>
              Endereço
              <div className={style.form}>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="nickname"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInputStreet}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.nickname?.message}</ErrorMessage>
                </div>

                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="street"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        {...register("street")}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.street?.message}</ErrorMessage>
                </div>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="neighborhood"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.neighborhood?.message}</ErrorMessage>
                </div>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="number"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.number?.message}</ErrorMessage>
                </div>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="zipCode"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={zipCode(value)}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.zipCode?.message}</ErrorMessage>
                </div>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="city"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.city?.message}</ErrorMessage>
                </div>
                <div className={style.spanInputItem}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="state"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        control={control}
                        value={value}
                        onChange={onChange}
                        className={style.spanInput}
                        classInput={style.input}
                      />
                    )}
                  />
                  <ErrorMessage> {errors.state?.message}</ErrorMessage>
                </div>
              </div>
            </div>
            <div className={style.imageSpan}>
              <div className={style.spanRight}>
                <img
                  src={imageBanner}
                  className={style.image}
                  alt="Promotion Banner"
                />
                <span className={style.uploadSpan}>
                  <input
                    className={style.inputUpload}
                    onChange={onChangeImage}
                    name="images"
                    multiple={false}
                    type="file"
                    accept=".jpef, .png, .jpg"
                  />
                </span>
              </div>

              <div className={style.buttonspan}>
                <Button
                  className={style.buttonSave}
                  type="submit"
                  variant="red"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </form>{" "}
        </>
      )}
      ;
    </Container>
  );
}
