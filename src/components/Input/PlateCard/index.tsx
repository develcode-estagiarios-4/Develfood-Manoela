import { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { Input } from "..";

import { usePlate } from "../../../hooks/usePlate";
import { IPlate } from "../../../interface/IPlate";
import style from "./style.module.scss";

interface IPlateProps {
  data: IPlate;
  onDelete: () => void;
}

export function PlateCard({ data, onDelete }: IPlateProps) {
  const navigate = useNavigate();
  const { deletePlate, plateBanner, getPlateBanner } = usePlate();

  const handleDelete = (id: number) => {
    deletePlate(id);
    console.log("deletadahhh");
  };

  const handleEdit = (id: number) => {
    navigate(`/plate/edit/${data.id}`);
  };

  useEffect(() => {
    getPlateBanner(data.photo_url.slice(40));
  }, [plateBanner]);

  return (
    <div className={style.divhover}>
      <div className={style.promotion}>
        <div className={style.divS}>
          {plateBanner ? (
            <img
              src={plateBanner}
              alt="Promotion Banner"
              className={style.imagePromotion}
            />
          ) : (
            ""
          )}
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
