import React from 'react'

const ModalTextInput = (prop) => {
    const onChange = prop.onChange;
    const label = prop.label;
    const value = prop.value
    const defaultValue = prop.defaultValue;
    const id = prop.id

  return (
    <div className='modal-input'>
        <div className='modal-label'>{label}</div>
        <div className='form-group'>
            <input type="text" className='form-control' onChange={onChange} value={value} defaultValue={defaultValue} id={id}/>
        </div>
    </div>
  )
}


export default ModalTextInput