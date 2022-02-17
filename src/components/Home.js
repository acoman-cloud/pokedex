import React from 'react';
import { useHistory } from 'react-router-dom';


export default function Home(){
	const history = useHistory();

	const routeToGenOne =()=>{
		localStorage.setItem('gen', 1)
		history.push('/');
	}
	const routeToGenTwo =()=>{
		localStorage.setItem('gen', 2)
		history.push('/');
	}
	const routeToGenThree =()=>{
		localStorage.setItem('gen', 3)
		history.push('/gen3');
	}
	const routeToGenFour =()=>{
		localStorage.setItem('gen', 4)
		history.push('/');
	}
	const routeToGenFive =()=>{
		localStorage.setItem('gen', 5)
		history.push('/');
	}
	const routeToNational =()=>{
		localStorage.setItem('gen', 0)
		history.push('/list');
	}
	return (
		<div>
		<button onClick={routeToGenOne}>Gen 1</button>
		<button onClick={routeToGenTwo}>Gen 2</button>
		<button onClick={routeToGenThree}>Gen 3</button>
		<button onClick={routeToGenFour}>Gen 4</button>
		<button onClick={routeToGenFive}>Gen 5</button>
		<button onClick={routeToNational}>National Pokedex</button>
		<button>Abilities</button>
		<button>Moves</button>
		{/*put some cool stuff here, maybe?*/}
		</div>
	)
	
}