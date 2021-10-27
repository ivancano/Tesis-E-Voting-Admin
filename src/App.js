import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Sidebar from './components/Sidebar';
import CandidatesList from "./screens/candidates/list";
import CandidatesEdit from "./screens/candidates/edit";
import CandidatesShow from "./screens/candidates/show";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <main>
          <Switch>
              <Route path="/candidates" exact>
                <CandidatesList />
              </Route>
              <Route path="/candidates/edit/:id" >
                <CandidatesEdit />
              </Route>
              <Route path="/candidates/show/:id" >
                <CandidatesShow />
              </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
