import React, { useState } from 'react';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
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

  const columnGroups = [
    {
      label: 'user_name',
      align: 'center',
      name: 'name'
    },
    {
      label: 'email',
      align: 'center',
      name: 'order'
    }
  ];

  const dataSource = new Smart.DataAdapter({
    dataSource: userList,
    dataFields: [
      'user_name:string',
      'email:string'
    ]
  });

  const appearance = {
    alternationCount: 2,
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true
  };

  const behavior = {
    columnResizeMode: 'growAndShrink'
  };

  const pager = {
    visible: true
  };

  const paging = {
    enabled: true
  };

  const sorting = {
    enabled: true
  };

  const editing = {
    enabled: true
  };

  const selection = {
    enabled: true,
    allowCellSelection: true,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: 'extended'
  };

  const columns = [
    { label: 'Name', dataField: 'user_name' },
    { label: 'Email', dataField: 'email' }
  ];

  const rowKeyGetter = (row) => row.id;

  return (
    <div>
      <h1>Tree Grid Component</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <Grid
          dataSource={dataSource.dataAdapter}
          columns={columns}
          columnGroups={columnGroups}
          appearance={appearance}
          behavior={behavior}
          selection={selection}
          paging={paging}
          pager={pager}
          sorting={sorting}
          editing={editing}
          rowKeyGetter={rowKeyGetter}
        />
      </div>
    </div>
  );
}

export default UserList;
