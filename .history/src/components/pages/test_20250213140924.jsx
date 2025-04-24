import React from "react";

const Test = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>Box 1</div>
      <div style={styles.box}>Box 2</div>
      <div style={styles.box}>Box 3</div>
      <div style={styles.box}>Box 3</div>
      <div style={styles.box}>Box 3</div>
      v
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start", // Aligns boxes to the left edge
    alignItems: "center", // Centers vertically
    height: "100vh", // Full viewport height
    backgroundColor: "#f4f4f4",
    paddingLeft: "0", // Ensures boxes start exactly from the edge
  },
  box: {
    width: "100px",
    height: "100px",
    backgroundColor: "teal",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px", // Space between boxes
    borderRadius: "8px",
  },
};

export default Test;