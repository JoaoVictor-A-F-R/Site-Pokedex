const pegarIdPokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.id)
}

const pegarNomePokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.name)
}

const pegarTipoPokemon = async pokemons =>{
    return pokemons.map(objeto => objeto.types.map(tipos => tipos.type.name))
}

const pegarAlturaPokemon = async pokemons =>{
    const alturas = pokemons.map(objeto => objeto.height / 10)
    return alturas
}

const pegarPesoPokemon = async pokemons =>{
    const pesos = pokemons.map(objeto => objeto.weight / 10)
    return pesos
}

const pegarStatusPokemon = async pokemons =>{
    const todosStatus = pokemons.map(objeto => objeto.stats)
    return todosStatus
}


const filtroInfoPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
        if(!response.ok){
            throw Error('Não foi possível obter dados da url')
        }

        const {results: apiPokemonResultados} = await response.json()
        const promises = apiPokemonResultados.map(results => fetch(results.url))
        const responses = await Promise.allSettled(promises)
        const fulfilled = responses.filter(responses => responses.status === 'fulfilled')
        const pokePromises = fulfilled.map(urls => urls.value.json())
        const pokemons = await Promise.all(pokePromises)
        const arrPokemons = [await pegarIdPokemon(pokemons), 
            await pegarNomePokemon(pokemons), 
            await pegarTipoPokemon(pokemons), 
            await pegarAlturaPokemon(pokemons), 
            await pegarPesoPokemon(pokemons),
            await pegarStatusPokemon(pokemons)]
        return arrPokemons

    } catch (error) {
        console.log('algo deu erado', error)
    }
}

const calculoStatus = valor =>{
    return (100 * valor) / 161
}

const renderPokemon = pokemons => {
    const container = document.querySelector(".contPkm")
    const fragmento = document.createDocumentFragment()

    for(i = 0; i < pokemons[0].length; i++){
        const mapPokemons = pokemons.map(element => element[i])
        const card = document.createElement('div')
        card.classList.add('card')
        const frente = document.createElement('div')
        frente.classList.add('frente')
        const top = document.createElement('div')
        top.classList.add('top')
        const id = document.createElement('p')
        id.textContent = mapPokemons[0] < 10 ? "#000" + mapPokemons[0] : mapPokemons[0] < 100 ? "#00" + mapPokemons[0] : mapPokemons[0] < 1000 ? "#0" + mapPokemons : "#" + mapPokemons
        const img = document.createElement('img')
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ mapPokemons[0] +'.png'
        const bot = document.createElement('div')
        bot.classList.add('bot')
        const nome = document.createElement('p')
        nome.textContent = mapPokemons[1][0].toUpperCase() + mapPokemons[1].slice(1)
        const infoPokemon = document.createElement('div')
        infoPokemon.classList.add('infoPokemon')
        const tipo1 = document.createElement('p')
        tipo1.textContent = mapPokemons[2][0]
        tipo1.style.backgroundColor = 'var(--'+ mapPokemons[2][0]+')'
        tipo1.classList.add('tipo')
        const altura = document.createElement('p')
        altura.textContent = "Altura: "+mapPokemons[3] +' m'
        const peso = document.createElement('p')
        peso.textContent = "Peso: "+mapPokemons[4] +' kg'

        frente.append(top, bot)
        top.append(id, img)
        bot.append(nome, infoPokemon)
        infoPokemon.appendChild(tipo1)
        if (mapPokemons[2].length == 2){
            const tipo2 = document.createElement('p')
            tipo2.textContent = mapPokemons[2][1]
            tipo2.classList.add('tipo')
            tipo2.style.backgroundColor = 'var(--'+ mapPokemons[2][1]+')'
            infoPokemon.append(tipo2)
        }else{
            tipo1.style.gridColumnStart = 1
            tipo1.style.gridColumnEnd = 3
        }
        infoPokemon.append(altura, peso)

        const verso = document.createElement('div')
        verso.classList.add('verso')
        const top2 = document.createElement('div')
        top2.classList.add('top')
        top2.append(id.cloneNode(true), nome.cloneNode(true), img.cloneNode(true))
        const bot2 = document.createElement('div')
        bot2.classList.add('bot')
        const textoStatus = document.createElement('p')
        textoStatus.textContent = "STATUS"
        const stats = document.createElement('div')
        stats.classList.add('status')
        const vida = document.createElement('p')
        vida.textContent = "VID "+mapPokemons[5][0]['base_stat']
        const atq = document.createElement('p')
        atq.textContent = "ATQ "+mapPokemons[5][1]['base_stat']
        const def = document.createElement('p')
        def.textContent = "DEF "+mapPokemons[5][2]['base_stat']
        const spa = document.createElement('p')
        spa.textContent = "SPA "+mapPokemons[5][3]['base_stat']
        const spd = document.createElement('p')
        spd.textContent = "SPD "+mapPokemons[5][4]['base_stat']
        const vel = document.createElement('p')
        vel.textContent = "VEL "+mapPokemons[5][5]['base_stat']
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')
        const div4 = document.createElement('div')
        const div5 = document.createElement('div')
        const div6 = document.createElement('div')
        div1.classList.add('statusBar')
        div1.style.width =  ''+ calculoStatus(mapPokemons[5][0]['base_stat']) +'%'
        div2.classList.add('statusBar')
        div2.style.width =  ''+ calculoStatus(mapPokemons[5][1]['base_stat']) +'%'
        div3.classList.add('statusBar')
        div3.style.width =  ''+ calculoStatus(mapPokemons[5][2]['base_stat']) +'%'
        div4.classList.add('statusBar')
        div4.style.width =  ''+ calculoStatus(mapPokemons[5][3]['base_stat']) +'%'
        div5.classList.add('statusBar')
        div5.style.width =  ''+ calculoStatus(mapPokemons[5][4]['base_stat']) +'%'
        div6.classList.add('statusBar')
        div6.style.width =  ''+ calculoStatus(mapPokemons[5][5]['base_stat']) +'%'
        
        stats.append(vida, div1, atq, div2, def, div3, spa, div4, spd, div5, vel, div6)
        bot2.append(textoStatus, stats)
        verso.append(top2, bot2)
        card.append(frente, verso)
        fragmento.append(card)
    }
    container.append(fragmento)
    flip()
}

const metodoCriadorPokemon = async () => {
    const pokemons = await filtroInfoPokemons()
    renderPokemon(pokemons)
}

metodoCriadorPokemon()

function flip(){
    const cards = document.querySelectorAll('.card')
    console.log(cards)
    cards.forEach(card => {
        card.addEventListener('click', () =>{
            card.classList.toggle('flip')
        })
    });
}