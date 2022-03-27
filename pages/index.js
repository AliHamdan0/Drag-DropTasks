import Head from "next/head";
import style from "../styles/Home.module.css";
import Card from "../components/card/card";
import { useState } from "react";
import { Grid, Container } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [cardData, setCardData] = useState({
    cardOne: [
      { id: "1", content: "oneItem" },
      { id: "2", content: "twoItem" },
    ],
    cardTwo: [
      { id: "3", content: "threeItem" },
      { id: "4", content: "fourItem" },
    ],
    cardThree: [
      { id: "5", content: "fiveItem" },
      { id: "6", content: "sixItem" },
    ],
    cardFour: [
      { id: "7", content: "sevenItem" },
      { id: "8", content: "eightItem" },
    ],
  });

  const getCardPropert = (id) => {
    if (id == "c1") return "cardOne";
    else if (id == "c2") return "cardTwo";
    else if (id == "c3") return "cardThree";
    else if (id == "c4") return "cardFour";
  };

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getList = (id) => {
    // return the card's array
    if (id == "c1") {
      return cardData.cardOne;
    } else if (id == "c2") {
      return cardData.cardTwo;
    } else if (id == "c3") {
      return cardData.cardThree;
    } else if (id == "c4") {
      return cardData.cardFour;
    }
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[getCardPropert(droppableSource.droppableId)] = sourceClone;
    result[getCardPropert(droppableDestination.droppableId)] = destClone;
    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      //inside the same card
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      let cardName = getCardPropert(source.droppableId);
      setCardData({ ...cardData, [cardName]: items });
    } else {
      // now it is moving from card to card
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setCardData({
        // update entire state
        ...cardData,
        ...result,
      });
    }
  };
  console.log("finalResult", cardData);
  return (
    <div>
      <h1 className={style.mainTitle}>Todo List</h1>
      <Container maxWidth="xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Card bcolor="#F66568" id="c1" data={cardData.cardOne} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card bcolor="#F66568" id="c2" data={cardData.cardTwo} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card bcolor="#F66568" id="c3" data={cardData.cardThree} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card bcolor="#F66568" id="c4" data={cardData.cardFour} />
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
    </div>
  );
}
