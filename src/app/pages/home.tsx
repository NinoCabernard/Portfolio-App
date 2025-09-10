import { useContext, useEffect, useState } from "react";
import type { Technology } from "~/model/technology";

export default function Home() {
  return (
    <section>
      <h2>Technologies</h2>
      <ul>
        {/* {technologies.map((tech, index) => (
          <li key={index}>
            <strong>{tech.name}</strong>
            {tech.description && <p>{tech.description}</p>}
          </li>
        ))} */}
      </ul>
    </section>
  );
}
