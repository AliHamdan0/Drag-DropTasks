import Swal from "sweetalert2";
import { DeleteT } from "../../helpers/endPoints";
import axios from "axios";
import { useState } from "react";
export default function DeleteTask(props) {
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    axios.delete(DeleteT, {}).then((res) => {
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
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      handleDelete();
    }
  });
}
