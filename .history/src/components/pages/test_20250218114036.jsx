import React from "react";
import { motion } from "framer-motion";

const Test = () => {
  return (
    <div>
      {/* Animate on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }} // Animate only once
        style={{ margin: "50px 0", padding: "20px", background: "#f0f0f0" }}
      >
        <h1>Animate Me with Framer Motion!</h1>
      </motion.div>

      {/* Another element */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ margin: "50px 0", padding: "20px", background: "#f0f0f0" }}
      >
        <p>Another element to animate.</p>
      </motion.div>
    </div>
  );
};

export default Test