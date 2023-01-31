import { useState } from "react";

const Button= (props)=>(
  <button onClick={props.handler} id={props.text}>{props.text}</button>
)

const StatsLine= ({text,value})=>(
  <tbody>
    <tr>
      <th>{text}</th> 
      <td>{value}</td>
    </tr>
  </tbody>
)

const Stats= (props)=>{
  let good=props.good
  let neutral=props.neutral
  let bad=props.bad
  let all=good+neutral+bad
  if (props.feed===0){
    return <p>No feedback given</p>
  }
  return (
    <table>
      
      <StatsLine text='good' value={good} />
      <StatsLine text='neutral' value={neutral} />
      <StatsLine text='bad' value={bad} />
      <StatsLine text='all' value={all} />
      <StatsLine text='average' value={(good-bad)/all} />
      <StatsLine text='positive' value={(good/all)*100} />
    </table>
  )
}

const App= () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feed, setFeed] = useState(0)
 
  
  const setFeedback=(newFeed,check)=>{
    if (check==='good'){
      console.log(newFeed)
      setGood(newFeed)
    }
    else if (check==='neutral'){
      console.log(newFeed)
      setNeutral(newFeed)
    }
    else if (check==='bad'){
      console.log(newFeed)
      setBad(newFeed)
    }
    setFeed(1)
    
  }

  
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handler={()=>setFeedback(good+1,'good')} text='Good'/>
      <Button handler={()=>setFeedback(neutral+1,'neutral')} text='Neutral'/>
      <Button handler={()=>setFeedback(bad+1,'bad')} text='Bad'/>
      
      <h2>Statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad} feed={feed}/>
      
    </div>
  );
}

export default App;
