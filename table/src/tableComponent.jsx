import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableComponent() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData =async () => {
    try {
      const response =await axios.get('http://127.0.0.1:8000/users/users');
      debugger;
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }

};

  return (
    <div>
      <h1>Table Component</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>userName</th>
            <th>email</th>
            <th>phone_number</th>
            <th>class_id</th>
            <th>account_id</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneno}</td>
              <td>{user.classId}</td>
              <td>{user.accountId}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
