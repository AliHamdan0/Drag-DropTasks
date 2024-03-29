import Head from 'next/head';
import style from '../styles/Home.module.css';
import Card from '../components/card/card';
import { useState } from 'react';
import { Grid, Container } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Tasks, ModTask } from '../helpers/endPoints';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import CustomLoader from '../components/customLoader';
export default function Home(props) {
  const [cardData, setCardData] = useState(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError, error, refetch } = useQuery(
    'Tasks',
    () => {
      return axios.get(Tasks);
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      initialData: props.tasks,
      onSuccess: (data) => {
        setCardData({
          cardOne: data?.data?.filter((task) => task.status == 'todo'),
          cardTwo: data?.data?.filter((task) => task.status == 'doing'),
          cardThree: data?.data?.filter((task) => task.status == 'done'),
          cardFour: data?.data?.filter((task) => task.status == 'archive'),
        });
      },
    }
  );
  const mutation = useMutation(
    (data) =>
      new Promise((resolve, reject) => {
        resolve(data);
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('Tasks', (old) => {
          return {
            ...old,
            data: [
              ...data.cardOne,
              ...data.cardTwo,
              ...data.cardThree,
              ...data.cardFour,
            ],
          };
        });
      },
    }
  );
  const updateStatus = (data, sourceTasks, droppableSource) => {
    const newStatus = data?.droppableId;
    const [removed] = sourceTasks.splice(droppableSource.index, 1);
    return removed;
    // axios
    //   .patch(ModTask(removed._id), {
    //     title: removed.title,
    //     subject: removed.subject,
    //     status: newStatus,
    //   })
    //   .then((res) => {
    //      refetch();
    //   });
  };
  const getCardPropert = (id) => {
    if (id == 'todo') return 'cardOne';
    else if (id == 'doing') return 'cardTwo';
    else if (id == 'done') return 'cardThree';
    else if (id == 'archive') return 'cardFour';
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
    if (id == 'todo') {
      return cardData.cardOne;
    } else if (id == 'doing') {
      return cardData.cardTwo;
    } else if (id == 'done') {
      return cardData.cardThree;
    } else if (id == 'archive') {
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
      mutation.mutate({ ...cardData, [cardName]: items });
    } else {
      // now it is moving from card to card
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      const oldItem = updateStatus(
        destination,
        getList(source.droppableId),
        source
      );
      const ind = Object.values(result)[1].findIndex(
        (i) => i._id == oldItem._id
      );
      Object.values(result)[1][ind].status = destination.droppableId; //to update state localy
      setCardData({
        // update entire state
        ...cardData,
        ...result,
      });
      mutation.mutate({ ...cardData, ...result });
    }
  };
  const checkColor = (status) => {
    switch (status) {
      case 'todo':
        return '#F66568';
      case 'doing':
        return '#FFC773';
      case 'done':
        return '#6BE795';
      case 'archive':
        return '#7389FF';
      default:
        return 'black';
    }
  };
  if (isLoading)
    return (
      <div className='loaderContainer'>
        <CustomLoader />
      </div>
    );
  return (
    <div>
      <Head>
        <title>Tasks Home</title>
        <meta charSet='UTF-8' />
        <meta name='description' content='Tasks' />
        <meta name='keywords' content='React, Next, JavaScript' />
      </Head>
      <h1 className={style.mainTitle}>Todo List</h1>
      <Container maxWidth='xl'>
        <DragDropContext onDragEnd={onDragEnd}>
          {cardData != null && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <Card
                  bcolor={checkColor('todo')}
                  idCard='todo'
                  data={cardData.cardOne}
                  refetch={refetch}
                  setCardData={setCardData}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Card
                  bcolor={checkColor('doing')}
                  idCard='doing'
                  data={cardData.cardTwo}
                  refetch={refetch}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Card
                  bcolor={checkColor('done')}
                  idCard='done'
                  data={cardData.cardThree}
                  refetch={refetch}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Card
                  bcolor={checkColor('archive')}
                  idCard='archive'
                  data={cardData.cardFour}
                  refetch={refetch}
                />
              </Grid>
            </Grid>
          )}
        </DragDropContext>
      </Container>
    </div>
  );
}
export async function getStatisProps() {
  const res = await fetch(Tasks);
  const data = await res.json();
  return {
    props: {
      tasks: data || '',
    },
    revalidate: 60 * 60 * 24, //Every day we update the information on server by rebuilding
  };
}
