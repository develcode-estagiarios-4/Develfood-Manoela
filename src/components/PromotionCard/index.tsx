import { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import img from "../../assets/img/layoutHome.png";
import { useAuth } from "../../context";
import { usePromotion } from "../../hooks/usePromotion";
import { useRestaurant } from "../../hooks/useRestaurant";
import { IPromotion } from "../../interface/IPromotion";
import api from "../../services/api";
import style from "./style.module.scss";

interface IPromotionProps {
  data: IPromotion;
  onDelete: () => void;
}

export function PromotionCard({ data, onDelete }: IPromotionProps) {
  const navigate = useNavigate();

  const { deletePromotion, getPromotionBanner, promotionBanner } =
    usePromotion();

  const handleDelete = async (id: number) => {
    await deletePromotion(id);
    onDelete();
  };

  const handleEdit = (id: number) => {
    navigate(`/promotion/edit/${data.id}`);
  };

  useEffect(() => {
    getPromotionBanner(data.photo_url.slice(40));
  }, [promotionBanner]);

  return (
    <div className={style.divhover}>
      <div className={style.promotion}>
        <div className={style.divS}>
          {promotionBanner ? (
            <img
              src={promotionBanner}
              alt="Promotion Banner"
              className={style.imagePromotion}
            />
          ) : (
            ""
          )}
          <div className={style.promotionTitle}>{data.name}</div>
          <div className={style.spanButtons}>
            <button
              className={style.spanDelete}
              onClick={() => handleDelete(data.id)}
              type="button"
            >
              <MdIcons.MdDelete className={style.IconDelete} />
            </button>
            <button
              className={style.spanEdit}
              onClick={() => handleEdit(data.id)}
              type="button"
            >
              <RiIcons.RiPencilFill className={style.IconEdit} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
