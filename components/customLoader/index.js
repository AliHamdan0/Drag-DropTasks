import classes from "../../styles/loader.module.css";

const CustomLoader = () => {
  return (
    <div className={classes.container}>
      <div className={`${classes.dot} ${classes.uno}`}></div>
      <div className={`${classes.dot} ${classes.dos}`}></div>
      <div className={`${classes.dot} ${classes.tres}`}></div>
      <div className={classes.center}></div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default CustomLoader;
