const URL_Buscar = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2';
const url_Fav= 'https://api.thedogapi.com/v1/favourites?api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2'
const api_key ='api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2'
const btn= document.querySelector(".button");
const spanError = document.getElementById('error')
async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data= await response.json();
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    console.log(data);
    img1.src= data[0].url;
    img2.src= data[1].url;
    img3.src= data[2].url;
}

async function guardarDogo(){
    const res = await fetch(url_Fav, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: 'HJ7Pzg5EQ'
        }),
      });
      const data = await res.json();
    
      console.log('Save')
      console.log(res)
    
      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }
    }

    async function loadFavDogs() {
      const res = await fetch(url_Fav);
      const data = await res.json();
      console.log('Favoritos')
      console.log(data)
    
      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }
    }

    loadFavDogs()
fetchData(URL_Buscar);

//btn.addEventListener('click', clicked);
