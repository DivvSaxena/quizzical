import React from 'react'
import Questions from './components/Questions'
import he from 'he'

const App = () => {

  const [quiz , setQuiz] = React.useState([])
  const [value , setValue] = React.useState(false)
  const [toggle , setToggle] = React.useState(true)
  const [answers, setAnswers] = React.useState({})
  const [score, setScore] = React.useState(0)
  const [submitbtn , setSubmitBtn] = React.useState(false)

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
          const arr = item.incorrect_answers.concat(item.correct_answer)
          const shuffledarr = arrayToShuffle(arr)

          return {
            question: he.decode(item.question),
            key: index,
            options: shuffledarr,
            incorrect_answers: item.incorrect_answers,
            correct_answer:item.correct_answer
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

  function handlePlayButtonClick(){
    setToggle(!toggle)
    setSubmitBtn(!(submitbtn))
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


  const handleAnswerChange = (questionkey,answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionkey]: answer
    }))
  }

   const mapper = quiz.map((item,index) => {
   
     return (
              <Questions 
                question={item.question} 
                key={index} 
                option={item.options} 
                questionkey={index}
                correct_answer={item.correct_answer} 
                handleAnswerChange={handleAnswerChange}
              />
            )
    })

    console.log(answers)

   function handleSubmit(e){
    e.preventDefault()
    console.log('form submitted')
    let score = 0
    quiz.forEach((item,index) => {
      if(answers[index] === item.correct_answer){
        score += 1
      }
    })
    setScore(score)
    console.log(`Your score is ${score}/${quiz.length}`)
    setSubmitBtn(!(submitbtn))
   }

   console.log(`Submit button: ${submitbtn}`)
   
  
   const quizElement = (
    <div className='quiz-page'>
      <div className="irr-one"></div>
      <div className='irr-two'></div>
      <form className='forms' onSubmit={handleSubmit}>
        {mapper}
        {!(submitbtn) && <button className='btn-submit'>Submit</button>}
        {submitbtn && <div className='playagain'>
          <h1>Your score is {score}/{quiz.length}</h1>
          <button className='btn-submit' onClick={handlePlayButtonClick}>Play Again</button>
        </div>}
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