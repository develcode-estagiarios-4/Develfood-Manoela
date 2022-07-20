import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import * as VscIcons from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPromotions();
    getRestaurant();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const grade = 3.5;

  const starGradind = (grade: number) => {
    const gradePortion: Array<number> = [];
    const parcialPainted = (grade % 1) * 10;
    const fullPaited = grade - parcialPainted / 10;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fullPaited; i++) {
      gradePortion[i] = 100;
    }
    gradePortion.push(parcialPainted * 10);
    if (gradePortion.length < 5) {
      const isMissing = 5 - gradePortion.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < isMissing; i++) {
        gradePortion.push(0);
      }
    }
    console.log(gradePortion);
    return gradePortion;
  };

  useEffect(() => {
    starGradind(grade);
  });

  return (
    <Container active="true">
      {loading ? (
        <div className={style.contentSkeleton}>
          <Skeleton
            count={3}
            style={{ width: "50rem", height: "30rem" }}
            duration={12000}
          />
        </div>
      ) : (
        <>
          <button type="button" onClick={handleClick}>
            log out
          </button>
          <div className={style.homePage}>
            <div className={style.home}> {restaurant?.name} </div>
            <div className={style.homeSpan}>
              <div className={style.leftSpan}>
                <div className={style.gradeSpan}>
                  Sua nota{" "}
                  <div>
                    <link
                      rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    />
                  </div>
                  {starGradind(grade).map((grade) => (
                    <span>
                      <i
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "11rem",
                          background: `linear-gradient(to right, #DFCC1B ${
                            grade - 10
                          }%, white ${grade + 10}%`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        star
                      </i>
                    </span>
                  ))}
                  <div className={style.grade}>{`${grade}/5.0`}</div>
                </div>

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
          </div>
        </>
      )}
    </Container>
  );
}
