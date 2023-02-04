const PersonForm = ({onsubmit,name,number,handlerperson,handlernumber}) =>{
    return(
      <div>
        <form onSubmit={onsubmit}>
          <div>
            name: <input value={name} onChange={handlerperson} />
          </div>
          <div>
            number: <input value={number} onChange={handlernumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
  }

  export default PersonForm