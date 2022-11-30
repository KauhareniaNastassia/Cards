import React from 'react'

import { Button } from '@mui/material'

import s from './ButtonBlockForModuls.module.css'

type ButtonBlockForModalsPropsType = {
  onCloseModalHandler: () => void
  actionButtonTitle: string
  actionButtonHandler: () => void
}

export const ButtonBlockForModals = (props: ButtonBlockForModalsPropsType) => {
  return (
    <div className={s.btnWrapper}>
      <Button
        variant="outlined"
        style={{ borderRadius: '20px' }}
        className={s.btn}
        onClick={props.onCloseModalHandler}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        style={{ borderRadius: '20px', width: '100px' }}
        className={s.btn}
        onClick={props.actionButtonHandler}
      >
        {props.actionButtonTitle}
      </Button>
    </div>
  )
}
