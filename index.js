const items = document.getElementById('items');
const card = document.getElementById('card-template').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();

})



const fetchData = async () => {
    try {
        const strapi_api = await fetch('https://strapi.armar.ar/productos');
        const datos_strapi = await strapi_api.json();
        crear_array(datos_strapi);
        completarCards(datos_strapi);
    } catch(error) {
        console.log(error)

    }
}

var arr = [];
var desc = [];


const crear_array = datos_strapi => {
    datos_strapi.forEach(product => {
        let cant = product.foto.length;
        //let id = producto.id;
        if (cant !== 0) {
                arr.push(product.id);
                desc.push(product.descripcion);       
        };
    });
    console.log(arr);
    console.log(desc);
    
};

const completarCards = datos_strapi => {
    datos_strapi.forEach(producto => {

        let cant = producto.foto.length;
        let cont = 0;
        //let id = producto.id;
        if (cant !== 0) {
            let idlevy= producto.id;
            
            card.querySelector('h5').textContent = producto.nombre;
            //let modal = 'modal_id_'+producto.id;
            //card.querySelector('p').textContent = arr[cont];
            console.log('testeo' + idlevy);
            card.querySelector('p').textContent = idlevy;
            idlevy = undefined;
            console.log('testeo ' + idlevy)
            card.querySelector('a').setAttribute('href', producto.uri);
            card.querySelector('img').setAttribute('src', 'https://armar.ar/src/images/products/' + producto.foto[0].name);
            //console.log(producto.nombre + ' ' + producto.foto[0].name)

            
            console.log(producto.descripcion);            
            const clone = card.cloneNode(true)
            
            fragment.appendChild(clone);
            cont = cont +1;
        } 
        
    })
    items.appendChild(fragment)
}

