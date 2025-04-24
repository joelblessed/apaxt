import { useState } from "react";

const Home = ({brands}) => {
  const boxes = Array.from({ length: 15 }, (_, i) => `Box ${i + 1``; // 15 boxes
  const [startIndex, setStartIndex] = useState(0);
  const boxesPerPage = 5;

  const nextBoxes = () => {
    setStartIndex((prev) => (prev + boxesPerPage) % boxes.length);
  };

  const prevBoxes = () => {
    setStartIndex((prev) =>
      prev - boxesPerPage < 0 ? boxes.length - boxesPerPage : prev - boxesPerPage
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={prevBoxes}>⬅ Previous</button>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px" }}>
        {boxes.slice(startIndex, startIndex + boxesPerPage).map((box, index) => (
          <div key={index} style={{
            width: "100px",
            height: "100px",
            background: "lightblue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
          }}>
            {box}
          </div>
        ))}
      </div>

      <button onClick={nextBoxes}>Next ➡</button>
    </div>
  );
};

export default Home;