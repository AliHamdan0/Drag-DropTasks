import style from "../styles/detail.module.css";
import { TasksDetails } from "../../helpers/endPoints";
import { resetServerContext } from "react-beautiful-dnd";
function Detail({ data = "" }) {
  console.log("data details", data);
  return (
    <div>
      <h1 className={style.mainTitle}>Todo List</h1>
      <h4 className={style.subTitleDetail}>Task Details</h4>
      <div className={style.detailContentCont}>
        <div>
          <h6 className={style.detailSect}>Name</h6>
          <p className={style.detailCont}>namakafl kjddfjl fldkfj</p>
        </div>
        <div>
          <h6 className={style.detailSect}>Subject</h6>
          <p className={style.detailCont}>
            namakaflkj ddfjlf ldkfj namakaflkj ddfjlf ldkfj namakaflkj ddfjlf
            ldkfjnamakaflkj ddfjlf ldkfj
          </p>
        </div>
        <div>
          <h6 className={style.detailSect}>Status</h6>
          <p className={style.detailCont}>toDO</p>
        </div>
      </div>
      <button className={style.detailButton}>Back</button>
    </div>
  );
}
export default Detail;

// export async function getServerSideProps(context) {
//   resetServerContext();
//   const id = context.params.detail;
//   const res = await fetch(TasksDetails(id));
//   const data = await res.json();
//   return {
//     props: {
//       data: data || "",
//     },
//   };
// }
