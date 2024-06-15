import logo from "./logo.svg";
import "./App.css";
import { AuthPage } from "./components/auth/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Candidates from "./components/Candidates";
import VotingPage from "./components/VotingPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/candidate/:uid" element={<Candidates />} />
          <Route path="/vote/:uid" element={<VotingPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
