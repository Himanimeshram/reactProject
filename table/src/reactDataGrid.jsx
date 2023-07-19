import React, { useState } from 'react';
import 'react-data-grid/lib/styles.css';    
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const params = {
        user_name: searchTerm
      };
      const response = await axios.get('http://127.0.0.1:8000/users', { params });
      setUserList(response.data.data.o_data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const columns = [
    { key: 'user_name', name: 'Name' },
    { key: 'email', name: 'Email' },
  ];

  const rowKeyGetter = (row) => row.id;

  return (
    <div>
      <h1>Table Component</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <ReactDataGrid
          columns={columns}
          rows={userList}
          rowKeyGetter={rowKeyGetter} 
        />
      </div>
    </div>
  );
}

export default UserList;
