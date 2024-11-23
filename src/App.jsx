// App.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculatorSaving from './pages/Calculator';
import DCAInvestment from './pages/DCAInvestment';
import Navbar from "./NavBarApp";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<CalculatorSaving />} />
                <Route path="/dca" element={<DCAInvestment />} />
            </Routes>
        </Router>
    );
}

export default App;
