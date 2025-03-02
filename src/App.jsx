import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import MappedRecipe from './MappedRecipe';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/MappedRecipe" element={<MappedRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;

