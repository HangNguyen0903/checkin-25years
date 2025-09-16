import { seatColumns } from "@/features/columns";
import DataTableGrid from "../components/ui/Table/DataTableGrid";
import InputField from "@/components/ui/Input/InputField";
import ButtonField from "@/components/ui/Button/ButtonField";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ModalAddSeat from "@/components/modal/ModalAddSeat";
import { type Seat } from "@/types/seats";
import Select from "@/components/ui/Select/SelectField";
import { getSeats } from "@/services/seatService";
import { toast } from "react-toastify";
import { getEvents } from "@/services/eventService";
import type { Event } from "@/types/events";

const Seats = () => {
  const [modal, setModal] = useState<{
    type: string | null;
    data?: Seat;
  }>({ type: null, data: undefined });
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [filter, setFilter] = useState({
    page: 0,
    rowsPerPage: 10,
    orderBy: undefined as string | undefined,
    order: "asc" as "asc" | "desc",
    seat: "",
    anniversaryEventId: "",
  });
  const [totalCount, setTotalCount] = useState(0);
  const [listEvents, setListEvents] = useState<Event[]>([]);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const data = await getSeats(filter);
      setSeats(data);
      setTotalCount(data.length);
    } catch {
      toast.error("Không thể tải danh sách vị trí!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const listEvents = await getEvents();
        setListEvents(listEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleCloseModal = () => setModal({ type: null, data: undefined });
  const handleOpenModal = (type: string, data?: Seat) =>
    setModal({ type, data });

  return (
    <div className="bg-white shadow border border-gray-100 rounded-lg">
      <div className="border-b-1 border-gray-300">
        <div className="flex justify-between items-start p-4">
          <div className="flex gap-2">
            <InputField
              placeholder="Nhập Tên vị trí, Mã vị trí"
              width="lg:w-[250px]"
            />
            <Select
              options={listEvents.map((ev) => ({
                label: ev?.name,
                value: ev?.id,
              }))}
              placeholder="Chọn sự kiện"
              onChange={(val) => {
                console.log("Bạn vừa chọn sự kiện:", val);
              }}
            />
            <ButtonField
              type="button"
              color="primary"
              text="Tìm kiếm"
              onClick={fetchSeats}
            />
            <ButtonField
              type="button"
              color="danger"
              text="Reset"
              icon={<RefreshCcw size={16} />}
            />
          </div>
          <div className="">
            <ButtonField
              type="button"
              color="primary"
              text="Thêm mới"
              icon={<Plus size={14} />}
              onClick={() => handleOpenModal("add")}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <DataTableGrid
          columns={seatColumns}
          rows={seats}
          getRowId={(row) => row.code}
          totalCount={totalCount}
          rowsPerPage={filter?.rowsPerPage}
          orderBy={filter?.orderBy}
          order={filter?.order}
          loading={loading}
          onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
          onRowsPerPageChange={(rowsPerPage) =>
            setFilter((prev) => ({ ...prev, rowsPerPage }))
          }
          onSortChange={(col, dir) =>
            setFilter((prev) => ({ ...prev, orderBy: col, order: dir }))
          }
          page={filter?.page}
          helpers={{
            onOpenModalEdit: (row: Seat) => handleOpenModal("edit", row),
            onDelete: (row: Seat) => handleOpenModal("delete", row),
          }}
        />
      </div>
      {["add", "edit"].includes(modal.type!) && (
        <ModalAddSeat
          open={!!modal.type}
          setOpen={handleCloseModal}
          selectedData={modal.data}
          onSuccess={fetchSeats}
        />
      )}
    </div>
  );
};
export default Seats;
