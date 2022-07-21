import { useEffect, useState } from "react";
import * as RiIcons from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";

import { PromotionCard } from "../../components";
import { CommentCard, IComment } from "../../components/CommentCard";
import { Container } from "../../components/Container";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

export function Home() {
  const navigate = useNavigate();
  const { restaurant, getRestaurant } = useRestaurant();
  const { getPromotions, promotions } = usePromotion();
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMorePromotions, setLoadMorePromotions] = useState(true);
  const [promotionsUpdate, setPromotionsUpdate] = useState<IPromotion[]>();

  useEffect(() => {
    getPromotions(pagination, 2);
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
    const fullPainted = grade - parcialPainted / 10;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fullPainted; i++) {
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
    return gradePortion;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 4000);
    if (promotions.length > 0) {
      setPromotionsUpdate(promotions);
    } else {
      getPromotions(0, 2);
      setPagination(0);
      setPromotionsUpdate(promotions);
    }
  }, [promotions]);

  const handleArrowRight = () => {
    setPagination(pagination + 1);
    getPromotions(pagination + 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 2000);
  };

  const handleArrowLeft = () => {
    setPagination(pagination - 1);
    getPromotions(pagination - 1, 2);
    setLoadMorePromotions(true);
    setTimeout(() => {
      setLoadMorePromotions(false);
    }, 4000);
  };

  const isBegging = pagination === 0;

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
                    {loadMorePromotions && (
                      <div className={style.skeletonSpanPromotion}>
                        <Skeleton
                          count={1}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                            // backgroundColor: "rgb(162, 155, 155)",
                          }}
                        />
                        <Skeleton
                          count={1}
                          style={{
                            width: "30rem",
                            height: "20rem",
                            zIndex: -2,
                            // backgroundColor: "black",
                          }}
                        />
                      </div>
                    )}

                    <RiIcons.RiArrowRightSLine
                      className={style.arrow}
                      onClick={handleArrowRight}
                    />
                    {!isBegging && (
                      <RiIcons.RiArrowLeftSLine
                        className={`${style.arroew} ${style.arrowLeft}`}
                        onClick={handleArrowLeft}
                      />
                    )}

                    {promotionsUpdate &&
                      promotionsUpdate.map((promotion: IPromotion, index) => (
                        <div
                          className={style.promotionBanner}
                          key={promotion.id}
                        >
                          <PromotionCard
                            data={promotion}
                            onDelete={oi}
                            classNameImage={style.promotionImage}
                            classNameInable={style.itensInable}
                            classNameSpanDefaul={style.promotionDefault}
                          />
                          <Link
                            to={`/promotion/edit/${promotion.id}`}
                            className={`${style.link} ${
                              index === 1
                                ? style.promotionRight
                                : style.promotionLeft
                            }`}
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
