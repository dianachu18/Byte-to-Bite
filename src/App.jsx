import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { MappedRecipe } from './MappedRecipe';
import { RecipeDisplay } from './RecipeDisplay';
import { Login }  from './Login';
import { SignUp } from './SignUp';
import { UserProfile } from './UserProfile'
import { SearchPage } from './SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/SignUp" element={ <SignUp /> } />
        <Route exact path="/SearchPage" element={ <SearchPage />}  />
        {/* </Routes><Route exact path="/RecipeDisplay" element={<RecipeDisplay />} /> */}
        <Route exact path="/UserProfile" element={ <UserProfile /> } />

        <Route path="/recipe/:id" element={ <RecipeDisplay /> } />

      </Routes>
    </Router>
  );
}

export default App;

