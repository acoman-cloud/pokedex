import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styling/Home.css'

// pokedex 6 is plat, 7 = remake johto, 8 = black

export default function Home(){
	const history = useHistory();

	const routeToNational =()=>{
		localStorage.setItem('gen', 1)
		history.push('/list');
	}
	const routeToGenOne =()=>{
		localStorage.setItem('gen', 2)
		history.push('/list');
	}
	const routeToGenTwo =()=>{
		localStorage.setItem('gen', 3)
		history.push('/list');
	}
	const routeToGenThree =()=>{
		localStorage.setItem('gen', 4)
		history.push('/list');
	}
	const routeToGenFour =()=>{
		localStorage.setItem('gen', 5)
		history.push('/list');
	}
	const routeToGenFive =()=>{
		localStorage.setItem('gen', 8)
		history.push('/list');
	}
	const routeToGenSix =()=>{
		localStorage.setItem('gen', 12)
		history.push('/list');
	}
	const routeToGenSeven =()=>{
		localStorage.setItem('gen', 16)
		history.push('/list');
	}
	const routeToGenEight =()=>{
		localStorage.setItem('gen', 18)
		history.push('/list');
	}
	return (
		<div class='nav'>
		<button onClick={routeToGenOne}>Gen 1</button>
		<button onClick={routeToGenTwo}>Gen 2</button>
		<button onClick={routeToGenThree}>Gen 3</button>
		<button onClick={routeToGenFour}>Gen 4</button>
		<button onClick={routeToGenFive}>Gen 5</button>
		<button onClick={routeToGenSix}>Gen 6</button>
		<button onClick={routeToGenSeven}>Gen 7</button>
		<button onClick={routeToGenEight}>Gen 8</button>
		<button onClick={routeToNational}>National Pokedex</button>
		{/*put some cool stuff here, maybe?*/}
		</div>
	)
	
}