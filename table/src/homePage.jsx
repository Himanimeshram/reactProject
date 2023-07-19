import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleSheet.css';

const HomePage = () => {
  const navigate = useNavigate();
debugger;
  return (
    <div className='Login1'>
      <button className="btn" onClick={() => navigate('/TablePostgre', { replace: true })}>
        LOGIN
      </button>
      <button className="btn" onClick={() => navigate('/WijmoGrid', { replace: true })}>
        WijmoGrid
      </button>
      <button className="btn" onClick={() => navigate('/TableComponent', { replace: true })}>
      TableComponent
      </button>
      <button className="btn" onClick={() => navigate('/ReactDataGrid', { replace: true })}>
      ReactDataGrid
      </button>
      <button className="btn" onClick={() => navigate('/SmartGrid', { replace: true })}>
      SmartGrid
      </button>
      <button className="btn" onClick={() => navigate('/MuiGrid', { replace: true })}>
      MuiGrid
      </button>
    </div>
  );
};

export default HomePage;
