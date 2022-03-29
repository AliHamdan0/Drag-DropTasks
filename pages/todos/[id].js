import style from "../../styles/detail.module.css";
import { TasksDetails, Tasks } from "../../helpers/endPoints";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomLoader from "../../components/customLoader";
import Head from "next/head";
function Detail({ data }) {
  const Router = useRouter();
  if (Router.isFallback)
    return (
      <div className="loaderContainer">
        <CustomLoader />
      </div>
    );
  return (
    <div>
      <Head>
        <title>Task Details</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Tasks Details" />
        <meta name="keywords" content="React, Next, JavaScript" />
      </Head>
      <h1 className={style.mainTitle}>Todo List</h1>
      <div className={style.detailParCont}>
        <h4 className={style.subTitleDetail}>Task Details</h4>
        <div className={style.detailContentCont}>
          <div style={{ marginBottom: "30px" }}>
            <h6 className={style.detailSect}>Name</h6>
            <p className={style.detailCont}>{data?.title}</p>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <h6 className={style.detailSect}>Subject</h6>
            <p className={style.detailCont}>{data?.subject}</p>
          </div>
          <div>
            <h6 className={style.detailSect}>Status</h6>
            <p className={style.detailCont}>
              <Typography
                variant="body2"
                component="span"
                className={style.spanTask}
                sx={{
                  backgroundColor:
                    data?.status == "todo"
                      ? "#F66568"
                      : data?.status == "doing"
                      ? "#FFC773"
                      : data?.status == "done"
                      ? "#6BE795"
                      : "#7389FF",
                }}
              ></Typography>
              {data?.status}
            </p>
          </div>
        </div>
        <button className={style.detailButton} onClick={() => Router.push("/")}>
          Back
        </button>
      </div>
    </div>
  );
}
export default Detail;

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(TasksDetails(id));
  const data = await res.json();
  return {
    props: {
      data: data || "",
    },
    revalidate: 60 * 60 * 24, //Every day we update the information on server by rebuilding
  };
}
export async function getStaticPaths() {
  const res = await fetch(Tasks);
  const tasks = await res.json();

  const paths = tasks.map((task) => ({
    params: { id: task._id },
  }));
  return { paths, fallback: true };
}
