import React from 'react';
import PropTypes from 'prop-types';

import styles from './table.scss';

const renderCellText = cell => {
  return typeof cell === 'object' ? cell.value : cell;
};

const getCssClasses = cell =>
  typeof cell === 'object' && cell.noBottomBorder
    ? `${styles.cell} ${styles['no-bottom-border']}`
    : styles.cell;

const Table = ({config: {headings, body, columnsWidth}}) => {
  return (
    <table
      className={styles.table}
      style={{width: '100%', tableLayout: columnsWidth ? 'fixed' : 'auto'}}>
      {columnsWidth &&
        <colgroup>
          {columnsWidth.map((width, i) => <col key={i} span="1" style={{width}}/>)}
        </colgroup>
      }
      {headings && <thead>
        <tr>{headings.map((cell, i) =>
          <th
            key={i}
            style={cell.style ? cell.style : null}
            className={`${styles.heading} ${getCssClasses(cell)}`}>
            {renderCellText(cell)}
          </th>)}
        </tr>
      </thead>}
      <tbody>
        {body.map((row, i) =>
          <tr key={i}>
            {
              row.map((cell, i) =>
                <td
                  key={i}
                  style={cell.style ? cell.style : null}
                  className={getCssClasses(cell)}>
                  {renderCellText(cell)}</td>)
            }
          </tr>
        )}
      </tbody>
    </table>
  );
};

const cellPropsType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    value: PropTypes.any,
    hasBorderBottom: PropTypes.boolean
  })
]);

Table.propTypes = {
  config: PropTypes.shape({
    headings: PropTypes.arrayOf(cellPropsType),
    body: PropTypes.arrayOf(PropTypes.arrayOf(cellPropsType)),
    columnsWidth: PropTypes.arrayOf(PropTypes.string)
  })
};

export default Table;
