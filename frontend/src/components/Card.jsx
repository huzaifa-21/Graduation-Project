import React from 'react'

const Card = ({title,amount}) => {
  return (
    <div >
      <h2>{title}</h2>
      <span>{ amount}</span>
    </div>
  )
}

export default Card