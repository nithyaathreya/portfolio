import React from 'react';
import "./index.css";

export type Column<T> = {
  key: string;
  display: string;
  render: (a: T) => React.ReactNode | string,
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

function Table<T extends { id: number }>(props: Props<T>) {
  return (
    <div className="table-container">
      <table className='styled-table'>
        <thead>
          <tr className="header">
            {
              props.columns.map(h => (
                <th className='header' key={h.key}>{h.display}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.map(d => (
              <tr key={`article#-${d.id}`}>
                {props.columns.map(h => (
                  <td className='column' key={`col-${h.key}`}>
                    {h.render(d)}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table;
