import DeleteIcon from './deleteIcon.js';
import EditIcon from './editeIcon.js';
import style from '../../styles/Home.module.css';
import { Popover, Typography, Box } from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditModule from '../card/EditModule.js';
import { DeleteTask } from '../card/deleteDialog';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
export default function Item({ data, refetch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(data?.title);
  const [desEdit, setDesEdit] = useState(data?.subject);
  const [loadDelete, setLoadDelete] = useState(false);
  const Router = useRouter();
  const queryClient = useQueryClient();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const mutation = useMutation(
    (id) =>
      new Promise((resolve, reject) => {
        resolve(id);
      }),
    {
      onSuccess: (id) => {
        queryClient.setQueryData('Tasks', (old) => {
          const index = old.data.findIndex((item) => item._id == id);
          old.data.splice(index, 1);

          return {
            ...old,
            data: [...old.data],
          };
        });
      },
    }
  );

  return (
    <>
      <div className={style.cardTextCont}>
        <div>
          <Link href={`/todos/${data._id}`} passhref>
            <a
              className={style.itemText}
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              {data?.title}
            </a>
          </Link>
          <p
            className={style.itemText}
            style={{ margin: '2px 0px', fontSize: '14px', color: '#000000d9' }}
          >
            {data?.subject}
          </p>
        </div>
        <MoreVertIcon className={style.cardDots} onClick={handleClick} />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div>
            <div
              className={style.optionCont}
              onClick={() => {
                handleClose();
                DeleteTask(data._id, setLoadDelete, refetch, mutation.mutate);
              }}
            >
              <Typography
                variant='body2'
                component='span'
                className={style.optionitemText}
                sx={{ mr: 3 }}
              >
                Delete
              </Typography>
              <DeleteIcon />
            </div>
            <div
              className={style.optionCont}
              onClick={() => {
                handleClose();
                setOpenEdit(true);
              }}
            >
              <Typography
                variant='body2'
                component='span'
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
      <EditModule
        open={openEdit}
        setOpen={setOpenEdit}
        ID={data._id}
        status={data.status}
        title={titleEdit}
        setTitle={setTitleEdit}
        description={desEdit}
        setDiscription={setDesEdit}
        refetch={refetch}
      />
    </>
  );
}
