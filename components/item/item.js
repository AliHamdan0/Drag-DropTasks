import DeleteIcon from "./deleteIcon.js";
import EditIcon from "./editeIcon.js";
import style from "../../styles/Home.module.css";
import { Popover, Typography, Box } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function Item({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <div className={style.cardTextCont}>
        <span className={style.itemText}>{data}</span>
        <MoreVertIcon className={style.cardDots} onClick={handleClick} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div>
            <div className={style.optionCont}>
              <Typography
                variant="body2"
                component="span"
                className={style.optionitemText}
                sx={{ mr: 3 }}
              >
                Delete
              </Typography>
              <DeleteIcon />
            </div>
            <div className={style.optionCont}>
              <Typography
                variant="body2"
                component="span"
                className={style.optionitemText}
                sx={{ mr: 3 }}
              >
                Edit
              </Typography>
              <EditIcon />
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
}
