const URL_Buscar = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2';
const url_Fav= 'https://api.thedogapi.com/v1/favourites?api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2'
const url_delete =  (id) =>`https://api.thedogapi.com/v1/favourites/${id}?api_key=live_yHwh26W5IjSNKT6C7gGVJe0EvatPTLHIPqD8Jy9fvKruBjE8h8d5gTlHDZpvnll2`


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

    bt1.onclick = () => guardarDogo(data[0].id);
    bt2.onclick = () => guardarDogo(data[1].id);
    bt3.onclick = () => guardarDogo(data[2].id);
    


}

async function guardarDogo(id){
    const res = await fetch(url_Fav, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_id: id
        }),
      });
      const data = await res.json();
    
      console.log('Save')
      console.log(res)
    
      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }else{
        loadFavDogs();
      }
    }

    async function loadFavDogs() {
      const res = await fetch(url_Fav);
      const data = await res.json();
      console.log('Favoritos')
      console.log(data)
    
      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }else{
        const section = document.getElementById('favoritesPerritos')
        section.innerHTML="";
        /*
        const h2 = document.createElement("h2");
        const h2text = document.createTextNode("Perros Favoritos");
        h2.appendChild(h2text);
        section.appendChild(h2);
*/
        data.forEach(dog => {
          
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          const btnText = document.createTextNode('Sacar al perro de favoritos');
          img.src = dog.image.url;
          img.width = 150;
          btn.appendChild(btnText);
          btn.onclick = () => deleteDog(dog.id);
          article.appendChild(img);
          article.appendChild(btn);
          section.appendChild(article);
        });
      }
    }


    async function deleteDog(id){
      const res = await fetch(url_delete(id),{
        method: 'DELETE',
        
      });
      const data = await res.json();

      if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      }else{
        console.log("perro eliminado");
        loadFavDogs();
      }
    }

    
    
  
fetchData(URL_Buscar);
loadFavDogs();

//btn.addEventListener('click', clicked);
