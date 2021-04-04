import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import '../../helper.css'
const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (c) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: c.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <SearchOutlined onClick={handleSubmit} className='' style={{ cursor: "pointer" }} />
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className=" form-inline mr-sm-2 text-right search-nav"
        placeholder="البحث"
      />

    </form>
  );
};

export default Search;
