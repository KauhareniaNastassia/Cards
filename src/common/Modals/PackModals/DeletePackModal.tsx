import { Button } from '@mui/material'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type DeleteModalPropsType = {
  title: string
  name: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  deleteItem: () => void
}

export const DeletePackModal = (props: DeleteModalPropsType) => {
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
      <p>
        Do you want to delete <b>{props.name}</b>? All cards will be deleted.
      </p>
      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={deletePackButtonHandler}
        actionButtonTitle={'Delete'}
      />
    </BasicModal>
  )
}
