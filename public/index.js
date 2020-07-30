
const baseUrl =  'https://pokeapi.co/api/v2/pokemon';
let pokemon = {
    id:"",
    name:"",
    ability:"",
    types:[],// cuando van varios elementos es ponerlo en un array.
    imagen:""

} 
const handleError = err => {
    alert (`Hubo un error. ${err}`)
}

const getPokemon = async (id) => {
    try {
        const res = await axios.get(`${baseUrl}/${id}/`);
        // es importante debuggiar el res para saber si te da una data u otro tipo de informacion general.
        const datos = res.data;

        pokemon.id = datos.id;
        pokemon.name = datos.name;
        pokemon.ability= datos.abilities[0].ability.name; 
        pokemon.imagen= datos.sprites.front_default; 

        for(let i =0; i<datos.types.length; i++){
            pokemon.types[i] = datos.types[i].type.name;
        }
        return pokemon;
        
    } catch (err) {
        handleError(err);
    }
}


const armarHtml = (pokemon) => {

    
    const wrapperName = document.querySelector('.wrapper-id-name');
    wrapperName.innerHTML = '';
    const span =document.createElement('span');
    span.textContent= "#";
    const spanId = document.createElement('span');
    spanId.className ='id';
    const span2 =document.createElement('span');
    span2.textContent= "- ";
    spanId.textContent= pokemon.id;
    wrapperName.appendChild(span);
    wrapperName.appendChild(spanId);
    wrapperName.appendChild(span2);

    const spanName = document.createElement('span');
    spanName.className ='name'
    spanName.textContent =pokemon.name; 
    wrapperName.appendChild(spanName);
   
    const spanAbility = document.querySelector('.ability');
    spanAbility.textContent = pokemon.ability;

    const nameType = document.querySelector('.name-type');
    nameType.innerHTML = '';
        for(let i = 0; i< pokemon.types.length; i++){
            const spanType = document.createElement('span');
            spanType.className = 'type';
            spanType.innerHTML = pokemon.types[i];
            spanType.style.background = colorByType(pokemon.types[i]);
            nameType.appendChild(spanType);
        }
        
    const imagen = document.querySelector('#img');
    imagen.src = pokemon.imagen;
}
 
const botonGo = document.querySelector('.boton-go');

botonGo.addEventListener('click', async() => {
    const inputId = document.querySelector('.inputGo').value;
    const pokemon = await getPokemon(inputId);
    armarHtml(pokemon);
});




const colorByType = (type) => {
     
     let color = {
        "water": "#718bf1",
        "fire": "#e28145",
        "normal": "#aca981",
        "fighting": "#bf3228",
        "poison": "#a042a3",
        "ground": "#e2c06b",
        "flying": "#a792ee",
        "rock": "#b6a038",
        "bug": "#aab922",
        "rock": "#718bf1",
        "ghost": "#705a98",
        "steel": "#b7b8ce",
        "grass": "#79cb4f",
        "electric": "#718bf1",
        "psychic": "#f55a86",
        "ice": "#9bd8d8",
        "dragon": "#6b3af8",
        "dark": "#705847",
        "fairy": "#ee9bae",
        "unknown": "#68a192",
    }

    return color[type];

}




