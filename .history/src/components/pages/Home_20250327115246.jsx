import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ brands, categories }) => {
  const boxesPerPage = 8;
  const catboxesPerPage = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [catstartIndex, setCatStartIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (box) => {
    navigate(/brand/${box});
  };

  const nextBoxes = () => {
    if (startIndex + boxesPerPage < brands.length) {
      setStartIndex(startIndex + boxesPerPage);
    }
  };

  const prevBoxes = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - boxesPerPage);
    }
  };

  const CathandleClick = (category) => {
    navigate(/category/${category});
  };

  const CatnextBoxes = () => {
    if (catstartIndex + catboxesPerPage < categories.length) {
      setCatStartIndex(catstartIndex + catboxesPerPage);
    }
  };

  const CatprevBoxes = () => {
    if (catstartIndex > 0) {
      setCatStartIndex(catstartIndex - catboxesPerPage);
    }
  };

  return (
    <>
      {/* Brand Scrolling */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {startIndex > 0 && (
          <button
            onClick={prevBoxes}
            style={{ padding: "10px", cursor: "pointer", background: "orange", border: "none" }}
          >
            less
          </button>
        )}

        <div style={{ overflow: "hidden", width: "1300px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              transform: `translateX(-${startIndex * 110}px),
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {brands.map((box, index) => (
              <div
                key={index}
                style={{
                  width: "150px",
                  height: "150px",
                  background: "lightblue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleClick(box)}
              >
                <span style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>{box}</span>
              </div>
            ))}
          </div>
        </div>

        {startIndex + boxesPerPage < brands.length && (
          <button
            onClick={nextBoxes}
            style={{ padding: "10px", cursor: "pointer", background: "orange", border: "none" }}
          >
            more
          </button>
        )}
      </div>

      {/* Category Scrolling */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {catstartIndex > 0 && (
          <button
            onClick={CatprevBoxes}
            style={{ padding: "10px", cursor: "pointer", background: "orange", border: "none" }}
          >
            less
          </button>
        )}

        <div style={{ overflow: "hidden", width: "1300px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              transform: `translateX(-${catstartIndex * 110}px)`, // Fixed scrolling issue
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  width: "150px",
                  height: "150px",
                  background: "lightblue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
                onClick={() => CathandleClick(category)}
              >
                <span style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {catstartIndex + catboxesPerPage < categories.length && (
          <button
            onClick={CatnextBoxes}
            style={{ padding: "10px", cursor: "pointer", background: "orange", border: "none" }}
          >
            more
          </button>
        )}
      </div>
    </>
  );
};

export default Home;