import React, {forwardRef} from 'react'

import './styles.css'

interface Props {
  children: React.ReactNode
}

export const GenericModal = forwardRef<HTMLDialogElement, Props>(
  ({children}, ref) => {
    return (
      <dialog ref={ref} className="generic-modal">
        {children}
      </dialog>
    )
  }
)

GenericModal.displayName = 'GenericModal'
