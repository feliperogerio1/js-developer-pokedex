const urlParams = new URLSearchParams(window.location.search)
const selectedPokemonId2 = urlParams.get('id')

function convertPokemonToDetails1(pokemon) {
    return `
        <img id="btn-return" src="assets/images/seta-esquerda.png" alt="seta">
        <div class="top-div ${pokemon.type}">
            <h1 class="name">${pokemon.name}</h1>
            <p class="number">#${pokemon.number}</p>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
        </div>
        <img class="pokemon-image" src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="bottom-div">
            <ul class="nav-bar">
                <li>Base stats</li>
            </ul>
            <div class="container-stats">
                <div class="div-stats">
                    <ul class="stats">
                        <li>HP</li>
                        <li>Attack</li>
                        <li>Defense</li>
                        <li>Sp. Atk</li>
                        <li>Sp. Def</li>
                        <li>Speed</li>
                        <li>Total</li>
                    </ul>
                    <ul class="stats-result">
                        <li>${pokemon.hp}</li>
                        <li>${pokemon.attack}</li>
                        <li>${pokemon.defense}</li>
                        <li>${pokemon.spAttack}</li>
                        <li>${pokemon.spDefense}</li>
                        <li>${pokemon.speed}</li>
                        <li>${pokemon.total}</li>
                    </ul>
                    <ul class="div-progress">
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="hp"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="atk"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="def"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="spAtk"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="spDef"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="spd"></div></div>
                        </li>
                        <li>
                            <div class="progress-bar"><div class="progress ${pokemon.type}" id="tot"></div></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `
}

function loadPokemonDetail(selectedPokemonId2) {
    pokeApi.getPokemonDetailById(selectedPokemonId2).then((pokemon) => {
        const newDetail = convertPokemonToDetails1(pokemon)
        pokemonDetail.innerHTML = newDetail
        const returnButton = document.getElementById('btn-return')
        returnButton.addEventListener('click', returnB)
        document.getElementById('hp').style.width = pokemon.hp + "%";
        document.getElementById('atk').style.width = pokemon.attack + "%";
        document.getElementById('def').style.width = pokemon.defense + "%";
        document.getElementById('spAtk').style.width = pokemon.spAttack + "%";
        document.getElementById('spDef').style.width = pokemon.spDefense + "%";
        document.getElementById('spd').style.width = pokemon.speed + "%";
        document.getElementById('tot').style.width = "100%";
    })
}

loadPokemonDetail(selectedPokemonId2);

function returnB() {
    const urlRetunr = 'index.html';
    window.location.href = urlRetunr;
}