import React from 'react'

const AccountInput = (prop) => {
    const title = prop.title;
    const placeholder = prop.placeholder;
    const handleChange = prop.handleChange;
    const value = prop.value;

  return (
    <div  className="account-input">
        <div className="account-input-title">{title}</div>
        <div className="col-sm-10">
            <input type="password" className="account-input-field form-control" placeholder={placeholder} onChange={handleChange} value={value}/>
        </div>
  </div>
  )
}

export default AccountInput;