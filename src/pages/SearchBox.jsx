import React from 'react';

import search from '../assets/search-normal.png'
import styles from "./SearchBOx.module.css"


function SearchBox({ value, onChange}) {
  return (
    <div className={styles.container}>
      <img src={search} alt="" />
      <p>جستجو  کالا</p>
      <input
      type="text"
      value={value}
      onChange={onChange}
    />
    </div>
  );
}

export default SearchBox;
