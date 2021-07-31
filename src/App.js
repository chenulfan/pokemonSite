import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './screens/dashboard';
import Favorites from './screens/favorites';
import NavigationBar from './components/navigationBar';

function App() {
  return (
    <Router>
      <Route path="/" component={NavigationBar}></Route>
      <Route exact path="/" component={Dashboard}></Route>
      <Route exact path="/favorites" component={Favorites}></Route>
    </Router>
  );
}

export default App;
