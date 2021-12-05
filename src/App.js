import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
        super();
        this.state = {
          kanto: [],
          pic: '',
          pokeID: '',
        }
    }


  componentWillMount() {
    axios.get(`https://pokeapi.co/api/v2/pokedex/2/`)
      .then(esp=>{
        console.log(esp.data.pokemon_entries)
        this.setState({
          ...this.state,
          kanto: esp.data.pokemon_entries,
          });
      })
      .catch(err=>{
        console.error(err);
      });
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokedex</h1>
      </header>
      <div className='cards'>
        {this.state.kanto.map(poke=>{
          return <div className='card'><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.entry_number}.png`} alt={poke.pokemon_species.name} /><p>{poke.pokemon_species.name.toUpperCase()}</p></div>
        })}
      </div>
    </div>
  );
  }
}

export default App;
