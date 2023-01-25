import { Modal, CircularProgress } from '@mui/material';
import style from '../../styles/Home.module.css';
import { ModTask } from '../../helpers/endPoints';
import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export default function EditModule(props) {
  const {
    open,
    setOpen,
    ID,
    status,
    title,
    setTitle,
    description,
    setDiscription,
    refetch,
  } = props;
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (item) =>
      new Promise((resolve, reject) => {
        resolve(item);
      }),
    {
      onSuccess: (item) => {
        queryClient.setQueryData('Tasks', (old) => {
          const index = old.data.findIndex((i) => i._id == item._id);
          old.data[index] = item;
          return {
            ...old,
            data: [...old.data],
          };
        });
      },
    }
  );
  const handleEditTask = () => {
    setLoading(true);
    setTimeout(() => {
      mutation.mutate({
        _id: ID,
        title: title,
        subject: description,
        status: status,
      });
      setLoading(false);
      setOpen(false);
    }, [1000]);
    // axios
    //   .patch(ModTask(ID), {
    //     title: title,
    //     subject: description,
    //     status: status,
    //   })
    //   .then((res) => {
    //     setLoading(false);
    //     setOpen(false);
    //     // refetch();
    //   });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
        sx={{
          outline: 'none',
          border: 'none',
          padding: '15px',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <div className={style.addModuleCont}>
          <h6 className={style.titleModule}>Edit task</h6>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.moduleInput}
          />
          <textarea
            cols={10}
            rows={10}
            placeholder='Subject'
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            className={style.moduleArea}
          />
          <button
            className={style.addModButton}
            onClick={() => handleEditTask()}
            disabled={title == '' && description == ''}
          >
            Edit
            {loading == true && (
              <CircularProgress sx={{ color: 'white', ml: '8px' }} size={20} />
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
}
