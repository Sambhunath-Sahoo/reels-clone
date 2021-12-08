import './App.css';
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter >

      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

    </BrowserRouter>
  );
}

export default App;

