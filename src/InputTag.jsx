import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import './InputTag.css'

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiter = [KeyCodes.comma, KeyCodes.enter];

const InputTag = ({ onSearchResults }) => {
  const [tags, setTags] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  // Method to delete tag from Array
  const handleDelete = (i) => {
    let searchUrl = "http://localhost:5000/searchRecipes?ingredients=";

    setTags(tags.filter((tag, index) => index !== i));

    if(tags.length != 0) {
      for(let j = 0; j < tags.length; j++) {
        if(j !== i) {
          searchUrl = searchUrl + tags[j].text + ",";
        }
      }
    }
    
    searchUrl = searchUrl.slice(0, searchUrl.length - 1);
    searchReq(searchUrl);
  };

  // Method to add tag into Array
  const handleAddition = (tag) => {
    let searchUrl = "http://localhost:5000/searchRecipes?ingredients=";

    setTags([...tags, tag]);

    if(tags.length != 0) {
      for(let i = 0; i < tags.length; i++) {
        searchUrl = searchUrl + tags[i].text + ",";
      }
    }

    searchUrl = searchUrl + tag.text;
    //console.log(searchUrl);
    searchReq(searchUrl);
  };

  //fetches using all tags
  async function searchReq(url) {
      const response = await fetch(url);
      const data = await response.json();
      const first10 = data.slice(0, 10);
      console.log(first10);
      onSearchResults(first10);
  };

  return (
    <div id="tags">
      <ReactTags
        classNames={{
          tags: "custom-tags-container",
          tag: "custom-tag",
          remove: "custom-remove",
          input: "custom-input"
        }}
        tags={tags}
        suggestions={suggestions}
        delimiter={delimiter}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        autocomplete={true}
        allowDragDrop={false}
        placeholder="Enter ingredients..."
      />
    </div>
  );
};

export default InputTag;