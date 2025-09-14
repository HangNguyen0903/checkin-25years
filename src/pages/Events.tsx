/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalAddEvent from "@/components/modal/ModalAddEvent";
import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import DataTableGrid from "@/components/ui/Table/DataTableGrid";
import { eventColumns } from "@/features/columns";
import { events } from "@/mockData/guest";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const Events = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  //  const [events, setEvents] = useState<Event[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleChangeEvent = (event?: Event) => {
    setOpen(true);
    setSelectedEvent(event);
  };

  // const handleDelete = (id: string) => {
  //   console.log(`Xóa thành công ${id}`);
  // };

  //   const fetchEvents = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`/api/events?page=${page}&limit=${rowsPerPage}&orderBy=${orderBy}&order=${order}`);
  //     const data = await res.json();
  //     setEvents(data.items);
  //     setTotalCount(data.total);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, [page, rowsPerPage, orderBy, order]);

  return (
    <div className="bg-white shadow border border-gray-100 rounded-lg">
      <div className="border-b-1 border-gray-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <InputField
              placeholder="Tên sự kiện"
              leftIcon={<Search size={14} />}
            />
            <ButtonField type="button" color="primary" text="Tìm kiếm" />
          </div>
          <div>
            <ButtonField
              type="button"
              color="primary"
              text="Thêm mới"
              icon={<Plus size={14} />}
              onClick={() => handleChangeEvent()}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* <DataTableGrid
          columns={eventColumns}
          rows={events}
          getRowId={(row) => row.id}
          helpers={{
            onOpenModalEdit: (row: Event) => handleChangeEvent(row),
            onDelete: (id: string) => handleDelete(id),
          }}
        /> */}
        <DataTableGrid
          columns={eventColumns}
          rows={events}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          orderBy={orderBy}
          order={order}
          loading={loading}
          getRowId={(row) => row.id}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onSortChange={(col, dir) => {
            setOrderBy(col);
            setOrder(dir);
          }}
          helpers={{
            onOpenModalEdit: (row: Event) => handleChangeEvent(row),
            onDelete: (id: string) => console.log(`Xóa thành công ${id}`),
          }}
        />
      </div>
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        selectedData={selectedEvent}
      />
    </div>
  );
};
export default Events;
