<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <label for="pokemon-select">Select a Pokemon </label>
  <select id="pokemon-select"></select>
  <div id="display-details"></div>
  <script>
    const pokemonSelect = document.getElementById("pokemon-select");
     const pokemonDetails = document.getElementById("display-details");
    
    const callApi =async()=>{
      try{
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await resp.json();
        return data;
      }
      catch(e){
        console.log(e);
        
      }
    };
    
    const display = (abilities)=>{
      const abilityName = abilities.map(val=>val.ability.name).join(',');
      console.log(abilityName)
      const detailHtml =`<h1>Ability of pokemon </h1>
                          <p>Ability: ${abilityName}</p>`;
      
      pokemonDetails.innerHTML = detailHtml;
    }
    
    const  initialize= async()=>{
      const finalValue = await callApi();
     if(finalValue && finalValue.results){
       for(const pokemon of finalValue.results ){
         const option = document.createElement("option");
         option.value = pokemon.url;
         option.textContent = pokemon.name;
         pokemonSelect.appendChild(option);
       }
     }
      
      pokemonSelect.addEventListener('change',async function(){
        console.log(pokemonSelect.value)
        try{
          const respDetails = await fetch(pokemonSelect.value);
          const pokenDetailsValue = await respDetails.json();
          
          const abilities = pokenDetailsValue.abilities;
          display(abilities)
        }
        catch(e){
          
        }
      })
    }
    
    
//fetch(url).then(val=>val.json()).then(data=>const val = data)
    
    
    
    initialize();
    
  </script>

</body>
</html>
