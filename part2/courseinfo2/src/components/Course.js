const Header = ({name}) =>(
    <h2>{name}</h2>
  )
  
  const Part = ({name,exercises}) =>{
    
    return(
    <div>
      <p>{name} {exercises}</p>
    </div>
    )
  }
  
  const Total = ({total}) =>{
    return(
      <p>total of {total}</p>
    )
  }
  
  const Content = ({parts}) =>{
    let total=parts.reduce((curr,next) => 
      next.exercises+curr,0
    );
    
    return(
      <div>
        {parts.map(part =>
           <Part key={part.id} name={part.name} exercises={part.exercises} />
          )
        }
        <Total total={total}/>
      </div>
    ) 
  }
  
  const Course = ({course}) => {
    
    return ( 
      <div>
        <Header  name={course.name} />
        <Content  parts={course.parts} />
      </div>
    )
  }

  export default Course