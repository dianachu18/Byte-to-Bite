import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardStyle.css'; 

export function Card({title, text, linkTitle, recipe}) {

  // const openRecipeInNewTab = () => {
  //   const newWindow = window.open(`/recipe/${recipe._id}`, '_blank');
  //   newWindow.history.pushState(null, '', `/recipe/${recipe._id}`);
  //   newWindow.document.title = recipe.title;  // Optional: Set the title in the new window
  // };

  const openRecipeInNewTab = () => {
    localStorage.setItem('recipeState', JSON.stringify(recipe));
    window.open(`/recipe/${recipe._id}`, '_blank');
};

  return (
    <>
      <div className="card">
        <div className="image">

          <div onClick={openRecipeInNewTab} className="link">
            <img src={linkTitle} alt={title}/>
          </div>
          
        </div>
        <div className="info">
          <h1 className="card-title">{title}</h1>
          <p className="card-desc">{text}</p>
          {/* <a href={linkTitle} className="link">
          {linkTitle}
            <img src={linkTitle} alt={title}/>
          </a> */}
        </div>
      </div>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
  recipe: PropTypes.any.isRequired,
};



// import PropTypes from 'prop-types';

// export function Card({title, text, linkTitle}) {

//   return (
//     <>
//       <div className="card">
//         <div className="image">
//           <img src="https://cdn-media-1.freecodecamp.org/images/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="React img" />
//         </div>
//         <div className="info">
//           <h1 className="card-title">{title}</h1>
//           <p className="card-desc">{text}</p>
//           <a href="/" className="link">{linkTitle}</a>
//         </div>
//       </div>
//     </>
//   )
// }

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   text: PropTypes.string.isRequired,
//   linkTitle: PropTypes.string.isRequired,
// };