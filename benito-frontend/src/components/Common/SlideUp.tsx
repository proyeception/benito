import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  children: ReactNode;
};

const variants = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: "100%",
  },
};

const SlideUp = (props: Props) => (
  <motion.div
    initial="out"
    animate="in"
    exit="out"
    className={props.className}
    variants={variants}
  >
    {props.children}
  </motion.div>
);

export default hot(module)(SlideUp);
