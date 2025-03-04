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
    setTags(tags.filter((tag, index) => index !== i));
  };

// Method to add tag into Array
const handleAddition = (tag) => {
    setTags([...tags, tag]);
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