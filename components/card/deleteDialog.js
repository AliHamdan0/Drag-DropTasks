import Swal from "sweetalert2";
import { ModTask } from "../../helpers/endPoints";
import axios from "axios";
import { useState } from "react";
export function DeleteTask(id, setLoading) {
  const handleDelete = () => {
    setLoading(true);
    axios.delete(ModTask(id)).then((res) => {
      setLoading(false);
      console.log("deleEtask", res);
    });
  };
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire("Deleted!", "Your Task has been deleted.", "success");
      handleDelete();
    }
  });
}
