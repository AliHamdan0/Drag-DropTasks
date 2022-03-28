import { Modal } from "@mui/material";
import style from "../../styles/Home.module.css";
import { ModTask } from "../../helpers/endPoints";
import axios from "axios";
import { useState } from "react";

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
  const handleEditTask = () => {
    setLoading(true);
    axios
      .patch(ModTask(ID), {
        title: title,
        subject: description,
        status: status,
      })
      .then((res) => {
        setLoading(false);
        setOpen(false);
        refetch();
      });
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
          outline: "none",
          border: "none",
          padding: "15px",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className={style.addModuleCont}>
          <h6 className={style.titleModule}>Edit task</h6>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.moduleInput}
          />
          <textarea
            cols={10}
            rows={10}
            placeholder="Subject"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            className={style.moduleArea}
          />
          <button
            className={style.addModButton}
            onClick={() => handleEditTask()}
          >
            Edit
          </button>
        </div>
      </Modal>
    </div>
  );
}
