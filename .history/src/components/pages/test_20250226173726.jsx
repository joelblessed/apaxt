import React, { useState } from "react";

const Test = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value !== "other") {
      setCustomValue(""); // Reset input if another option is selected
    }
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  console.log(selectedValue)

  return (
    <div style={{maginT}}>
      <label>Select an option:</label>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="">-- Choose an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="other">Other</option>
      </select>

      {selectedValue === "other" && (
        <div>
          <input
            type="text"
            placeholder="Enter custom value"
            value={customValue}
            onChange={handleCustomInputChange}
          />
        </div>
      )}

      <p>Selected: {selectedValue === "other" ? customValue : selectedValue}</p>
    </div>
  );
};

export default Test;