import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import img from "../../assets/img/previewPromotion.png";
import { Container } from "../../components";
import { AlertMessage } from "../../components/AlertMessage";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input } from "../../components/Input";
import { usePlate } from "../../hooks/usePlate";
import { useRestaurant } from "../../hooks/useRestaurant";
import { INewPlate } from "../../interface/INewPlate";
import { removeLetters } from "../../utils/textUtils";
import style from "./style.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("O campo Nome é obrigatório"),
  description: yup.string().required("O campo Descrição é obrigatório"),
  price: yup.string().required("O campo Preço é obrigatório"),
});

export function PlateForm() {
  const { id } = useParams();

  const { restaurant, getRestaurant } = useRestaurant();
  const [foodType, setFoodType] = useState(0);
  const {
    postPlate,
    updatePlate,
    plateBanner,
    plate,
    getPlate,
    getPlateBanner,
    setPlateBanner,
  } = usePlate();

  const navigate = useNavigate();
  const [imageBanner, setImageBanner] = useState(img);

  useEffect(() => {
    if (restaurant?.id !== undefined) {
      console.log(restaurant?.id);
    }
  }, [restaurant]);

  useEffect(() => {
    getRestaurant();
    if (id) {
      const plateId = parseInt(id, 10);
      getPlate(plateId);
      if (plateBanner !== null) {
        setImageBanner(plateBanner);
      }
      setImageBanner(plate.photo_url);
      console.log(plate.photo_url);
    }
  }, []);

  useEffect(() => {
    if (plateBanner !== null) {
      setPlateBanner(plateBanner);
    }
  }, [plateBanner]);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLoad = (fileString: any) => {
    setImageBanner(fileString);
  };

  const getBase64 = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  useEffect(() => {
    getPlateBanner(plate.photo_url.slice(40));
    console.log(plate);
    setValue("name", plate.name);
    setValue("description", plate.description);
    setValue("price", plate.price);
    setValue("foodType", plate.foodType.name);
  }, [plate]);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];
      getBase64(file);
    }
  };

  const handleClickVoltar = () => {
    navigate("/menu");
  };

  const body: INewPlate = {
    name: "",
    description: "",
    price: 0,
    foodType: { id: 0 },
    restaurant: { id: 0 },
    photo: { code: "string" },
  };

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    body.description = values.description;
    body.name = values.name;
    body.price = values.price;
    console.log(values.foodType);
    body.foodType.id = foodType;
    if (restaurant?.id !== undefined) {
      body.restaurant.id = restaurant.id;
    }
    body.photo.code = imageBanner;
    if (id) {
      updatePlate(id, body);
    } else {
      postPlate(body);
    }
  };

  return (
    <Container>
      <div className={style.pageContent}>
        <div className={style.tittle}>
          Cadastro de novo <br /> prato
        </div>
        <div className={style.spanContent}>
          <form className={style.leftSpam} onSubmit={handleSubmit(onSubmit)}>
            <Button
              variant="green"
              type="button"
              className={style.buttonPromotion}
              onClick={handleClickVoltar}
            >
              Voltar
            </Button>
            <div className={style.spanForm}>
              <div className={style.inputNome}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nome"
                      type="input"
                      value={value}
                      onChange={onChange}
                      control={control}
                      className={style.nameInput}
                    />
                  )}
                />
                <ErrorMessage> {errors.name?.message}</ErrorMessage>
              </div>

              <div className={style.spanInput}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Descrição"
                      type="input"
                      value={value}
                      onChange={onChange}
                      control={control}
                      className={style.porcentInput}
                    />
                  )}
                />
                <ErrorMessage> {errors.description?.message}</ErrorMessage>
              </div>
              <div className={style.inputDate}>
                <div>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Preço"
                        type="text"
                        value={value}
                        onChange={(e) =>
                          onChange(removeLetters(e.target.value))
                        }
                        control={control}
                        className={style.dataInput}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name="foodType"
                    render={({ field: { onChange, value } }) => (
                      <select
                        placeholder="Tipo de comida"
                        className={style.selectPlate}
                        onChange={(e) =>
                          setFoodType(parseInt(e.target.value, 10))
                        }
                      >
                        <option value="" disabled selected hidden>
                          Tipo de comida
                        </option>
                        <option value={1}>Fastfood</option>
                        <option value={2}>Pizza</option>
                        <option value={3}>Italiana</option>
                        <option value={4}>Doce</option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className={style.spanError}>
                <div className={style.spanPrice}>
                  <ErrorMessage> {errors.price?.message}</ErrorMessage>
                </div>
                <div className={style.spanFoodType}>
                  <ErrorMessage> {errors.price?.message}</ErrorMessage>
                </div>
              </div>
            </div>

            <Button
              variant="red"
              type="submit"
              className={style.buttonPromotion}
            >
              Salvar
            </Button>
          </form>

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
        </div>
      </div>
    </Container>
  );
}
