import React from "react";
import styles from "./index.module.css";

interface AudioCircleProps {
  isPlaying: boolean;
}

const AudioCircle: React.FC<AudioCircleProps> = ({ isPlaying }) => {
  return (
    <div className={`${styles.circle} ${isPlaying ? styles.playing : ""}`}>
      <div className={styles.innerCircle} />
    </div>
  );
};

export default AudioCircle;
