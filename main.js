const URL = 'https://api.thedogapi.com/v1/images/search';
const btn= document.querySelector(".button");

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const img = document.querySelector(".img");
    const data= await response.json();
    img.src= data[0].url;
}


function clicked(){
    return fetchData(URL);
}

fetchData(URL);

btn.addEventListener('click', clicked);
