import React from 'react'

const Filter = ({handleShowChange}) =>
    <div>
        filter shown with: <input onChange={handleShowChange} />
    </div>

export default Filter