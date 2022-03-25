import AddIcon from "./addicons.js";
import style from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import Item from "../item/item.js";
import { Fragment } from "react";
function Card(props) {
  const { bcolor, data = [1, 2, 3] } = props;

  return (
    <div className={style.cardCont}>
      <Box className={style.cardHead} sx={{ color: `${bcolor}` }}>
        <div>
          <h6 className={style.cardTitle}>Doing</h6>
          <p className={style.cardDescription}>Description here </p>
        </div>
        <div className={style.iconContainer}>
          <AddIcon color="white" />
        </div>
      </Box>
      <div>
        {data?.map((item, index) => {
          return (
            <Fragment key={index}>
              <Item />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
export default Card;
