import { useState } from "react";

const Home = ({brands}) => {
  const boxes = Array.from({ length: 15 }, (_, i) => `Box ${i + 1}`); // 15 boxes
  const boxesPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);

  const nextBoxes = () => {
    if (startIndex + boxesPerPage < boxes.length) {
      setStartIndex(startIndex + boxesPerPage);
    }
  };

  const prevBoxes = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - boxesPerPage);
    }
  };

  return (<div style>
    <div style={{ textAlign: "center", marginTop: "20px" ,background:"green" ,width:"1150px", display:"flex"}}>
      {/* Hide "Previous" button at the start */}
      {startIndex > 0 && <button onClick={prevBoxes}>⬅ Previous</button>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "0px",
          overflow: "hidden",
          width: "1000px", // 5 boxes * 110px (100px box + 10px gap)
          marginInline: "auto",
          background:"red"
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: `translateX(-${startIndex * 110}px)`, // Moves the boxes
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {brands.map((box, index) => (
            <div
              key={index}
              style={{
                width: "100px",
                height: "100px",
                background: "lightblue",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                flexShrink: 0,
              }}
            >
              {box}
            </div>
          ))}
        </div>
      </div>

      {/* Hide "Next" button at the end */}
      {startIndex + boxesPerPage < boxes.length && <button onClick={nextBoxes}>Next ➡</button>}
    </div>
    </div>
  );
};

export default Home;