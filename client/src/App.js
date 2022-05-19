import React from "react";
import PageView from "./components/PageView";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <Router>
      <PageView />
    </Router>
  );
}

export default App;
