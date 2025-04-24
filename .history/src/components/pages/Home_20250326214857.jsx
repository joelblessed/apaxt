import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Home = ({brands, }) => {
  const boxes = Array.from({ length: 15 }, (_, i) => `Box ${i + 1}`); // 15 boxes
  const boxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleClick = (box) =>{
    navigate(`/brand/${box}`);
  }

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

  return (
    <div style={{ textAlign: "center",background:"", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      
      {/* Hide "Previous" button when at the start */}
      {startIndex > 0 && (
        <button onClick={prevBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none" }}>less</button>
      )}

      <div style={{ overflow: "hidden", width: "1300px" ,background:"" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: `translateX(-${startIndex * 110}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {brands.map((box, index) => (
            <div key={index} style={{
              width: "150px",
              height: "150px",
              background: "lightblue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              flexShrink: 0,
             
            }}>
              <label style={{fontWeight:"bold", fontSize:"50px", color:"white"}} onClick={()=>{handleClick(box);}}>{box}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Hide "Next" button when at the end */}
      {startIndex + boxesPerPage < boxes.length && (
        <button onClick={nextBoxes} style={{ padding: "10px", cursor: "pointer", background:"orange", border:"none"  }}>more</button>
      )}

    </div>
  );
};

export default Home;