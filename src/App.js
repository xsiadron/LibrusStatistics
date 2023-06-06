import './styles/App.css';
import './styles/Colors.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import Login from './Login';
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="app">
        < Navbar />

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/logowanie' element={<Login/>}/>
        </Routes>

    </div>
  );
}

export default App;
