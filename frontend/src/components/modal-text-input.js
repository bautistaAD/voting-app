import React from 'react'

const ModalTextInput = (prop) => {
    const onChange = prop.onChange;
    const label = prop.label;
  return (
    <div className='modal-input'>
        <div className='modal-label'>{label}</div>
        <div className='form-group'>
            <input type="text" className='form-control' onChange={onChange}/>
        </div>
    </div>
  )
}


export default ModalTextInput