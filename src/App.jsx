// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalculatorSaving from './pages/Calculator';
import DCAInvestment from './pages/DCAInvestment';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Calculator Saving</Link></li>
                    <li><Link to="/dca">DCA Investment</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<CalculatorSaving />} />
                <Route path="/dca" element={<DCAInvestment />} />
            </Routes>
        </Router>
    );
}

export default App;
