import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const List = (props) => {
  const [region, setRegion] = useState([]);
  const { push } = useHistory();
  let gen = localStorage.getItem('gen');
  let str = '?limit=898';
  if(gen === '1') str = '?limit=151'
  else if(gen === '2') str = '?offset=151&limit=100'
  else if(gen === '3') str = '?offset=251&limit=135'
  else if(gen === '4') str = '?offset=386&limit=107'
  else if(gen === '5') str = '?offset=493&limit=156'
  else if(gen === '6') str = '?offset=649&limit=72'
  else if(gen === '7') str = '?offset=721&limit=88'
  else if(gen === '8') str = '?offset=809&limit=89'

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${str}`)
      .then(esp => {
        setRegion(esp.data.results)
      })
  }, []);

  const handleClick = (e) => {
    localStorage.setItem('name', e.target.id);
    push('/pokemon');
  }

  return (
    <div className='cards'>
      {region.map((poke, index) => {
        let ping = 42;
        if (index < 10 && (gen === '1' || gen === '0')) ping += 1;
        else if (index > 9 && index < 100 && (gen === '1' || gen === '0')) ping += 2;
        else ping += 3;
        return (
          <div className='card'>
            <img 
              onClick={handleClick} 
              id={poke.url.slice(42, 45)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.slice(42, ping)}.png`} 
              alt={poke.name} />
            <p>{poke.name.toUpperCase()}</p>
          </div>
      )})}
    </div>)
}

const mapStateToProps = state => {
  return {

  };
};
const mapActionsToState = {

}

export default connect(mapStateToProps, mapActionsToState)(List);