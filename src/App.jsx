import React from 'react'
import Questions from './components/Questions'
import he from 'he'

const App = () => {

  const [quiz , setQuiz] = React.useState([])
  const [value , setValue] = React.useState(false)
  const [toggle , setToggle] = React.useState(true)
  

  const fetchdata = async () =>{
    console.log('Fetching data from API');
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.json()

        //  console.log(data.results)
        
        const elements = data.results.map((item, index) => {
          return {
            question: he.decode(item.question),
            key: index,
            incorrect_answers: item.incorrect_answers,
            correct_answer: item.correct_answer
          }
        })

        setQuiz(elements)
    }catch (error){
        console.error(error.message)
    }
  }
  
  // console.log(quiz)

  function handleButtonClick(){
    setValue(!(value))
    setToggle(!toggle)
  }

  React.useEffect(() => {
    if(value){
      fetchdata()
    }
  }, [value])


  const landingpage = (
    <div className='container'>
        <div className="irr-one"></div>
        <div className='irr-two'></div>
        <div className="central-descrp">
            <h1>Quizzical</h1>
            <h2>Some description if needed</h2>
            <button onClick={handleButtonClick}>Start quiz</button>
        </div>
    </div>
  )

  function arrayToShuffle(arrayToShuffle){
    for(let i = arrayToShuffle.length - 1; i > 0 ; i--){
      let randomPosition = Math.floor(Math.random() * ( i + 1 ))
      let temp = arrayToShuffle[i]
      //swap elements
      arrayToShuffle[i] = arrayToShuffle[randomPosition]
      arrayToShuffle[randomPosition] = temp
    }

    return arrayToShuffle
  }

   const mapper = quiz.map((item,index) => {
    let arr = item.incorrect_answers.concat(item.correct_answer)
    let shuffledarr = arrayToShuffle(arr)
    
     return <Questions question={item.question} key={index} option={shuffledarr} correct_answer={item.correct_answer} />
   })

   function handleSubmit(e){
    e.preventDefault()
    console.log('form submitted')
   }
  
   const quizElement = (
    <div className='quiz-page'>
      <div className="irr-one"></div>
      <div className='irr-two'></div>
      <form className='forms' onSubmit={handleSubmit}>
        {mapper}
        <button className='btn-submit'>Submit</button>
      </form>
      
    </div>
   )



  return (
    <div className='main'>
      {toggle ? landingpage : quizElement} 
    </div>
  )
}

export default App