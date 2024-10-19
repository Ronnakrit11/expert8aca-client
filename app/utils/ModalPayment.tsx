import React, { FC } from 'react'
import { Modal, Box } from "@mui/material";
import { MdClose } from "react-icons/md";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: any;
}

const ModalPayment: FC<Props> = ({ open, setOpen, children }) => {
  return (
    <Modal
      open={open}
      // onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={
        {
          '&.MuiModal-root': {
            zIndex: '800 !important'
          }
        }
      }

    >
      <Box
        className=" max-h-[100vh] overflow-auto absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 m-auto  bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"
      >
        <div className='w-full relative mb-2'>
          <MdClose onClick={() => setOpen(false)} className='text-black text-right absolute right-0 top-0 text-2xl' />
        </div>
        {children}
      </Box>
    </Modal>
  )
}

export default ModalPayment