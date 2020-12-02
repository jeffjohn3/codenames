import React from "react";
import { css } from "emotion";

const CodenamesIcon = (props) => (
  <img
    src={`${process.env.prefix}/favicon.ico`}
    className={`${styles.spyIcon} ${props.className}`}
    style={props.style}
    width={40}
    alt="Codenames icon"
  />
);

export default CodenamesIcon;

const styles = {
  spyIcon: css({
    marginRight: 5,
  }),
};
