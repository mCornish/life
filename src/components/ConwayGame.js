import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
import MatrixGrid from './MatrixGrid';
import { Generation, nextGeneration } from '../modules/game';
import useInterval from '@use-it/interval';
import './ConwayGame.scss';

export default function ConwayGame({
  size: initialSize = 10
}) {
  const [cells, setCells] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    setCells(Generation(initialSize, initialSize));
    setSize(initialSize);
  }, [initialSize]);

  useInterval(playLoop, isPlaying ? 1000 : null)

  return (
    <div className="ConwayGame">
      <label htmlFor="size-control" className="size-control">
        <div>Size:</div>
        <input
          id="size-control"
          onChange={e => setGridSize(e.target.value)}
          value={size}
          type="number"
          max="100"
          min="1"
        />
      </label>

      <MatrixGrid
        matrix={cells}
        onClick={updateCell}
      />

      <div className="ConwayGame__buttons">
        <button onClick={next}>Next</button>
        <button onClick={clear}>Clear</button>
        <button onClick={random}>Random</button>
        <button
          onClick={isPlaying ? stop : play}
        >{isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    </div>
  );

  function clear() {
    setIsPlaying(false);
    setCells(Generation(size, size));
  }

  function next() {
    setIsPlaying(false);
    setCells(nextGeneration(cells));
  }

  function play() {
    playLoop();
    setIsPlaying(true);
  }

  function playLoop() {
    // if (!isPlaying) return undefined;
    const nextGen = nextGeneration(cells);
    setCells(nextGen);
    // setTimeout(() => playLoop(isPlaying, nextGen), 1000);
  }

  function random() {
    setCells(cells.map(cellRow => cellRow.map(randomIsAlive)));
  }
  
  function setGridSize(size) {
    stop();
    updateGrid(size);
    setSize(size);
  }

  function stop() {
    setIsPlaying(false);
  }

  function updateCell(row, column, isAlive) {
    let newCells = [...cells];
    newCells[row][column] = Number(isAlive);
    setCells(newCells);
  }
  
  function updateGrid(size) {
    setCells(Generation(size, size));
  }
}

ConwayGame.propTypes = {
  size: PropTypes.number
}

function randomIsAlive() {
  return Number(Math.random() > .5);
}
