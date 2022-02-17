import { POKEMON_LOAD_START, POKEMON_LOAD_SUCCESS, POKEMON_LOAD_FAIL } from './../actions'
import { LIST_LOAD_START, LIST_LOAD_SUCCESS, LIST_LOAD_FAIL } from './../actions'
const initialState = {
	pokemon:{
		name:'BULBASAUR',
		id:'1',
		sprites: {
			front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
			back_default: '',
			front_shiny: '',
		},
		stats:[
			{base_stat:45},
			{base_stat:49},
			{base_stat:49},
			{base_stat:65},
			{base_stat:65},
			{base_stat:45},
			{total:318},
		],
		types:[
			{
				type:{name:''}
				},
			{
				type:{name:''}
				},
		],
		abilities: [
			{
				ability:{
					name: ''
				},
				is_hidden:false,
			}
		]
	},
	isLoading: false,
	region:[],
	error:'',
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case(POKEMON_LOAD_START):
			return({
				...state,
				pokemon:{},
				isLoading:true,
				error:'',
			})
		case(POKEMON_LOAD_SUCCESS):
			return({
				...state,
				pokemon: action.payload,
				isLoading: false,
				error:'',
			})
		case(POKEMON_LOAD_FAIL):
			return({
				...state,
				pokemon:{},
				isLoading:false,
				error:action.payload,
			})
		case(LIST_LOAD_START):
			return({
				...state,
				region:[],
				isLoading:true,
				error:'',
			})
		case(LIST_LOAD_SUCCESS):
			return({
				...state,
				region: action.payload,
				isLoading:false,
				error:'',
			})
		case(LIST_LOAD_FAIL):
			return({
				...state,
				region:[],
				isLoading:false,
				error:action.payload,
			})
		default:
			return state;
	}
}