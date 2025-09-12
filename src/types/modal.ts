/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedData: any;
  setSelectedEvent?: React.Dispatch<React.SetStateAction<Event | undefined>>;
}
