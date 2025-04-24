import { useState } from "react";

const ShowMoreText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p>
        {isExpanded ? text : text.slice(0, maxLength) + "..."}
      </p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <ShowMoreText text="This is a long text that needs to be collapsed initially. Click to expand and see the full content!" />
  );
}