import { PropsWithChildren, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import { Button, Container, NoPlate } from "../../components";
import { DeleteMessage } from "../../components/DeleteMessage";
import { PlateCard } from "../../components/Input/PlateCard";
import { usePlate } from "../../hooks/usePlate";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IPlate } from "../../interface/IPlate";
import style from "./style.module.scss";

function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "inline-block",
        lineHeight: 39,
        padding: "1rem",
        marginBottom: "3rem",
        width: 228,
        justifyContent: "space-between",
        marginLeft: "4rem",
        columnGap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

export function Menu() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { restaurant, getRestaurant } = useRestaurant();
  const { getPlates, plates, searchPlate } = usePlate();

  useEffect(() => {
    getRestaurant();
  }, []);

  useEffect(() => {
    getPlates();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleDeletePromotion = () => {
    getPlates();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (restaurant?.id !== undefined) {
      searchPlate(e.target.value, restaurant.id);
    }
  };

  const handleClick = () => {
    navigate("/plate/new");
  };

  return (
    <Container>
      <div className={style.spanPage}>
        <div className={style.menu}>
          Menu do restaurante: <br />
          {restaurant?.name}
        </div>{" "}
        <div className={style.spancontent}>
          <input
            className={style.searchPlate}
            placeholder="Nome do Prato"
            onChange={handleChange}
          />
          <Button
            variant="red"
            type="button"
            className={style.buttonPromotion}
            onClick={handleClick}
          >
            Nova Promoção
          </Button>
          {/* <DeleteMessage /> */}

          {loading ? (
            <div className={style.contentNoPromotion}>
              <Skeleton wrapper={Box} count={6} />
            </div>
          ) : (
            <div
              className={
                plates.length > 0
                  ? style.contentNoPromotion
                  : style.contentPromotion
              }
            >
              {plates.length > 0 ? (
                plates.map((plate: IPlate) => (
                  <div key={plate.id}>
                    <PlateCard data={plate} onDelete={handleDeletePromotion} />
                  </div>
                ))
              ) : (
                <div className={style.spanNoPromotion}>
                  <NoPlate />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
