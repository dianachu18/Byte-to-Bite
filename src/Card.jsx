import PropTypes from 'prop-types';

export function Card({title, text, linkTitle}) {

  return (
    <>
      <div className="card">
        <div className="image">
          <a href={linkTitle} className="link">
            <img src={linkTitle} alt={title}/>
          </a>
          {/* <img src="https://cdn-media-1.freecodecamp.org/images/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt="React img" /> */}
          
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