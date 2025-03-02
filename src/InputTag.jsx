import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import './InputTag.css'

// Specifies which characters should terminate tags input. An array of character codes.
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiter = [KeyCodes.comma, KeyCodes.enter];

const InputTag = () => {
  const [tags, setTags] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  // Method to delete tag from Array
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  // Method to add tag into Array
  const handleAddition = (tag) => {
    let searchUrl = "http://localhost:5001/searchRecipes?ingredients=";
    let newUrl;

    setTags([...tags, tag]);

    if(tags.length != 0) {
      for(let i = 0; i < tags.length; i++) {
        newUrl = searchUrl + tags[i].text + ",";
      }
    }
    else {
      newUrl = searchUrl;
    }
    newUrl = newUrl + tag.text;
    searchReq(newUrl);
  };

  //fetches using all tags
  async function searchReq(url) {
      const response = await fetch(url);
      const data = await response.json();
      const first10 = data.slice(0, 10);
      console.log(first10);
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