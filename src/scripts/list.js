const $pokemonList = document.getElementById("pokemon-list");
const $loadMoreBtn = document.getElementById("load-more");
const $backToTopBtn = document.getElementById("back-to-top");

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

function goToPokemonPage(id) {

  location.href = `details.html?id=${id}`;
}


function generatePokemonCard(pokemon) {
  return `
  <div class="card-container" onclick="goToPokemonPage(${pokemon.number})">
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

function backToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'})
}


$backToTopBtn.addEventListener("click", backToTop);

$loadMoreBtn.addEventListener("click", () => {
  getAndPopulatePokeList({offset, limit});
  $loadMoreBtn.style.display = 'none';
});

window.addEventListener("load", () => getAndPopulatePokeList({offset, limit}));

window.addEventListener("scroll", () => {
  $backToTopBtn.style.opacity = 1;
  $backToTopBtn.style.bottom = '50px';
  
  if(window.scrollY === 0) {
    $backToTopBtn.style.opacity = 0;
    $backToTopBtn.style.bottom = '-50px';
  }

  if(document.body.offsetHeight < window.innerHeight + window.scrollY) {
    loadMorePokemons();
  }
});


