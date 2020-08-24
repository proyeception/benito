import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

const FadeIn = (props: Props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className={props.className}
  >
    {props.children}
  </motion.div>
);

export default hot(module)(FadeIn);
