import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MatrixCell from './MatrixCell';
import './MatrixGrid.scss';

export default function MatrixGrid({
  matrix = [],
  onClick = () => {}
}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [cellBorderWidth, setCellBorderWidth] = useState(1);

  useEffect(() => {
    setHeight(matrix.length);
    setWidth(matrix.length ? matrix[0].length : 0);
  }, [matrix]);

  useLayoutEffect(() => {
    setCellBorderWidth(5 / Math.max(height, width));
  }, [height, width]);

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${height}, 1fr)`,
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        gridGap: `${5 / Math.min(width, height)}em`
      }}
    >
      {matrix.map((cellRow, row) => (
        cellRow.map((isAlive, column) => (
          <MatrixCell
            key={`${row}-${column}`}
            borderWidth={cellBorderWidth}
            isAlive={!!isAlive}
            onClick={() => onClick(row, column, !isAlive)}
          />
        ))
      ))}
    </div>
  );
}

MatrixGrid.propTypes = {
  matrix: PropTypes.array,
  onClick: PropTypes.func
}
