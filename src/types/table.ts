/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column<T> {
  key: keyof T | string;
  label: string;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  renderCell?: (row: T, helpers?: any) => React.ReactNode;
}
