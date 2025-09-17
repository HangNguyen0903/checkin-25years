/* eslint-disable @typescript-eslint/no-explicit-any */
import ModaDelete from "@/components/modal/ModaDelete";
import ModalAddEvent from "@/components/modal/ModalAddEvent";
import ButtonField from "@/components/ui/Button/ButtonField";
import InputField from "@/components/ui/Input/InputField";
import DataTableGrid from "@/components/ui/Table/DataTableGrid";
import { eventColumns } from "@/features/columns";
import { getEvents } from "@/services/eventService";
import type { Event } from "@/types/events";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Events = () => {
  const [filter, setFilter] = useState({
    page: 0,
    rowsPerPage: 10,
    orderBy: undefined as string | undefined,
    order: "asc" as "asc" | "desc",
    name: "",
  });
  const [modal, setModal] = useState<{
    type: string | null;
    data?: Event;
  }>({ type: null, data: undefined });
  const [events, setEvents] = useState<Event[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => setModal({ type: null, data: undefined });
  const handleOpenModal = (type: string, data?: Event) =>
    setModal({ type, data });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents(filter);
      setEvents(data);
      setTotalCount(data.length);
    } catch {
      toast.error("Không thể tải danh sách sự kiện!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  return (
    <div className="bg-white shadow border border-gray-100 rounded-lg">
      <div className="border-b-1 border-gray-300">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <InputField
              placeholder="Tên sự kiện"
              value={filter.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter((prev) => ({ ...prev, name: e.target.value }))
              }
              rightIcon={
                filter.name && (
                  <X
                    size={14}
                    onClick={() => setFilter((prev) => ({ ...prev, name: "" }))}
                  />
                )
              }
            />
            <ButtonField
              type="button"
              color="primary"
              text="Tìm kiếm"
              onClick={fetchEvents}
            />
          </div>
          <div>
            <ButtonField
              type="button"
              color="primary"
              text="Thêm mới"
              icon={<Plus size={14} />}
              // onClick={() => handleChangeEvent()}
              onClick={() => handleOpenModal("add")}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <DataTableGrid
          columns={eventColumns}
          rows={events}
          totalCount={totalCount}
          page={filter?.page}
          rowsPerPage={filter?.rowsPerPage}
          orderBy={filter?.orderBy}
          order={filter?.order}
          loading={loading}
          getRowId={(row) => row?.id ?? row.id}
          onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
          onRowsPerPageChange={(rowsPerPage) =>
            setFilter((prev) => ({ ...prev, rowsPerPage }))
          }
          onSortChange={(col, dir) =>
            setFilter((prev) => ({ ...prev, orderBy: col, order: dir }))
          }
          helpers={{
            onOpenModalEdit: (row: Event) => handleOpenModal("edit", row),
            onDelete: (row: Event) => handleOpenModal("delete", row),
          }}
        />
      </div>
      {["add", "edit"].includes(modal.type!) && (
        <ModalAddEvent
          open={!!modal.type}
          setOpen={handleCloseModal}
          // selectedData={selectedEvent}
          selectedData={modal.data}
          onSuccess={fetchEvents}
        />
      )}
      {modal.type === "delete" && (
        <ModaDelete
          open={!!modal.type}
          setOpen={handleCloseModal}
          // selectedData={selectedEvent}
          selectedData={modal.data}
          onSuccess={fetchEvents}
        />
      )}
    </div>
  );
};
export default Events;
