import React from 'react';
import style from './styles/search-bar.css';
import translation from './lang';

const SearchBar = ({onSearch, onChange ,value = ''}) => {

  const onChangeValue = (evt) => {
    onChange(evt.target.value);
  };

  const onSubmitForm = (evt) => {
    onSearch();
    evt.preventDefault();
  };

  return (
    <div className="search-bar">
      <i className="logo"/>
      <form className="search-box" onSubmit={onSubmitForm}>
          <input onChange={onChangeValue} value={value} className="input" type="text" placeholder={translation['INPU_PLACEHOLDER']}/>
          <button className="button" type="submit"/>
      </form>
    </div>
  );
};

export default SearchBar;
