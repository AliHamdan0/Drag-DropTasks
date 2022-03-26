import AddIcon from "./addicons.js";
import style from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import Item from "../item/item.js";
import { Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

function Card(props) {
  const { bcolor, data = [{ id: "aa" }, { id: "ss2" }, { id: "dd3" }] } = props;
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: 250,
  });
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  resetServerContext();
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {data?.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Item />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default Card;
