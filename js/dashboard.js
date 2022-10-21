var sweetName=document.getElementById("sweetName");
var sweetImgId = document.getElementById("sweetImgId")
var sweetImgC=document.getElementsByClassName("sweetImgC");//
var sweetDesc=document.getElementById("sweetDesc");
var addBtn = document.getElementById("click");
var deleteBtn = document.getElementById("deleteBtn");
var data = document.getElementById("data");
var sweets;
var nameAlert = document.getElementById("nameAlert");

var currentIndex;
if(localStorage.getItem("sweetList") == null){
    sweets = [];
}else{
    sweets = JSON.parse(localStorage.getItem("sweetList"));
    displayData();
}


addBtn.onclick = function(){
    if(addBtn.innerHTML=='Add Sweet'){
        addImage(function(base64) {
            addSweet(base64);
            displayData();
            clear();
        });
    }else{
        updateSweet();
        addImage(function(base64) {
            updateSweet(base64);
            displayData();
            clear();
        });
        addBtn.innerHTML ="Add Sweet";
    }
}
function addSweet(imgSweet,){
    var sweet = {
        name:sweetName.value,
        img:imgSweet,
        desc:sweetDesc.value
    };
    sweets.push(sweet);
    localStorage.setItem("sweetList",JSON.stringify(sweets));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'sweets added successfully',
        showConfirmButton: false,
        timer: 2500
    })
}


function addImage(onLoadSuccess) {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        function() {
            // convert image file to base64 string
            onLoadSuccess(reader.result);
        },
        false
    );
    if (file) {
        reader.readAsDataURL(file);
    } else {
        onLoadSuccess();
    }
}
function displayData(){
    var result = "";
    for(var i=0;i<sweets.length;i++){
        result += `<tr>
          <td>${i+1}</td>
          <td>${sweets[i].name}</td>
          
          <td><img src="${sweets[i].img}" class="" alt=""></td>
          
          
          <td>${sweets[i].desc}</td>
          <td> 
          <button onclick="getSweetData(${i})" class="btn btn-outline-info">update</button>
          <button onclick="deleteSweet(${i})" class="btn btn-outline-danger">delete</button>
          </td>
        </tr>`; 
    }
    data.innerHTML=result;
}
function clear(){
    if(addBtn.innerHTML !='Add Sweet'){
        addBtn.innerHTML ="Add Sweet";
    }
    sweetName.value = "";
    sweetDesc.value = "";
}
//deleteSweet
function deleteSweet(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            sweets.splice(index,1);
          localStorage.setItem("sweetList",JSON.stringify(sweets));
          displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}
 // delete all
deleteBtn.onclick=function(){

    Swal.fire({
        title: 'Are you sure to delete all list?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('sweetList');
            sweets=[];
            data.innerHTML="";
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


    
}
//search
function search(e){
    var result = "";
    for(var i=0;i<sweets.length;i++){
        if(sweets[i].name.toLowerCase().includes(e.toLowerCase())){
            result += `<tr>
                <td>${i+1}</td>
                <td>${sweets[i].name}</td>
                <td><img src="${sweets[i].img}" class="" alt=""></td>
                <td>${sweets[i].desc}</td>
                <td> 
                <button onclick="getSweetData(${i})" class="btn btn-outline-info">update</button>
                <button onclick="deleteSweet(${i})" class="btn btn-outline-danger">delete</button>
                </td>
            </tr>`; 
        }
    }
    data.innerHTML=result; 
}
 //give the data
function getSweetData(index,imgSweet){
    var sweet = sweets[index];
    sweetName.value=sweet.name;
    sweetDesc.value=sweet.desc;
    addBtn.innerHTML='update sweet';
    currentIndex=index;
    sweetImgId.value=imgSweet;
}
//update the data
function updateSweet(imgSweet){
    var sweet = {
        name:sweetName.value,
        desc:sweetDesc.value,
        img:imgSweet,
     };
     sweets[currentIndex].name = sweet.name;
     sweets[currentIndex].img = sweet.img;
     sweets[currentIndex].desc = sweet.desc;
     localStorage.setItem("sweetList",JSON.stringify(sweets));
     displayData(sweet.img);
}
sweetName.onkeyup = function(){
    var namePattern = /^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(sweetName.value)){
        addBtn.removeAttribute("disabled");
        sweetName.classList.add('is-valid');
        sweetName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }else{
        addBtn.setAttribute("disabled","disabled");
        sweetName.classList.add('is-invalid');
        sweetName.classList.remove('is-valid');
        sweetName.classList.replace('is-valid','is-invalid');
        nameAlert.classList.add('d-block');
        nameAlert.classList.remove('d-none');
    }
}