import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

function main() {
  const [input, setInput] = useState('');
  const [searchValue, setSearchValue] = useState({});

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const result = await axios.post("/api/search", { input });
      console.log('RR', result);
      setSearchValue(result.data);
      console.log(searchValue);
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };


  return (
    <div>
      <p>Enter a fiction</p>
      <form onSubmit={handleSearch}>
        <input type='text' value={input} onChange={handleInputChange}></input>
        <input type='submit' value={"Search"}></input>
      </form>
      {Object.keys(searchValue).length > 0 && (
                <ul>
                    <h1>{searchValue.FictionName}</h1>
                    <p>Recipe Name: {searchValue.RecipeName}</p>
                    <p>Recipe: {searchValue.Recipe}</p>
                </ul>
            )}
    </div>)
}

export default main;