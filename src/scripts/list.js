const $pokemonList = document.getElementById("pokemon-list");
const $loadMoreBtn = document.getElementById("load-more");

let offset =  1, limit = 14;

async function getAndPopulatePokeList(info) {
  for(let index = 0; index <= info.limit; index++) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + info.offset}`).then(res => res.json());

    const pokeInfo = {
      name: data.name,
      number: data.id,
      photo: data.sprites.other["official-artwork"].front_default,
      types: data.types.map(({ type }) => type.name)
    }

    addPokemonOnDomList(pokeInfo);

  }
}


function generatePokemonCard(pokemon) {
  return `
  <div class="card-container">
    <span class="poke-number">#${pokemon.number}</span>
    <img src="${pokemon.photo}" alt="${pokemon.name}">

    <h2 class="poke-name">${pokemon.name}</h2>
    <ul class="poke-types">
    ${pokemon.types.map(type => {
      let imgName = type.charAt().toUpperCase() + type.substring(1)
      return `<li>
              <img src="src/images/pokemon-types/${imgName}.png" alt="${type}" title="${type}">
              </li>`
    }).join("")}
    </ul>
  </div>
  `
}

function addPokemonOnDomList(pokemon) {
  $pokemonList.innerHTML += generatePokemonCard(pokemon);
}

function loadMorePokemons() {
  offset+= limit + 1;
  getAndPopulatePokeList({offset, limit});
}


window.addEventListener("load", () => getAndPopulatePokeList({offset, limit}));

window.addEventListener("scroll", () => {
  if(document.body.offsetHeight < window.innerHeight + window.scrollY) {
    loadMorePokemons();
  }
});


