import { useState } from "react";

const Test = ({ text, maxLength = 10 }) => {
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
    <Test text="This is a long text that needs to be collapsed initially. Click to expand and see the full content!" />
  );
}