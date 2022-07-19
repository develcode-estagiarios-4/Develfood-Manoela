import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PromotionCard } from "../../components";
import { CommentCard, IComment } from "../../components/CommentCard";
import { Container } from "../../components/Container";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();
  const { getPromotions, promotions } = usePromotion();
  useEffect(() => {
    getPromotions();
    getRestaurant();
  }, []);
  const oi = () => {
    // console.log("oi");
  };
  function handleClick() {
    sessionStorage.clear();
    localStorage.clear();
    localStorage.getItem("token");
    navigate("/");
  }

  const comments: IComment[] = [
    {
      message:
        "“A comida desse lugar é sensacional. Eu e minha esposa comemos quase todo o domingo!!!”",
      date: "01/02/2022",
    },
    {
      message:
        "“A comida é excelente, mas muitas vezes demora para ficar preparada.“",
      date: "01/02/2022",
    },
    {
      message: "“O sinônimo de comida boa é DevelcodeRestaurant.“",
      date: "01/02/2022",
    },
  ];

  return (
    <Container active="true">
      <button type="button" onClick={handleClick}>
        log out
      </button>
      <div className={style.home}> {restaurant?.name} </div>

      <div className={style.homeSpan}>
        <div className={style.leftSpan}>
          <div className={style.grade}>Sua nota</div>
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
                      // classNameImage={style.promotionImage}
                      // classNameInable={style.itensInable}
                      // classNameSpanDefaul={style.promotionDefault}
                      // style={{ width: "20rem", position: "block" }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={style.rightSpan}>
          <div className={style.coments}>
            <div className={style.commentsTittle}>
              O que os cliente estão <br /> achando?
            </div>
            <div className={style.spanComments}>
              {comments.map((comment: IComment) => {
                return <CommentCard data={comment} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
