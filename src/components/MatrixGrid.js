import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import './MatrixGrid.scss';

export default function MatrixGrid({
  matrix = [],
  onClick = () => {}
}) {
  const cellSize = matrix.length ? 500 / matrix.length : 0;
  const cellColor = '#390f70';
  const lineWidth = 1;
  const gapSize = cellSize * .3;
  const gridSize = ((cellSize + gapSize) * matrix.length) - gapSize + (lineWidth * 2);
  
  const element = useRef();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [changed, setChanged] = useState([]);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    setHeight(matrix.length);
    setWidth(matrix.length ? matrix[0].length : 0);
  }, [matrix]);

  useLayoutEffect(() => {
    const canvas = element.current;
    if (canvas.getContext) {
      const cellSpace = cellSize + gapSize;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, gridSize, gridSize);
      
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = cellColor;
      ctx.strokeStyle = cellColor;

      // Draw alive
      ctx.beginPath();
      matrix.forEach((cellRow, row) => {
        cellRow.forEach((isAlive, column) => {
          if (!isAlive) return undefined;
          const radius = cellSize / 2;
          const x = (cellSpace * column) + radius + lineWidth;
          const y = (cellSpace * row) + radius + lineWidth;

          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, cellSize / 2, 0, 2 * Math.PI);
        });
      });
      ctx.closePath();
      ctx.fill();

      // Draw dead
      ctx.beginPath();
      matrix.forEach((cellRow, row) => {
        cellRow.forEach((isAlive, column) => {
          if (isAlive) return undefined;
          const radius = cellSize / 2;
          const x = (cellSpace * column) + radius + lineWidth;
          const y = (cellSpace * row) + radius + lineWidth;

          ctx.moveTo(x + radius, y);
          ctx.arc(x, y, cellSize / 2, 0, 2 * Math.PI);
        });
      });
      ctx.closePath();
      ctx.stroke();
    }
  }, [cellSize, cellColor, gapSize, gridSize, height, lineWidth, matrix, width]);

  return (
    <canvas
      ref={element}
      role="grid"
      width={gridSize}
      height={gridSize}
      onClick={toggleCell}
      onMouseDown={() => setMouseIsDown(true)}
      onMouseMove={checkToggle}
      onMouseUp={() => handleMouseUp()}
      alt="Matrix grid"
    />
  );

  function checkToggle(e) {
    if (!mouseIsDown) return undefined;

    const elementRect = element.current.getBoundingClientRect();
    const elementX = elementRect.left;
    const elementY = elementRect.top;
    const x = e.clientX - elementX;
    const y = e.clientY - elementY;

    const cell = positionCell(x, y);
    if (isSelectedCell(cell) || wasChanged(cell)) return undefined;

    setSelectedCell(cell);
    setChanged(uniqBy([...changed, cell], 'key'));
    onClick(cell.x, cell.y, !cell.isAlive);
  }

  function handleMouseUp() {
    setMouseIsDown(false);
    setChanged([]);
  }

  function isSelectedCell(cell) {
    return selectedCell && selectedCell.isCell(cell);
  }

  function toggleCell(e) {
    const elementRect = element.current.getBoundingClientRect();
    const elementX = elementRect.left;
    const elementY = elementRect.top;
    const x = e.clientX - elementX;
    const y = e.clientY - elementY;

    const cell = positionCell(x, y);
    if (!isSelectedCell(cell)) onClick(cell.x, cell.y, !cell.isAlive);
  }

  function positionCell(x, y) {
    const cellSpace = cellSize + gapSize;
    const cellX = Math.floor((y + (gapSize / 2)) / cellSpace);
    const cellY = Math.floor((x + (gapSize / 2)) / cellSpace);

    return Cell({
      x: cellX,
      y: cellY,
      isAlive: matrix[cellX][cellY]
    });
  }

  function wasChanged(cell) {
    return changed.find(({x, y}) => x === cell.x && y === cell.y);
  }
}

MatrixGrid.propTypes = {
  matrix: PropTypes.array,
  onClick: PropTypes.func
}

function Cell({x, y, isAlive}) {
  return {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get isAlive() {
      return isAlive;
    },
    get key() {
      return `${x}-${y}`;
    },
    isCell(cell) {
      return cell.x === x && cell.y === y;
    }
  };
}
