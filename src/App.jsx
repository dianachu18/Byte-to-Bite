import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MappedRecipe } from './MappedRecipe';
import { RecipeDisplay } from './RecipeDisplay';
import { Login }  from './Login';
import { SignUp } from './SignUp';
import { UserProfile } from './UserProfile'
import { HomePage } from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/MappedRecipe" element={<MappedRecipe />} />
        <Route exact path="/RecipeDisplay" element={<RecipeDisplay />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;

