import {Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import React from 'react';
import Login   from './modules/LogIn';
import Main from './modules/Main';
import Register from './modules/Register';
import AllOpt from './modules/AllOpt';

class App extends React.Component {
  render() {
  return(
  <>
  <Provider store={store}>
    <Routes>
      <Route path='/main' element={<Main/>} />
      <Route path='/allopts' element={<AllOpt/>} />  
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </Provider>
  </>
  )
  };

}


export default App;
