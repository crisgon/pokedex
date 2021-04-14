const $pokemonList = document.getElementById("pokemon-list");
const $loadMoreBtn = document.getElementById("load-more");
const $backToTopBtn = document.getElementById("back-to-top");
const $randomBtn = document.querySelector('.random');
const $searchForm = document.getElementById("search-form");

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
  <a class="card-container" href="details.html?id=${pokemon.number}">
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
  </a>
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

$randomBtn.addEventListener('click', () => {
  const id = Math.round(Math.random() * 932);

  location.href = `details.html?id=${id}`;
});

$searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let pokeName = e.target[0].value;

  location.href = `details.html?name=${pokeName}`;
});








const types = {
  "Normal" : "#6d6d4e",
  "Fire": "#f08030",
  "Fighting": "#c03028",
  "Water": "#6890f0",
  "Flying": "#a890f0",
  "Grass": "#78c850",
  "Poison": "#a040a0",
  "Electric": "#f8d030",
  "Ground": "#e0c068",
  "Psychic": "#f85888",
  "Rock": "#b8a038",
  "Ice": "#98d8d8",
  "Bug": "#a8b820",
  "Dragon": "#7038f8",
  "Ghost": "#705898",
  "Dark": "#705848",
  "Steel": "#b8b8d0",
  "Fairy": "#ee99ac",
}    
