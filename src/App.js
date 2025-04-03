

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Adduser from './components/Adduser';
import Userlist from './components/Userlist';
import Updateuser from './components/Updateuser';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ToastContainer />
     <Routes>
        <Route path='/' element={ <Userlist></Userlist>}></Route>
        <Route path='/create' element={<Adduser></Adduser>}></Route>
        <Route path='/edit/:_id' element={<Updateuser></Updateuser>}></Route>
     </Routes>
    
    </div>
  );
}

export default App;
