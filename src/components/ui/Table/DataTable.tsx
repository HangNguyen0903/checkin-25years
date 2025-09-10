/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import { DataGrid, type Column } from "react-data-grid";
import "react-data-grid/lib/styles.css";


interface ReactTableGridCustomProps<T> {
  columns: CustomColumn<T>[];
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  setConfigPagination: Dispatch<SetStateAction<{ page: number; pageSize: number }>>; // bỏ Partial

  rowHeight?: number;
  onSelectedRowsChange?: (selected: Set<React.Key>) => void;
}

type CustomRenderCellProps<T> = {
  row: T;
  rowIdx: number;
};

export interface CustomColumn<T> extends Column<T> {
  renderCell?: (props: CustomRenderCellProps<T>) => React.ReactNode;
}

export default function ReactTableGridCustom<T>({
  columns,
  data,
  page,
  pageSize,
  total,
  setConfigPagination,
  rowHeight = 50,
  onSelectedRowsChange,
}: ReactTableGridCustomProps<T>) {


  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-4 ">
      <DataGrid
        // columns={[SelectColumn, ...enhancedColumns]}
        columns={columns}
        rows={data}
        rowHeight={rowHeight}
        className="rdg-light min-h-[700px] custom-grid"
        onSelectedRowsChange={onSelectedRowsChange}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>
          Trang {page} / {totalPages} (Tổng: {total})
        </span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={page <= 1}
            onClick={() =>
              setConfigPagination((prev) => ({
                ...prev,
                page: Math.max(1, (prev.page ?? 1) - 1),
              }))
            }
          >
            <ChevronLeft />
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={page >= totalPages}
            onClick={() =>
              setConfigPagination((prev) => ({
                ...prev,
                page: Math.min(totalPages, (prev.page ?? 1) + 1),
              }))
            }
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
