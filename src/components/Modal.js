import React from 'react'

function Modal({ modalType, modalHeader, modalMessage, modaleHandler, buttonSize }) {

  return (
    <div className="modal_overlay">
        <div className="modal_card">
            <div className={
                modalType === 'success' ?  'modal_card_sub success' : 
                modalType === 'warning' ? 'modal_card_sub warning' : 
                modalType === 'danger' ? 'modal_card_sub danger' : 
                modalType === 'modal_card_sub'
            }>
                {
                    modalHeader && <div className="modal_header d-flex align-items-center">
                        <i className={
                            modalType === 'success' ? 'fa-solid fa-check-circle me-2' :
                            modalType === 'danger' ? 'fa-solid fa-trash-alt me-2' :
                            modalType === 'warning' ? 'fa-solid fa-triangle-exclamation me-2' :
                            'fa-solid fa-bell me-2'
                        }></i>
                        <h5 className="mb-0">{ modalHeader }</h5>
                    </div>
                }
                <div className="modal_body">
                    <p className='fs-6'>{ modalMessage }</p>
                </div>
                <div className="modal_footer">
                    <div className="btn btn-secondary" onClick={ e => modaleHandler(false) }>Cancel</div>
                    <div className={
                        modalType === 'danger' ? "btn btn-danger" : 
                        modalType === 'success' ? "btn btn-success" :
                        modalType === 'warning' ? "btn btn-warning" :
                        "btn btn-primary"
                    } onClick={ e => modaleHandler(true) }>Confirm</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal