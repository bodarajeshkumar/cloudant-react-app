import React, {useState} from 'react';


function MyDatabasesList(props) {
  const [count, setCount] = useState(props);
  return (
      <div>
        {props.todos.map(todo => {
          return (
              <h1>{todo.title}</h1>
          )
        })
        }

      </div>
  )
}

export default MyDatabasesList;
