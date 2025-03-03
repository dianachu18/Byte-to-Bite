// HomePage.jsx
import { CardList } from './CardList';
import './HomePageStyle.css';

export function HomePage() {
  return (
    <>
      <div className="home-page">
        <div>
          <button className="login-button-hp">Sign In
            <img src={'./src/assets/icons8-user-50.png'} className="user-pic" />
          </button>
        </div>
        <div className="login-body">
          <h1 className="byte-to-bite-logo">Byte-to-Bite</h1>
          <input type="text" placeholder="Search for recipe..." className="login-search" />
          <button className="search-button">
            <img src={"./src/assets/icons8-magnifying-glass-50.png"} />
          </button>
          <div>
            <CardList />
          </div>
        </div>
        </div>
    </>
  );
}

export default HomePage;
