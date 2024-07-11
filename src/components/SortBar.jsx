// import { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";

function SortBar({ handleSearch, handleSearchSelect }) {
  

  return (
    <>
        {/* Input for searching tasks */}
      <input
        className="input-search"
        name="search"
        type="text"
        onChange={(event) => handleSearch(event)} // Handle search input change
        placeholder="Search note..."
      />
       {/* Dropdown for selecting sort/filter options */}
      <select
        onChange={(event) => handleSearchSelect(event)}
        name="sort-options"
        id="sort-options"
        className="sort-options-container"
      >
        <option className="sort-options" value="all">ALL</option>
        <option className="sort-options" value="completed">SHOW COMPLETED</option>
        <option className="sort-options" value="non-completed">SHOW UNCOMPLETED</option>
      </select>
    </>
  );
}

export default SortBar;
