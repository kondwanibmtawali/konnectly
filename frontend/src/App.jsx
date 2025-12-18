/* 
App.jsx - 11/28/2025
Manages Routing for pages -> Remove home Page when dev complete
*/
import './App.css'
import { Link, Routes, Route } from "react-router-dom";
import AfricaMap from './pages/AfricaOverview.jsx';
import AfricanCountry from './pages/CountryPage.jsx';
import InvestmentPage from './pages/Investments.jsx';

function App() {
  return (
    <div className="App">
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/test">Africa Map</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the Map App</h1>} />
        <Route path="/test" element={<AfricaMap />} />
        <Route path="/country/:name" element={<AfricanCountry />} />
        <Route path="/investment/:name" element={<InvestmentPage />} />
      </Routes>
    </div>
  );
}

export default App;