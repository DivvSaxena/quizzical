import React from 'react'
import Questions from './components/Questions'

const App = () => {

  const [dataset , setDataset] = React.useState({ })
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
        console.log(data)
        console.log(data.results)
        console.log(typeof data)
        console.log(typeof data.results)
        setDataset(data)
        console.log(dataset)
           
    }catch (error){
        console.error(error.message)
    }
  }

  console.log(dataset)

  function handleButtonClick(){
    setValue(!(value))
    setToggle(!toggle)
  }

  React.useEffect(() => {
    if(value){
      fetchdata()
    }
  }, [value])

    const elements = dataset.results.map((item, index) => {
      <Questions question={question} key={index} />
    })
  


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

    
   
  



  return (
    <div className='main'>
      {toggle ? landingpage : elements }
    </div>
  )
}

export default App