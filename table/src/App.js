import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import TableComponent from './tableComponent';
import TablePostgre from './tablePostgre';
import WijmoGrid from './wijmoMasterGrid';
import HomePage  from './homePage';
import ReactDataGrid from './reactDataGrid';
import SmartGrid from './smartGrid'
import MuiGrid from './muiGrid'
import './App.css'
function Root() {

  //route(sub main page...where you can declare your routes, and other properties)
  return (
    <div>
      <Routes style={{
              display: "flex",
              flexWrap: "wrap"
          }}>
        <Route  path="/" element={<HomePage />} />
        <Route  path="/TablePostgre" element={<TablePostgre />} />
        <Route  path="/TableComponent" element={<TableComponent />} />
        <Route  path="/WijmoGrid" element={<WijmoGrid/>} />
        <Route  path="/ReactDataGrid" element={<ReactDataGrid/>} />
        <Route  path="/SmartGrid" element={<SmartGrid/>} />
        <Route  path="/MuiGrid" element={<MuiGrid/>} />
          
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}
export default App;

