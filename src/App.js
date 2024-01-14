import React from 'react'
import './App.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Success from './components/Success';
import AstrologerChat from './components/AstrologerChat';
import ClientChat from './components/ClientChat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/success' element={<Success />} />
        <Route path='/astrologerChat' element={<AstrologerChat />} />
        <Route path='/clientChat' element={<ClientChat />} />
      </Routes>
      {/* <BrowserRouter>
        <Route path='/' component={LoginForm} />
        <Route path='/signup' component={SignUpFormA} />
        <Route path='/mainpage' component={MainPage} />
        <Route path='/success' component={Success} />
      </BrowserRouter> */}
    </div>
  );
}

export default App;
