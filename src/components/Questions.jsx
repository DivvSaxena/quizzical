import React from 'react'
import he from 'he'
const Questions = ({question , option , questionkey , handleAnswerChange}) => {
 

  function handleChange(e){
    handleAnswerChange(questionkey,e.target.value)
  }

  const optionsForQuestion = option.map((item,index) => {
    return (
          <label key={index}>
              <input 
                type='radio' 
                name={`options-${questionkey}`} 
                value={item} 
                onChange={handleChange} 
              />
              
              {he.decode(item)}
          </label>
          )
  })

  return (
    <>
      <div className='question'>
        <h1>{question}</h1>
        <div className='options-provided'>
          {optionsForQuestion}
          <hr />
        </div>
      </div>
    </>
   
  )
}

export default Questions