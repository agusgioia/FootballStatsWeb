import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Scorers from "./pages/Scorers";
import Standings from "./pages/Standings";
import Navbar from "./components/Navbar";
import Team from "./pages/Team";
import LiveMatches from "./pages/LiveMatches";
import MatchCard from "./pages/MatchCard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/scorers" element={<Scorers />} />
        <Route path="/teams/:id" element={<Team />} />
        <Route path="/live" element={<LiveMatches />} />
        <Route path="/matches/:id" element={<MatchCard />} />
        <Route path="/competitions/:code/matches" element={<Matches />} />
        <Route path="/competitions/:code/standings" element={<Standings />} />
        <Route path="/competitions/:code/scorers" element={<Scorers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
