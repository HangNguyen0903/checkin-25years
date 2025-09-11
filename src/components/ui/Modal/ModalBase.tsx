import React, { type ReactNode } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { CircleX } from "lucide-react";

interface BaseModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  title,
  onClose,
  children,
  width = 500,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="base-modal-title"
      aria-describedby="base-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "12px",
          width,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="bg-[#0B4D8D] text-white py-2 px-4"
        >
          {title && (
            <Typography id="base-modal-title" fontWeight="">
              {title}
            </Typography>
          )}
          <IconButton onClick={onClose}>
            <CircleX color="white" />
          </IconButton>
        </Box>
        <Box id="base-modal-description" className="px-4 py-2">
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default BaseModal;
