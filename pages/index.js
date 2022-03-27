import Head from "next/head";
import style from "../styles/Home.module.css";
import Card from "../components/card/card";
import { useState } from "react";
import { Grid, Container } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tasks } from "../helpers/endPoints";
import { useQuery } from "react-query";
import axios from "axios";
export default function Home() {
  const { isLoading, isFetching, data, isError, error } = useQuery(
    "Tasks",
    () => {
      return axios.get(GetTasks);
    }
  );
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
    if (id == "todo") return "cardOne";
    else if (id == "doing") return "cardTwo";
    else if (id == "done") return "cardThree";
    else if (id == "archive") return "cardFour";
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
    if (id == "todo") {
      return cardData.cardOne;
    } else if (id == "doing") {
      return cardData.cardTwo;
    } else if (id == "done") {
      return cardData.cardThree;
    } else if (id == "archive") {
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
  const checkColor = (status) => {
    switch (status) {
      case "todo":
        return "#F66568";
      case "doing":
        return "#FFC773";
      case "done":
        return "#6BE795";
      case "archive":
        return "#7389FF";
      default:
        return "black";
    }
  };
  console.log("finalResult", cardData);
  console.log("data", data?.data);
  return (
    <div>
      <h1 className={style.mainTitle}>Todo List</h1>
      <Container maxWidth="xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <Card
                bcolor={checkColor("todo")}
                idCard="todo"
                data={data?.data?.filter((task) => task.status == "todo")}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card
                bcolor={checkColor("doing")}
                idCard="doing"
                data={data?.data?.filter((task) => task.status == "doing")}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card
                bcolor={checkColor("done")}
                idCard="done"
                data={data?.data?.filter((task) => task.status == "done")}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Card
                bcolor={checkColor("archive")}
                idCard="archive"
                data={data?.data?.filter((task) => task.status == "archive")}
              />
            </Grid>
          </Grid>
        </DragDropContext>
      </Container>
    </div>
  );
}
