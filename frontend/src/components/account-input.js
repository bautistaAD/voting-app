import React from 'react'

const AccountInput = (prop) => {
    const title = prop.title;
    const placeholder = prop.placeholder;

  return (
    <div  className="account-input">
        <div className="account-input-title">{title}</div>
        <div className="col-sm-10">
            <input type="password" className="account-input-field form-control" placeholder={placeholder} />
        </div>
  </div>
  )
}

export default AccountInput;