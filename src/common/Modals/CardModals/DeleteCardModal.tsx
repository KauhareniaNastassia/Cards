import React from 'react'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type DeleteCardModalPropsType = {
  title: string
  question: string
  cardQuestionImg: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  deleteItem: () => void
}

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
  const deletePackButtonHandler = () => {
    props.deleteItem()
    props.toggleOpenMode(false)
  }

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
  }

  return (
    <BasicModal
      title={props.title}
      open={props.open}
      toggleOpenMode={props.toggleOpenMode}
      onCloseModal={onCloseModalHandler}
    >
      {props.cardQuestionImg ? (
        <>
          <p>Do you really want to remove?</p>
          <img style={{ maxWidth: '105px' }} src={props.cardQuestionImg} alt={'question image'} />
        </>
      ) : (
        <>
          Do you really want to remove <b>{props.question}</b>?
        </>
      )}

      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={deletePackButtonHandler}
        actionButtonTitle={'Delete'}
      />
    </BasicModal>
  )
}
