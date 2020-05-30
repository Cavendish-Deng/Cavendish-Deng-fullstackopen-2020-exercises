import React from 'react'

const Total = ({parts}) => {
    console.log('total', parts)
    let reduce = (acc, cur) => acc + cur.exercises
    return (
        <div>
            <h4>
                total of {parts.reduce(reduce, 0)} exercises
            </h4>
        </div>
    )
}

export default Total