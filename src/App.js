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
import CandidatesNew from "./screens/candidates/new";
import PartiesList from "./screens/parties/list";
import PartiesEdit from "./screens/parties/edit";
import PartiesShow from "./screens/parties/show";
import PartiesNew from "./screens/parties/new";
import ElectionsList from "./screens/elections/list";
import ElectionsEdit from "./screens/elections/edit";
import ElectionsShow from "./screens/elections/show";
import ElectionsNew from "./screens/elections/new";
import Construction from "./screens/construction";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <main>
          <Switch>
              <Route component={CandidatesList} path="/candidates" exact />
              <Route component={CandidatesEdit} path="/candidates/edit/:id" />
              <Route component={CandidatesShow} path="/candidates/show/:id" />
              <Route component={CandidatesNew} path="/candidates/new" />
              <Route component={PartiesList} path="/parties" exact />
              <Route component={PartiesEdit} path="/parties/edit/:id" />
              <Route component={PartiesShow} path="/parties/show/:id" />
              <Route component={PartiesNew} path="/parties/new" />
              <Route component={ElectionsList} path="/elections" exact />
              <Route component={ElectionsEdit} path="/elections/edit/:id" />
              <Route component={ElectionsShow} path="/elections/show/:id" />
              <Route component={ElectionsNew} path="/elections/new" />
              <Route component={Construction} path="/construction" />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
