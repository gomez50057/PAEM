"use client";
import { useState } from "react";
import styles from "./BlogHeader.module.css";

const BlogHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { name: "Iceland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/qCkd9jS/img1.jpg" },
    { name: "Finland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/jrRb11q/img2.jpg" },
    { name: "Australia", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/NSwVv8D/img3.jpg" },
    { name: "Netherlands", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/RNkk6L0/img6.jpg" },
    { name: "Ireland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/Bq4Q0M8/img4.jpg" }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getNextIndex = (index, offset) => {
    return (index + offset) % items.length;
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${items[activeIndex].bg})` }}
    >
      <div className={styles.content}>
        <div className={styles.name}>{items[activeIndex].name}</div>
        <div className={styles.des}>{items[activeIndex].des}</div>
        <button>See More</button>
      </div>

      <div className={styles.previewContainer}>
        {/* Preview of upcoming images displayed horizontally */}
        {Array(2)
          .fill(null)
          .map((_, offset) => {
            const nextIndex = getNextIndex(activeIndex, offset + 1);
            return (
              <div
                key={nextIndex}
                className={styles.previewItem}
                style={{ backgroundImage: `url(${items[nextIndex].bg})` }}
              ></div>
            );
          })}
      </div>

      <div className={styles.button}>
        <button className={styles.prevButton} onClick={handlePrev}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogHeader;
