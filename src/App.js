import React from "react";
import "./App.css";
import { Ratio } from "./Ratio";

function App() {
  return (
    <Ratio>
      {(width, height, hasComputed) =>
        hasComputed ? (
          <span>
            width: {width}, height: {height}
          </span>
        ) : <span>Not ready.</span>
      }
    </Ratio>
  );
}

export default App;
