
var apiKey = "f6e4ca85254da56ab29e62b8";
var API_URL = `https://v6.exchangerate-api.com/v6/${apiKey}`;
var myHeaders = new Headers();

myHeaders.append("apikey", apiKey);

//Elementos DOM
var div1 = document.querySelector('.divisa1');
var div2 = document.querySelector('.divisa2');
var cant = document.querySelector('.cant');
var form = document.querySelector('formulario');
var converse_field = document.querySelector('.converse_field');

var requestOptions = {
    method: 'GET',
  };
  function crearElemento(elem,div){
    var opt = document.createElement(elem);
    var opt2 = document.createElement(elem);
    opt.innerHTML = div;
    opt2.innerHTML = div;
    div1.appendChild(opt);
    div2.appendChild(opt2);
  }
  function anexarDivisa(anex){
    
    var divisas = JSON.parse(anex);
    // console.log(divisas);
   if(divisas.result === 'success'){
     for(let div in divisas.supported_codes ){
       for( var i = 0; i<divisas.supported_codes.length; i++ ){
          
          crearElemento('option',divisas.supported_codes[i][0]);
       }
      
     }
   }   
  }
  function listadoPares(){
    
    fetch(`${API_URL}codes`, requestOptions)
    .then(response => response.text())
    .then(function(divisa){
        
        anexarDivisa(divisa);
    })
    .catch(error => console.log('error', error.message));
    
    
  }
  
    [div1, div2].forEach(item =>{
      item.addEventListener('change', (event) =>{
      fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${div1.value}/${div2.value}/${cant.value}`, requestOptions)
        .then(response => response.text())
        .then( (result) => {
          var conversion = JSON.parse(result);
          converse_field.value = conversion.conversion_result;
          converse_field.style.visibility = 'visible';
        })
        .catch(error => console.log('error', error));
        event.preventDefault(); 
      });
    })
  

  listadoPares();