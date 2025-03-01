// HomePage.jsx
import { CardList } from './CardList';

export function HomePage() {
  return (
    <>
      <div className="upper-space">
        <button className="login-button">Sign In
          <img src={'./src/assets/icons8-user-50.png'} className="user-pic" />
        </button>
      </div>
      <div className="login-body">
        <h1 className="byte-to-bite-logo">Byte-to-Bite</h1>
        <input type="text" placeholder="Search for recipe..." className="login-search" />
        <span className="search-button">
          <img src={"./src/assets/icons8-magnifying-glass-50.png"} />
        </span>
        <div>
          <CardList />
        </div>
      </div>
    </>
  );
}
