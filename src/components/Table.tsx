import React, { useMemo, useState } from "react";
import { tw } from "twind";
import styled from "styled-components";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { COLUMNS } from "../functions/table_data";
import { Stock } from "../types/Stock";
import "../styles/table.css";

const Table = ({ data }: { data: Stock[] }) => {
  const columns = useMemo<ColumnDef<Stock>[]>(() => COLUMNS, undefined);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  const Th = styled.th`
    background-color: inherit;
    padding: 0.5em;
  `;

  const Td = styled.td`
    padding: 0.5em;
  `;

  const FirstCol = styled.td`
    padding: 0 0 0 1em;
    &:hover {
      cursor: pointer;
    }
  `;
  const toggleExpansion = (index: number) => {
    if (expandedRowIndex === index) {
      setExpandedRowIndex(null);
    } else {
      setExpandedRowIndex(index);
    }
  };

  const ExpandableTableRow = ({
    row,
    isExpanded,
    toggleExpansion,
  }: {
    row: any;
    isExpanded: boolean;
    toggleExpansion: Function;
  }) => {
    return (
      <React.Fragment>
        <tr key={row.id}>
          <FirstCol onClick={() => toggleExpansion(row.id)}>{">"}</FirstCol>
          {row.getVisibleCells().map((cell: any) => {
            return (
              <td key={cell.id} style={{ height: "40px", overflow: "hidden" }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
        {isExpanded && (
          <tr>
            <td colSpan={11}>
              <table>
                <thead>
                  <tr>
                    {[
                      "年内高値",
                      "年内低値",
                      "倍率",
                      "差引",
                      "配当落",
                      "逆日歩",
                      "配当",
                    ].map((header) => {
                      return <Th>{header}</Th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {[
                      "year_high",
                      "year_low",
                      "margin_ratio",
                      "subtraction",
                      "dividend_date",
                      "reverse_daily_rate",
                      "share",
                    ].map((idx) => (
                      <Td>{row.original[idx]}</Td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th></th>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? tw`cursor-pointer select-none`
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <ExpandableTableRow
                key={row.id}
                row={row}
                isExpanded={expandedRowIndex === index}
                toggleExpansion={() => toggleExpansion(index)}
              />
            );
          })}
        </tbody>
      </table>
      <div className="pageBtn">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <div id="pageSizeOpt">
          <span>行を表示</span>
          <select
            id="pageSizeSelect"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[100, 150].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Table;
