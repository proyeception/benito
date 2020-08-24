import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

const SlideIn = (props: Props) => (
  <motion.div
    initial={{ x: 150, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
  >
    {props.children}
  </motion.div>
);

export default hot(module)(SlideIn);
