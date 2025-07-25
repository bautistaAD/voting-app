import React from 'react'

const ModalDateTimeInput = (prop) => {
    const onChange = prop.onChange;
    const label = prop.label;
    const value = prop.value
    const defaultValue = prop.defaultValue;
  return (
    <div className='modal-input'>
        <div className='modal-label'>{label}</div>
        <div className='""form-group'>
            <input type="datetime-local" className='form-control' onChange={onChange} value={value} defaultValue={defaultValue}/>
        </div>
    </div>
  )
}


export default ModalDateTimeInput;