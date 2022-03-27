import AddIcon from "./addicons.js";
import style from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import Item from "../item/item.js";
import { Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Card(props) {
  const { bcolor, id, data } = props;

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
          <h6 className={style.cardTitle}>Doing</h6>
          <p className={style.cardDescription}>Description here </p>
        </div>
        <div className={style.iconContainer}>
          <AddIcon color="white" />
        </div>
      </Box>
      <Droppable droppableId={`${id}`}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ width: "100%" }}
          >
            {data?.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                    >
                      <Item data={item.content} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
export default Card;
