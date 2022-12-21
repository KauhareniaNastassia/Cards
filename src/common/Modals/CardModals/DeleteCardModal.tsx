import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type DeleteCardModalPropsType = {
  title: string
  question: string
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
      <p>
        Do you really want to remove <b>{props.question}</b>?
      </p>
      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={deletePackButtonHandler}
        actionButtonTitle={'Delete'}
      />
    </BasicModal>
  )
}
