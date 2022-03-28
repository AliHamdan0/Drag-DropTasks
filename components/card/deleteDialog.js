import Swal from "sweetalert2";
import { ModTask } from "../../helpers/endPoints";
import axios from "axios";
export function DeleteTask(id, setLoading, refetch) {
  const handleDelete = () => {
    setLoading(true);
    axios.delete(ModTask(id)).then((res) => {
      setLoading(false);
      refetch();
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
      handleDelete();
    }
  });
}
