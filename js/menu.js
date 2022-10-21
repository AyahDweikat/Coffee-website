var sweetlist = JSON.parse(localStorage.getItem("sweetList"));
console.log(sweetlist);



var myDrinks=[];
var links = document.querySelectorAll('.nav-link');
for(let i=0; i<links.length; i++){
  links[i].addEventListener('click', function(e){
    if(e.target.innerHTML.toLowerCase() =='hot drinks'){
      getDrinks('hot');
    }
    else if(e.target.innerHTML.toLowerCase() =='ice drinks'){
      getDrinks('iced');

    }
    else if(e.target.innerHTML.toLowerCase() =='sweets'){
      getSweets();
    }
  })
}
function getSweets(){
  myDrinks = sweetlist;
  var results = ``;
    for(let i=0; i<myDrinks.length; i++){
        results+= `
        <div class="col-md-3 menu-list">
          <div class="data menu-item">
            <h4>${myDrinks[i].name} </h4>
            <div class="drinks">
              <img class="w-100" src="${myDrinks[i].img}" alt=""/>
            </div>
            <a data-bs-toggle="modal" data-bs-target="#recipeModal"
            class="btn btn-dark more" onClick="openDetailsweet(${i})">See more</a>
          </div>
        </div>
        `;
    }
    document.getElementById('demo').innerHTML= results;
}

function openDetailsweet(id){
  
  var needed = myDrinks.find((item, idx)=>{
    return idx==id;
  })
  console.log(needed);
  var data = `
  <h2>${needed.name} </h2>
  <img src="${needed.img}" class="" />
  <p class="desc">Description:  ${needed.desc} </p>
  
  `
  document.getElementById('recipeData').innerHTML = data;
}


async function getDrinks(coffee){
  var response = await fetch(`https://api.sampleapis.com/coffee/${coffee}`);
  var data = await response.json();
  myDrinks= data;
  displayData();
}

function displayData(){
    var results = ``;
    for(let i=0; i<myDrinks.length; i++){
        results+= `
        <div class="col-md-3 menu-list">
          <div class="data menu-item">
            <h4>${myDrinks[i].title} </h4>
            <div class="drinks">
              <img class="w-100" src="${myDrinks[i].image}" alt=""/>
            </div>
            <a data-bs-toggle="modal" data-bs-target="#recipeModal"
            class="btn btn-dark more" onClick="openDetails(${myDrinks[i].id})">See more</a>
          </div>
        </div>
        `;
    }
    document.getElementById('demo').innerHTML= results;
}

async function openDetails(idx){
  var needed = myDrinks.find((item)=>{
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
  <img src="${needed.image}" class="" />
  <p class="desc">Description:  ${needed.description} </p>
  <div> 
     <p class="ingredients">Ingredients: </p> 
    <ul>
    ${list}
    </ul>
  </div>
  `
  document.getElementById('recipeData').innerHTML = data;
}

