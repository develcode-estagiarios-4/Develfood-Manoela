import { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { usePromotion } from "../../hooks/usePromotion";
import { IPromotion } from "../../interface/IPromotion";
import style from "./style.module.scss";

interface IPromotionProps {
  data: IPromotion;
  onDelete: () => void;
}

export function PromotionCard({ data, onDelete }: IPromotionProps) {
  const navigate = useNavigate();

  const { deletePromotion, getPromotionBanner, promotionBanner } =
    usePromotion();

  const handleDelete = async () => {
    await deletePromotion(data.id);
    onDelete();
  };

  const handleEdit = () => {
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
              onClick={handleDelete}
              type="button"
            >
              <MdIcons.MdDelete className={style.IconDelete} />
            </button>
            <button
              className={style.spanEdit}
              onClick={handleEdit}
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
