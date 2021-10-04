const pokemonContainer = document.querySelector('.pokemon-container');

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createPokemon(data);
    });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let randomNum = randomInt(0, 266);

function fetchPokemons(number) {
  for (let i = 1; i<= number; i++) {
    fetchPokemon(randomNum++);
  }
}

function refresh(){
  window.location.reload("Refresh")
}

function createPokemon(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon-block');

  const spriteContainer = document.createElement('div');
  spriteContainer.classList.add('img-container');

  const sprite = document.createElement('img');
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement('p');
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement('p');
  name.classList.add('name');
  name.textContent = pokemon.name;

  
  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  pokemonContainer.appendChild(card);

  for (let k = 0; k<= 6; k++){
    const stats = document.createElement('p')
    stats.classList.add('stats');
    stats.textContent = `${pokemon.stats[k].stat.name}: ${pokemon.stats[k].base_stat}`;
    card.appendChild(stats);
  }
}

fetchPokemons(6);