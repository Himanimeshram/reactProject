import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editedRows, setEditedRows] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  // Fetch user list
  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/users', {
        params: {
          user_name: searchTerm
        }
      });
      const usersWithId = response.data.data.o_data.map((user, index) => ({
        id: index + 1,
        ...user
      }));
      setUserList(usersWithId);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };
  

  useEffect(() => {

    fetchUserList();
  }, [searchTerm]);

  // Handle row selection
  const handleRowSelection = (params) => {
    debugger;
    setSelectedRows(params.selectionModel);
  };

  // Handle cell editing
  const handleCellEdit = (params) => {
    const editedRowId = params.id;
    if (!editedRows.includes(editedRowId)) {
      setEditedRows([...editedRows, editedRowId]);
    }
  };

  // Handle cell value change
  const handleCellValueChange = (params) => {
    const { id, field, value } = params;
    const updatedUserList = userList.map((user) => {
      if (user.id === id) {
        return { ...user, [field]: value };
      }
      return user;
    });
    setUserList(updatedUserList);
  };

  // Save edited cell value
  const handleCellSave = async (params) => {
    const { id, field, value } = params;
    try {
      await axios.put(`http://localhost:8000/update/${id}`, {
        [field]: value
      });
      const updatedEditedRows = editedRows.filter((rowId) => rowId !== id);
      setEditedRows(updatedEditedRows);
      console.log('Cell value saved successfully');
    } catch (error) {
      console.error('Error saving cell value:', error);
    }
  };

  // Delete selected rows
  const handleDeleteRows = async () => {
    debugger;
    var idx=rowSelectionModel;
    idx.forEach(element => {
      debugger;
    const editedRow = userList[element-1];//-1 because row number starts from 1 and array from 0.
    });
    try {
      const userToDelete = {user_id: selectedRows};
      await axios.delete('http://127.0.0.1:8000/delete',{userToDelete});
      fetchUserList();
      setSelectedRows([]);
      console.log('Rows deleted successfully');
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    try {
      for (const editedRowId of editedRows) {
        const editedRow = userList.find((user) => user.id === editedRowId);
        await axios.put(`http://localhost:8000/update/${editedRow.id}`, editedRow);
      }
      setEditedRows([]);
      console.log('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Filter user list
  const filteredUserList = userList.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom editable cell component
  const EditableCell = (params) => {
    const { id, field, value } = params;
    if (editedRows.includes(id)) {
      return (
        <TextField
          value={value}
          onChange={(e) => handleCellValueChange({ ...params, value: e.target.value })}
          onBlur={() => handleCellSave(params)}
          autoFocus
        />
      );
    }
    return <div>{value}</div>;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <DataGrid
        rows={filteredUserList}
        columns={[
          { field: 'user_id', headerName: 'ID', width: 100 },
          {
            field: 'user_name',
            headerName: 'Name',
            width: 200,
            editable: true,
            renderCell: EditableCell,
            onCellEditStart: handleCellEdit,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
            renderCell: EditableCell,
            onCellEditStart: handleCellEdit,
          },
        ]}
        
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          debugger;
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        // selectionModel={selectionModel}
        components={{
          Toolbar: () => (
            <GridToolbarContainer>
              <GridToolbarFilterButton />
              <GridToolbarDensitySelector />
              <GridToolbarExport />
              <IconButton onClick={handleDeleteRows}>
                <DeleteIcon />
              </IconButton>
              <Button variant="contained" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </GridToolbarContainer>
          ),
        }}
      />
    </div>
  );
}

export default UserList;
