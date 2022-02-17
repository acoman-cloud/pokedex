import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const List = (props) => {
	const [region, setRegion] = useState([]);
  const { push } = useHistory();

  useEffect(()=>{
    axios.get('https://pokeapi.co/api/v2/pokedex/national/')
      .then(esp=>{
        console.log(esp.data.pokemon_entries)
        setRegion(esp.data.pokemon_entries)
      })
  }, []);

  const handleClick=(e)=>{
    localStorage.setItem('name', e.target.id);
    localStorage.setItem('gen', 0)
    push('/pokemon');
  }

	return (
		<div className='cards'>
      {region.map(poke=>{
        return <div className='card'><img onClick={handleClick} id={poke.pokemon_species.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.entry_number}.png`} alt={poke.pokemon_species.name} /><p>{poke.pokemon_species.name.toUpperCase()}</p></div>
      })}
    </div>)
  }

const mapStateToProps = state => {
  return {

  };
};
const mapActionsToState={
  
}

export default connect(mapStateToProps, mapActionsToState)(List);