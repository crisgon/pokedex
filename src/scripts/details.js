const $card = document.getElementById("card-details");
const $arrowLeft = document.querySelector(".arrow-left");
const $arrowRight = document.querySelector(".arrow-right");
const $randomBtn = document.querySelector('.random');

let id = null;

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
          return `<li>
                    <img src="src/images/pokemon-types/${imgName}.png" alt="Normal">
                    <span>${type.name}</span>
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