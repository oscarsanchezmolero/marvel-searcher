import React, { createContext, useState, useEffect } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import axios from 'axios';
import qs from 'query-string';

import { TS, HASH, API_KEY, API_URL } from '../constants';

export const CharactersContext = createContext();

const CharactersProvider = ({ children }) => {
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const queries = qs.stringify({
      ts: TS,
      apikey: API_KEY,
      hash: HASH,
    });
    const charactersResponse = await axios.get(`${API_URL}characters?${queries}&limit=${limit}`);
    setLoading(false);
    setCharacters(charactersResponse.data.data.results);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        loading,
        setLimit,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

CharactersContext.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
};

export default CharactersProvider;
