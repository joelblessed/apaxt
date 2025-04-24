import React from "react";

const BoxList = () => {
  const boxes = ["Box 1", "Box 2", "Box 3", "Box 4", "Box 5"]; // Odd number of items

  return (
    <div style={styles.container}>
      {boxes.map((box, index) => (
        <div
          key={index}
          style={{
            ...styles.box,
            ...(index === boxes.length - 1 ? styles.lastBox : {}), // Apply style only to the last box
          }}
        >
          {box}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", // Centers boxes initially
    alignItems: "center",
    gap: "10px",
    maxWidth: "400px", // Prevents full width spread
    margin: "auto", // Centers the whole container
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  box: {
    width: "100px",
    height: "100px",
    backgroundColor: "teal",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
  lastBox: {
    marginLeft: "auto", // Pushes last box to the left
  },
};

export default BoxList