const $card = document.getElementById("card-details");
const $arrowLeft = document.querySelector(".arrow-left");
const $arrowRight = document.querySelector(".arrow-right");
const $randomBtn = document.querySelector('.random');
const $searchForm = document.getElementById("search-form");

let id = null;

const typesColors = {
  "normal" : "#6d6d4e",
  "fire": "#f08030",
  "fighting": "#c03028",
  "water": "#6890f0",
  "flying": "#a890f0",
  "grass": "#78c850",
  "poison": "#a040a0",
  "electric": "#f8d030",
  "ground": "#e0c068",
  "psychic": "#f85888",
  "rock": "#b8a038",
  "ice": "#98d8d8",
  "bug": "#a8b820",
  "dragon": "#7038f8",
  "ghost": "#705898",
  "dark": "#705848",
  "steel": "#b8b8d0",
  "fairy": "#ee99ac",
}    


async function getPokemonDetails(id) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());

  inserCardIntoHTML(generateCard(data));
}

function inserCardIntoHTML(cardContent) {
  $card.innerHTML = cardContent;
}

function generateCard(pokemon) {
  const stats = {
    "attack": "Atk",
    "hp": "Hp",
    "defense": "Def",
    "special-attack": "Sp.Atk",
    "special-defense": "Sp.Def",
    "speed": "Speed"
   };

  return `
    <header class="card-details-header">
      <h1>${pokemon.name}</h1>
      <span>#${pokemon.id}</span>

      <ul class="pokemon-types">
        ${pokemon.types.map(({ type }) => {
          const imgName = type.name.charAt().toUpperCase() + type.name.substr(1);
          return `<li style="border-color: ${typesColors[type.name]}">
                    <img src="src/images/pokemon-types/${imgName}.png" alt="Normal">
                    <span style="background-color: ${typesColors[type.name]}">${type.name}</span>
                  </li>`
        }).join("")}
      </ul>
    </header>

    <div class="pokemon-photo">
      <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
    </div>

    <p class="pokemon-basic-info">
      <span>
        <strong>Weigth:</strong>
        ${pokemon.weight}kg
      </span>

      <span>
        <strong>Height:</strong>
        ${pokemon.height}m
      </span>
    </p>

    <ul class="pokemon-stats">
     ${pokemon.stats.map(item => `<li>${item.base_stat} <p>${stats[item.stat.name]}</p></li>`).join("")}
    </ul>

    <a href="https://www.pokemon.com/us/pokedex/${pokemon.name}" target="_blank">
      More about this pokemon
    </a>
  `
}

window.addEventListener('load', () => {
  const [_, pokeid] = window.location.search.split("=");

  getPokemonDetails(pokeid);

  id = pokeid;

});

window.addEventListener('popstate', () => {
  const [_, pokeid] = window.location.search.split("=");

  getPokemonDetails(pokeid);

  id = pokeid;
});

$arrowLeft.addEventListener('click', () => {
  if(id === 1) {
    return;
  }

  id = Number(id) - 1;
  history.pushState({}, '', `details.html?id=${id}`);
  getPokemonDetails(id);
});

$arrowRight.addEventListener('click', () => {
  if(id === 1) {
    return;
  }

  id = Number(id) + 1;
  history.pushState({}, '', `details.html?id=${id}`);
  getPokemonDetails(id);
});

$randomBtn.addEventListener('click', () => {
  const id = Math.round(Math.random() * 932);

  history.pushState({}, '', `details.html?id=${id}`);
  getPokemonDetails(id);
});

$searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let pokeName = e.target[0].value;

  location.href = `details.html?name=${pokeName}`;
});
