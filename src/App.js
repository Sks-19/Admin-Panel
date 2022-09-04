import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Users from './Users';
import './users-entry.css';
import 'bootstrap/dist/css/bootstrap.css';

const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;

const App = () => {
  /*API Call*/
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then(response => {
      setData(response.data);
    });
  }, []);

return (
  <>
    <Users 
      data={data}
      setData={setData}
    />
  </>
);
}

export default App;
