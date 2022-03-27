import AddIcon from "./addicons.js";
import style from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import Item from "../item/item.js";
import AddModule from "./addModule.js";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Card(props) {
  const { bcolor, idCard, data } = props;
  const [openAdd, setOpenAdd] = useState(false);
  const [titleAdd, setTitleAdd] = useState("");
  const [desAdd, setDesAdd] = useState("");
  const getListStyle = () => ({
    width: "100%",
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <div className={style.cardCont}>
      <Box className={style.cardHead} sx={{ color: `${bcolor}` }}>
        <div>
          <h6 className={style.cardTitle}>{idCard}</h6>
          <p className={style.cardDescription}>Description here </p>
        </div>
        {idCard == "todo" && (
          <div className={style.iconContainer}>
            <AddIcon color="white" onClick={() => setOpenAdd(true)} />
          </div>
        )}
      </Box>
      <Droppable droppableId={`${idCard}`}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ width: "100%" }}
          >
            {data?.map((item, index) => {
              return (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item data={item} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddModule open={openAdd} setOpen={setOpenAdd} />
    </div>
  );
}
export default Card;
