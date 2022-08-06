import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { readFromCache, writeToCache } from "../utils/cache.js"

const List = (props) => {
  const [region, setRegion] = useState([]);
  const { push } = useHistory();
  let gen = localStorage.getItem('gen');
  // let str = '?limit=898';
  // if(gen === '1') str = '?limit=151'
  // else if(gen === '2') str = '?offset=151&limit=100'
  // else if(gen === '3') str = '?offset=251&limit=135'
  // else if(gen === '4') str = '?offset=386&limit=107'
  // else if(gen === '5') str = '?offset=493&limit=156'
  // else if(gen === '6') str = '?offset=649&limit=72'
  // else if(gen === '7') str = '?offset=721&limit=88'
  // else if(gen === '8') str = '?offset=809&limit=89'

  useEffect(() => {
    readFromCache ? axios.get(`https://pokeapi.co/api/v2/pokedex/${gen}`)
      .then(esp => {
        setRegion(esp.data.pokemon_entries)
        writeToCache(`https://pokeapi.co/api/v2/pokedex/${gen}`, esp.data.pokemon_entries)
      }) : setRegion(readFromCache(`https://pokeapi.co/api/v2/pokedex/${gen}`))
  }, [gen]);

  const handleClick = (e) => {
    localStorage.setItem('name', e.target.id);
    push('/pokemon');
  }

  return (
    <div className='cards'>
      {region.map((poke, index) => {
        return (
          <div className='card'>
            <img
              onClick={handleClick}
              style={{cursor:'pointer'}}
              id={poke.pokemon_species.url.replace(/\D/g, '').slice(1)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.pokemon_species.url.match(/\d+/g)[1]}.png`}
              alt={poke.pokemon_species.name}
              height={100}
              width={100} />
            <p>{poke.pokemon_species.name.toUpperCase()}</p>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {

  };
};
const mapActionsToState = {

}

export default connect(mapStateToProps, mapActionsToState)(List);