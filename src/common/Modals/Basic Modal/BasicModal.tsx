import * as React from 'react'
import { ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import s from './BasicModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

type BasicModalPropsType = {
  children: ReactNode
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  onCloseModal?: () => void
}

export function BasicModal(props: BasicModalPropsType) {
  const handleClose = () => {
    props.toggleOpenMode(false)
  }

  const modalClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
  }

  return (
    <div onClick={modalClickHandler}>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={s.header}>
            <h2 className={s.title}>{props.title}</h2>
            <IconButton onClick={handleClose} className={s.closeBtn}>
              <CloseIcon color="primary" />
            </IconButton>
          </div>
          <hr className={s.line} />
          <div className={s.children}>{props.children}</div>
        </Box>
      </Modal>
    </div>
  )
}
