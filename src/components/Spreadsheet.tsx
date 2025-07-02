import React, { useMemo, useState } from 'react';
import {
  useTable,
  Column,
  HeaderGroup,
  Row,
  Cell,
  TableInstance,
} from 'react-table';

type DataType = {
  col1: string;
  col2: string;
};

export default function Spreadsheet() {
  const [data, setData] = useState<DataType[]>([
    { col1: 'Hello', col2: 'World' },
    { col1: 'React', col2: 'Table' },
  ]);

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
        Cell: ({ value, row, column }) => (
          <input
            className="w-full px-2 py-1 outline-none"
            value={value}
            onChange={e => handleCellChange(row.index, column.id, e.target.value)}
          />
        ),
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
        Cell: ({ value, row, column }) => (
          <input
            className="w-full px-2 py-1 outline-none"
            value={value}
            onChange={e => handleCellChange(row.index, column.id, e.target.value)}
          />
        ),
      },
    ],
    [data]
  );

  const handleCellChange = (rowIndex: number, columnId: string, value: string) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const tableInstance: TableInstance<DataType> = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="p-4">
      <table {...getTableProps()} className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          {headerGroups.map((headerGroup: HeaderGroup<DataType>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
  key={column.id}
  className="border border-gray-200 px-3 py-2 text-left"
>
  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: Row<DataType>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id} className="hover:bg-gray-50">
                {row.cells.map((cell: Cell<DataType>) => (
                  <td
                      {...cell.getCellProps()}
  key={cell.column.id}
  className="border border-gray-200 px-3 py-2 align-top"
>
  {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
