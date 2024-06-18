import React from 'react'
import Questions from './components/Questions'

const App = () => {

  const [quiz , setQuiz] = React.useState([])
  const [value , setValue] = React.useState(false)
  const [toggle , setToggle] = React.useState(true)

  const fetchdata = async () =>{
    console.log('Fetching data from API');
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        
        const elements = data.results.map((item, index) => {
          return {
            question: item.question,
            key: index
          }
        })

        setQuiz(elements)
    
    }catch (error){
        console.error(error.message)
    }
  }
  

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


    
   const mapper = quiz.map((item,index) => {
    <Questions question={item.question} key={index}/>
   })
  
   const quizElement = (
    {mapper}
   )



  return (
    <div className='main'>
      {toggle ? landingpage : quizElement} 
    </div>
  )
}

export default App