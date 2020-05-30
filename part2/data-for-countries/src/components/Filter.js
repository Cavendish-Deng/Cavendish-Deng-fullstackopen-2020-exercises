import React from 'react'


const Filter = ({handleShowChange}) =>
    <div>
        find countries:  <input onChange={handleShowChange} />
    </div>

export default Filter