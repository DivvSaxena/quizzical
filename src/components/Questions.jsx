import React from 'react'

const Questions = (props) => {
  // console.log('rendering question component')
  // console.log(props.option)

  const [state, setState] = React.useState(0)

  function handleChange(e){
    if(e.target.value == props.correct_answer){
      console.log('matched')
      setState((prevState) => prevState + 1)
    }else{
      console.log('not matched')
    }
  }

  console.log(state)

  const options_for_question = props.option.map((item) => {
    return (<label>
              <input type='radio' name='option' value={item} onChange={handleChange} />
              {item}
            </label>
          )
  })

  return (
    <>
      <div className='question'>
        <h1>{props.question}</h1>
        <form className='options-provided'>
          {options_for_question}
          <hr />
        </form>
      </div>
    </>
   
  )
}

export default Questions