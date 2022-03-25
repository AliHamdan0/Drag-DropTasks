import Head from "next/head";
import style from "../styles/Home.module.css";
import Card from "../components/card/card";
export default function Home() {
  return (
    <div>
      <h1 className={style.mainTitle}>Todo List</h1>
      <Card bcolor="#F66568" />
    </div>
  );
}
