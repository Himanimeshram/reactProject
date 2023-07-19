import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleSheet.css';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
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

  const handleSearch = async () => {
    fetchUserList();
  };

  const handleCheckboxChange = (event, userId) => {
    debugger;
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, userId]);
    } else {
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== userId));
    }
  };
  

  const handleDeleteRows = async () => {
    try {
      await axios.delete('http://localhost:8000/delete', { data: { user_ids: selectedRows } });
      fetchUserList();
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };

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
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.user_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.user_id)}
                  onChange={(e) => handleCheckboxChange(e, user.user_id)}
                />
              </td>
              <td>{user.user_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDeleteRows}>Delete Selected Rows</button>
    </div>
  );
}

export default UserList;
