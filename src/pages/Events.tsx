/* eslint-disable @typescript-eslint/no-explicit-any */
import ModaDelete from "@/components/modal/ModaDelete";
import ModalAddEvent from "@/components/modal/ModalAddEvent";
import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import DataTableGrid from "@/components/ui/Table/DataTableGrid";
import { eventColumns } from "@/features/columns";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

const Events = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [isDelete, setIsDelete] = useState(false);

  const handleChangeEvent = (event?: Event) => {
    setOpen(true);
    setSelectedEvent(event);
  };

  const handleDelete = async (event?: Event) => {
    setIsDelete(true);
    setSelectedEvent(event);
    // try {
    //   const res = await fetch(`${import.meta.env.VITE_API}api/events/${id}`, {
    //     method: "DELETE",
    //   });

    //   if (!res.ok) {
    //     throw new Error("Delete failed");
    //   }
    // } catch {
    //   alert("Thêm thất bại");
    // }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API}api/events`);
      const data = await res.json();
      setEvents(data);
      setTotalCount(data.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [open, isDelete]);

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
        <DataTableGrid
          columns={eventColumns}
          rows={events}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          orderBy={orderBy}
          order={order}
          loading={loading}
          getRowId={(row) => row?.id ?? row.id}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onSortChange={(col, dir) => {
            setOrderBy(col);
            setOrder(dir);
          }}
          helpers={{
            onOpenModalEdit: (row: Event) => handleChangeEvent(row),
            onDelete: (row: Event) => handleDelete(row),
          }}
        />
      </div>
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        selectedData={selectedEvent}
      />
      <ModaDelete
        open={isDelete}
        setOpen={setIsDelete}
        selectedData={selectedEvent}
      />
    </div>
  );
};
export default Events;
