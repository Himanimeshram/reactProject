import React, { useState } from 'react';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import '@grapecity/wijmo.styles/wijmo.css';
import axios from 'axios';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

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

  const handleDelete = async () => {
    try {
      const userIds = selectedRows.map((row) => row.user_id);
      await axios.delete('http://localhost:8000/delete', { data: { user_ids: userIds } });
      const updatedUserList = userList.filter((user) => !userIds.includes(user.user_id));
      setUserList(updatedUserList);
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const handleRowSelection = (e, row) => {
    const selectedItems = [...selectedRows];
    const rowIndex = selectedItems.findIndex((item) => item.user_id === row.user_id);

    if (rowIndex > -1) {
      selectedItems.splice(rowIndex, 1);
    } else {
      selectedItems.push(row);
    }

    setSelectedRows(selectedItems);
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
      <div>
        <button onClick={handleDelete}>Delete Selected Users</button>
      </div>
      <FlexGrid itemsSource={userList}>
        <FlexGridColumn header="Select" align="center">
          <template cell={true} cellClass="select-cell">
            {(item, props) => (<input
              type="checkbox"
              checked={selectedRows.some((row) => row.user_id === item.user_id)}
              onChange={(e) => handleRowSelection(e, item)}
            />
            )}
          </template>
        </FlexGridColumn>
        <FlexGridColumn header="Name" binding="user_name" />
        <FlexGridColumn header="Email" binding="email" />


      </FlexGrid>
    </div>
  );
}

export default UserList;
