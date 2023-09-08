import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Board from "./Components/Board/Board"

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fectchdata = async () => {
      const res = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setTickets(res.data.tickets);
      setUsers(res.data.users)
    }

    fectchdata();
  }, [])


  return (
    <div className="App">
      <Board tickets={tickets} users = {users}/>
    </div>
  );
}

export default App;
