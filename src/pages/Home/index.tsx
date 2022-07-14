import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PromotionCard } from "../../components";
import { Container } from "../../components/Container";
import { comments } from "../../contants/comments";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();

  const { getPromotions, promotions, getPromotionBanner, promotionBanner } =
    usePromotion();

  useEffect(() => {
    getPromotions();
    getRestaurant();
    console.log();
  }, []);

  const oi = () => {
    console.log("oi");
  };

  function handleClick() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.getItem("token");
    navigate("/");
  }

  console.log(promotions[1], promotions[2]);

  return (
    <Container>
      <div className={style.home}> {restaurant?.name} </div>
      <button type="button" onClick={handleClick}>
        log out
      </button>
      <div className={style.homeSpan}>
        <div className={style.leftSpan}>
          <div className={style.grade}>SUA NOTA</div>
          <div className={style.spanPromotionsBanners}>
            <div className={style.promotionsActiveTitle}>
              Suas promoções ativas
            </div>
            <div className={style.scrollPromotions}>
              {promotions &&
                promotions.map((promotion) => (
                  <div className={style.promotionBanner}>
                    <PromotionCard
                      data={promotion}
                      onDelete={oi}
                      classNameImage={style.promotionImage}
                      classNameInable={style.itensInable}
                      classNameSpanDefaul={style.promotionDefault}
                      style={{ width: "20rem", position: "block" }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={style.rightSpan}>
          <div className={style.coments}>
            <div>
              O que os cliente estão <br /> achando?
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
