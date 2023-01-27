
const Header = (props)=>{
  return(
  
    <h1>{props.course}</h1>
  
  )
}

const Part = (props)=>{
  return(
    <p>
        {props.part} {props.exercises}
    </p>
  )
}

const Content = ({part,exercises})=>{
  return(
    <div>
      <Part part={part.part1} exercises={exercises.exercises1}/>
      <Part part={part.part2} exercises={exercises.exercises2}/>
      <Part part={part.part3} exercises={exercises.exercises3}/>
      
    </div>
  )
}

const Total = ({exercises})=>{
  return(
    <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
  )
}

const App = ()=> {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part={{part1:part1,part2:part2,part3:part3}} exercises={{exercises1:exercises1,exercises2:exercises2,exercises3:exercises3}} />
      <Total exercises={{exercises1:exercises1,exercises2:exercises2,exercises3:exercises3}}/>
      
      
      
    </div>
  )
}

export default App;
