import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { readFromCache, writeToCache } from "../utils/cache.js"

const Pokemon = (props) => {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonSpecies, setPokemonSpecies] = useState([])
	const [evo, setEvo] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const { push } = useHistory();
	const typing = [];
	const ability = [];
	let gen = localStorage.getItem('gen')

	useEffect(() => {
		const id = localStorage.getItem('name');
		readFromCache ? axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then(esp => {
				setPokemon(esp.data);
				writeToCache(`https://pokeapi.co/api/v2/pokemon/${id}`, esp.data)
			})
			.catch(err => {
				console.log(err);
			}) : setPokemon(readFromCache(`https://pokeapi.co/api/v2/pokemon/${id}`))
		readFromCache ? axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
			.then(esp => {
				setPokemonSpecies(esp.data)
				writeToCache(`https://pokeapi.co/api/v2/pokemon-species/${id}`, esp.data)
				readFromCache ? axios.get(esp.data.evolution_chain.url)
					.then(res => {
						setEvo(res.data)
						writeToCache(esp.data.evolution_chain.url, res.data)
						console.log('evo', res.data)
						setIsLoading(true);
					})
					.catch(err => {
						console.log(err);
					}) : setEvo(readFromCache(esp.data.evolution_chain.url))
			})
			.catch(err => {
				console.log(err);
			}) : setPokemonSpecies(readFromCache(`https://pokeapi.co/api/v2/pokemon-species/${id}`))
	}, []);

	const handleClick = (e) => {
    localStorage.setItem('name', e.target.id);
    push('/pokemon');
  }

	if (!isLoading) {
		return <h2>Fetching data...</h2>;
	}
	if (isLoading) {
		for (let i = 0; i < pokemon.types.length; i++) {
			typing.push(pokemon.types[i].type.name);
		}
		for (let i = 0; i < pokemon.abilities.length; i++) {
			if (!pokemon.abilities[i].is_hidden) { ability.push(pokemon.abilities[i].ability.name) };
		}
	}

	return (
		<>
			{isLoading && <div>
				<div className='pokemon-title'>
					<h2>{pokemon.name.toUpperCase()}<br /> National Dex № {pokemon.id}</h2>
					<div>
						{<img src={

							pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] == null
								? pokemon['sprites']['versions']['generation-viii']['icons']['front_default']
								: pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

						} width='200%' alt={pokemon.name} style={{ textContent: 'center' }} /> /* look into centering stuff later */}
					</div>
				</div>
				<div className='pokemon'>
					<div>
						<p>HP: {pokemon.stats[0].base_stat} </p>
						<p>ATK: {pokemon.stats[1].base_stat} </p>
						<p>DEF: {pokemon.stats[2].base_stat} </p>
						<p>SPATK: {pokemon.stats[3].base_stat} </p>
						<p>SPDEF: {pokemon.stats[4].base_stat} </p>
						<p>SPD: {pokemon.stats[5].base_stat} </p>

						<p>Total: {
							pokemon.stats[0].base_stat +
							pokemon.stats[1].base_stat +
							pokemon.stats[2].base_stat +
							pokemon.stats[3].base_stat +
							pokemon.stats[4].base_stat +
							pokemon.stats[5].base_stat
						} </p>
					</div>
					<div>
						{
							typing.map(typ => {
								let firstLetter = typ[0].toUpperCase()
								let theRest = typ.slice(1)
								return <p>TYPE: {firstLetter + theRest}</p>
							})
						}
						{
							ability.map(abi => {
								let firstLetter = abi[0].toUpperCase()
								let theRest = abi.slice(1)
								return <p>ABILITY: {firstLetter + theRest}</p>
							})
						}
						<p>Base Exp: {pokemon.base_experience}</p>
						<p>Height: {pokemon.height / 10} m</p>
						<p>Weight: {pokemon.weight / 10} kg</p>
					</div>
				</div>
				<div className='EvoTree'>
					<div> Evolution: </div>
					<div>
						<img
							onClick={handleClick}
							style={{cursor:'pointer'}}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.chain.species.url.match(/\d+/g)[1]}.png`} 
							alt={evo.chain.species.name}
						/>
						<p>{evo.chain.species.name[0].toUpperCase() + evo.chain.species.name.slice(1)}</p>
					</div>
				</div>
				<div>
					Moves Learned at Level Up:
					<div>
						{pokemon.moves.map((item, index) => {
							if (item.version_group_details[0].move_learn_method.name === 'level-up') {
								return <div>
									<div>{item.move.name[0].toUpperCase() + item.move.name.slice(1)} learned at: lvl {item.version_group_details[0].level_learned_at}</div>


								</div>
							} else return null
						})}
					</div>
				</div>


				<div> Sprites: </div>
				<div>
					{<img src={pokemon.sprites.front_default} alt={pokemon.name + ' frontside'} />}
					{<img src={pokemon.sprites.back_default} alt={pokemon.name + ' backside'} />}
					{<img src={pokemon.sprites.front_shiny} alt={'Shiny ' + pokemon.name} />}
				</div>
			</div>}
		</>
	);
}
const mapStateToProps = state => {
	return {

	};
};
const mapActionsToProps = {

}
export default connect(mapStateToProps, mapActionsToProps)(Pokemon);