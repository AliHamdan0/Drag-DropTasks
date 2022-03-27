import { Modal } from "@mui/material";
import { useState } from "react";
import style from "../../styles/Home.module.css";
import { Task } from "../../helpers/endPoints";
import axios from "axios";
export default function AddModule(props) {
  const { open, setOpen } = props;
  const [titleAdd, setTitleAdd] = useState("");
  const [desAdd, setDesAdd] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddTask = () => {
    setLoading(true);
    axios
      .post(PostTask, {
        title: titleAdd,
        subject: desAdd,
      })
      .then((res) => {
        setLoading(false);
        console.log("resPost", res);
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
          <h6 className={style.titleModule}>Add a new task</h6>
          <input
            type="text"
            placeholder="Title"
            value={titleAdd}
            onChange={(e) => setTitleAdd(e.target.value)}
            className={style.moduleInput}
          />
          <textarea
            cols={10}
            rows={10}
            placeholder="Subject"
            value={desAdd}
            onChange={(e) => setDesAdd(e.target.value)}
            className={style.moduleArea}
          />
          <button
            className={style.addModButton}
            onClick={(e) => handleAddTask()}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
}
