import React from 'react';

const DynamicTable = ({ data }) => {
   const columnNames = Object?.keys(data[0] || {});

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {columnNames?.map((columnName, index) => (
            <th key={index}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnNames.map((columnName, colIndex) => (
              <td key={colIndex}>{row[columnName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
