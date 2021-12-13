import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Router>
      <AuthProvider >
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/" component={Feed} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
