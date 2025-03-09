import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { MappedRecipe } from './MappedRecipe';
import { RecipeDisplay } from './RecipeDisplay';
import { Login }  from './Login';
import { SignUp } from './SignUp';
import { UserProfile } from './UserProfile'
import { HomePage } from './HomePage';
import { GlobalProvider } from "./GlobalContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/MappedRecipe" element={<MappedRecipe />} /> */}
        <Route exact path="/RecipeDisplay" element={<GlobalProvider> <RecipeDisplay /> </GlobalProvider>} />
        <Route exact path="/Login" element={<GlobalProvider> <Login /> </GlobalProvider>} />
        <Route exact path="/SignUp" element={<GlobalProvider> <SignUp /></GlobalProvider>} />
        <Route exact path="/UserProfile" element={<GlobalProvider> <UserProfile /> </GlobalProvider>} />
      </Routes>
    </Router>
  );
}

export default App;

