import React from 'react'

const SelectInput = (prop) => {
    const data = prop.data;
    const id = prop.id;
    const label = prop.label
    const onChange = prop.onChange;

  return (
    <div className='select-input'>
        <div className='modal-label'>{label}</div>
        <select className="form-select" id={id} onChange={onChange}>
            <option value="" selected disabled >Select Option</option>
            {
                data.map((option, key) =>(
                    <option value={option} key={key}>{option}</option>
                ))
            }
        </select>
    </div>
  )
}

export default SelectInput