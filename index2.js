
///////////////////////////////////////////////////
var myReciepes=[];
// getRecipes(`pizza`);
// getRecipes(`pasta`);
var links = document.querySelectorAll('.nav-link');
for(let i=0; i<links.length; i++){
  links[i].addEventListener('click', function(e){
    if(e.target.innerHTML.toLowerCase() =='hot drinks'){
      getRecipes('hot');
    }
    else if(e.target.innerHTML.toLowerCase() =='ice drinks'){
      getRecipes('iced');

    }
    else if(e.target.innerHTML.toLowerCase() =='sweets'){
      console.log(e.target.innerHTML.toLowerCase());
    }
  })
}



async function getRecipes(meal){
  var response = await fetch(`https://api.sampleapis.com/coffee/${meal}`);
  var data = await response.json();
  myReciepes= data;
  displayData();
}

function displayData(){
    var results = ``;
    for(let i=0; i<myReciepes.length; i++){
        results+= `
        <div class="col-md-3 menu-list">
          <div class="data">
            <h4>${myReciepes[i].title} </h4>
            <div class="drinks">
              <img class="w-100" src="${myReciepes[i].image}" alt=""/>
            </div>
            <a data-bs-toggle="modal" data-bs-target="#recipeModal"
            class="btn btn-dark" onClick="openDetails(${myReciepes[i].id})">Details</a>
          </div>
        </div>
        `;
    }
    document.getElementById('demo').innerHTML= results;
}

async function openDetails(idx){
  var needed = myReciepes.find((item)=>{
    return item.id == idx;
  })
  var ingredient = needed.ingredients;
  var list ="";
  for (let i=0; i<ingredient.length; i++){
    list += `
    <li>${ingredient[i]}</li>
    `
  }
  var data = `
  <h2>${needed.title} </h2>
  <img src="${needed.image}" class="w-100" />
  <p>Description:  ${needed.description} </p>
  <div> 
     <p>Ingredients: </p> 
    <ul>
    ${list}
    </ul>
  </div>
  `
  document.getElementById('recipeData').innerHTML = data;
}

