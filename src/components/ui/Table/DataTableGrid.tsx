/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BaseTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import type { Column } from "../../../types/table";
import NoData from "@/components/NoData";

interface BaseTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string | number | undefined;
  rowsPerPageOptions?: number[];
  helpers?: Record<string, any>;
  totalCount?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  loading?: boolean;
  page: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange?: (column: string, direction: "asc" | "desc") => void;
  rowsPerPage: number;
}

export default function DataTableGrid<T>({
  columns,
  rows,
  // getRowId,
  totalCount,
  page,
  rowsPerPage,
  orderBy,
  order,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  helpers,
}: BaseTableProps<T>) {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  // const [orderBy, setOrderBy] = useState<string>("");
  // const [order, setOrder] = useState<"asc" | "desc">("asc");

  // const handleSort = (column: Column<T>) => {
  //   if (!column.sortable) return;
  //   const isAsc = orderBy === column.key && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(column.key as string);
  // };

  // const sortedRows = React.useMemo(() => {
  //   if (!orderBy) return rows;
  //   return [...rows].sort((a: any, b: any) => {
  //     if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
  //     if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // }, [rows, orderBy, order]);

  // const handleChangePage = (_: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const paginatedRows = sortedRows.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    const isAsc = orderBy === column.key && order === "asc";
    onSortChange?.(column.key as string, isAsc ? "desc" : "asc");
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        borderRadius: "12px",
      }}
    >
      {loading ? (
        <div className="p-6 text-center">
          <div className="space-y-2">
            <CircularProgress />
            <p> Đang tải dữ liệu...</p>
          </div>
        </div>
      ) : rows?.length > 0 ? (
        <>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ width: 80, background: "#f9fafb" }}
                  >
                    STT
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key as string}
                      align={col.align || "left"}
                      style={{ width: col.minWidth }}
                      sx={{ background: "#f9fafb" }}
                    >
                      {col.sortable ? (
                        <TableSortLabel
                          active={orderBy === col.key}
                          direction={orderBy === col.key ? order : "asc"}
                          onClick={() => handleSort(col)}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell align="center">
                      {page * rowsPerPage + rowIndex + 1}
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell
                        key={col.key as string}
                        align={col.align || "left"}
                      >
                        {col.renderCell
                          ? col.renderCell(row, helpers)
                          : (row as any)[col.key] ?? "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableBody>
                {paginatedRows.length > 0 ? (
                  paginatedRows.map((row, rowIndex) => (
                    <TableRow key={getRowId(row)}>
                      <TableCell align="center">
                        {page * rowsPerPage + rowIndex + 1}
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key as string}
                          align={col.align || "left"}
                        >
                          {col.renderCell
                            ? col.renderCell(row, helpers)
                            : (row as any)[col.key] ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody> */}
            </Table>
          </TableContainer>
          {/* <TablePagination
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <TablePagination
            component="div"
            count={totalCount ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={(_, newPage) => onPageChange(newPage)}
            onRowsPerPageChange={(e) =>
              onRowsPerPageChange(parseInt(e.target.value, 10))
            }
          />
        </>
      ) : (
        <NoData />
      )}
    </Paper>
  );
}
