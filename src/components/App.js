import React from "react"
import ConwayGame from './ConwayGame';
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <p>Click a cell to bring it to life. Click again to make it dead. Click "Next" to produce the next generation of cells.</p>
      <p>Cells that are too lonely or too crowded will not survive to the next generation. Under the right conditions, a cell will come to life.</p>
      <ConwayGame size={30} />
    </div>
  );
}
