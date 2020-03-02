
let peliculas = [];

let types = ["Movie", "Series","Game"];

function obtenerDatos(){
  fetch('/pelicula').then(function(response){
    if(response.ok){
      response.json().then(function(datos){
        peliculas = datos;
        renderizarPelicula();
      })
    }
  })
}

obtenerDatos();

function renderizarPelicula(){
    let aDibujar =[]
    peliculas.forEach(function(itemPelicula, index){
        aDibujar.push(`
        <div class="col-lg-4">
            <div class="card" >
                <img src="${itemPelicula.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${itemPelicula.Title}</h5>
                    <p class="card-text">${itemPelicula.Type} - ${itemPelicula.Year}</p>
                    <button type="button" class="btn btn-primary" onclick="cargarInfoYMostrarFormulario(${index})">Editar</a>
                    <button type="button" class="btn btn-danger" onclick="eliminar(${itemPelicula.imdbID})">Eliminar</a>
                </div>
            </div>
        </div>`)
    });
    document.getElementById('peliculas').innerHTML = aDibujar.join("");
}
renderizarPelicula();

let showTypes = [];

types.forEach((e)=>{
    showTypes.push(`
    <option value="${e}">${e}</option>`
)});

showTypes.unshift(`<option disabled selected value> -- selecciona una opción -- </option>`);

document.getElementById('Type').innerHTML = showTypes.join("");

async function guardar(event){    
    event.preventDefault();
    let pelicula = {
        Title: document.getElementById('Title').value,
        Year: document.getElementById('Year').value,
        Type: document.getElementById('Type').value,
        Poster: document.getElementById('Poster').value
        
    }

    let imdbID = document.getElementById('imdbID').value;

    if(imdbID === ""){
        try{
            let response = await fetch('/pelicula', {
            method: 'POST',
            body: JSON.stringify(pelicula),
            headers: {
                "Content-Type":"application/json"
            }
            });
            if (response.ok){
                let data = await response.json();
                alert(data.mensaje);
            }
        } catch(error){
            alert(error.message);
        }
    } else {
        //peliculas[indice] = pelicula;
        try{
            let response = await fetch('/pelicula', {
            method: 'PUT',
            body: JSON.stringify({...pelicula, imdbID}),
            headers: {
                "Content-Type":"application/json"
            }
            });
            if (response.ok){
                let data = await response.json();
                alert(data.mensaje);
            }
        } catch(error){
            alert(error.message);
        }
    } 
    obtenerDatos();
    //renderizarPelicula();
    $('#formulario').modal('hide');
    
    event.target.reset();
}

function cargarInfoYMostrarFormulario(index){
    let elementoSeleccionado = peliculas[index];
    document.getElementById('imdbID').value = elementoSeleccionado.imdbID;
    document.getElementById('Title').value = elementoSeleccionado.Title;
    document.getElementById('Year').value = elementoSeleccionado.Year;
    document.getElementById('Type').value = elementoSeleccionado.Type;
    document.getElementById('Poster').value = elementoSeleccionado.Poster;
    $('#formulario').modal('show');
}

function borrarPelicula(event){    
  event.preventDefault();  
  peliculas.splice(document.getElementById('indice').value,1);
  renderizarPelicula();  
}

async function eliminar(imdbID) {
    try {
            let response = await fetch('/pelicula/' + imdbID, {
            method: 'DELETE'
            });
            if(response.ok){
                let data = await response.json();
                alert(data.mensaje);            
            }
       } catch(error){
           alert(error.message);       
       }   
       
       obtenerDatos();
}