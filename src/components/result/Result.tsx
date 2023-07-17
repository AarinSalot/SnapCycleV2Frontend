import React, {useState, useEffect, FC, MouseEventHandler} from 'react'
import './Result.css'

interface ResultProps {
  restart: Function
  result: string

}
const Result:FC<ResultProps> = ({restart, result}) => {

  const back: MouseEventHandler<HTMLButtonElement> = () => {restart()}
  return (
    <>
      <div className="result-container">
        <h3 className="result-header">Your result:</h3>
        <p>{result}</p>
      </div>
      <button onClick={back} className='btn'>Try another item!</button>
    </>
  )
}

export default Result
