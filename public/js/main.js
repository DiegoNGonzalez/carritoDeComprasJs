//instanciando pantallas, contenedores, y botones

let sections = document.querySelectorAll("section");
let sectionLoading = document.getElementById("sectionLoading");
let sectionSplash = document.getElementById("sectionSplash");
let sectionCategorias = document.getElementById("sectionCategorias");
let sectionProductos = document.getElementById("sectionProductos");
let divProductos = document.getElementById("divProductos");
let header = document.getElementById("header");
let footer = document.querySelector("footer");
let sectionElectro = document.getElementById("sectionElectro");
let divElectro = document.getElementById("divElectro");
let btnElectro = document.getElementById("btnElectro");
let ulCarrito = document.getElementById("ulCarrito");
let totalCompra = document.getElementById("totalCompra");
let contadorCarrito = document.getElementById("contadorCarrito");
let btnComprarCarrito = document.getElementById("btnComprarCarrito");

//instancio arrays y variables numericas
let nroRandom = 0;
let directorioInterno = "";
let direccion = "";
let arrayProductos = [];
let array0 = [];
let array1 = [];
let array2 = [];
let array3 = [];
let guardado = [];
let arrayCarrito = [];
let productosCarrito = [];
let numeroCompra = 0;

//funcion para sacar numero random
let sacoUnRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

//funcion para cargar las categorias en el home una vez lista la api
let apiLista = (res) => {
    const padre = document.getElementById("divCategorias");
    padre.classList.add("row");
    for (categorias of res) {
        const modelo = `<div class="col-md" id = ${res.indexOf(categorias)}>
    <img data-title ='${res.indexOf(categorias)}' src="./img/${res.indexOf(
            categorias
        )}.jpg" alt="">
    <h2 data-title ='${res.indexOf(categorias)}'>${categorias}</h2>
    </div>`;
        padre.innerHTML += modelo;
        showPages();
    }
};
//funcion para cargar un producto random en el Splash
let productoSplash = (json) => {
    nroRandom = sacoUnRandom(0, 19);
    arrayProductos = json;
    const modeloSplash = `<div class="divSplash"> <img class="imgSplash" src="${json[nroRandom].image}" alt=""></div>
    <div class="divSplashTxt">
        <h2>${json[nroRandom].title}</h2>
        <p>${json[nroRandom].description}</p>
        <h3>$ ${json[nroRandom].price}   </h3>
        <button id="btnComprar" class="btnComprar"onClick="sumarAlCarrito('${json[nroRandom].id}')">COMPRAR</button>
    </div>
    `;
    sectionSplash.innerHTML = modeloSplash;
    detalleCategoria(arrayProductos);
};
//consumo api para obtener productos
fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => productoSplash(json));
//consumo api para obtener categorias
fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((res) => apiLista(res));
//funcion para guardar productos en su categoria correspondiente
let detalleCategoria = (arrayProductos) => {
    for (let producto of arrayProductos) {
        if (producto.category == "electronics") {
            array0.push(producto);
            localStorage.setItem("array0", JSON.stringify(array0));
        } else if (producto.category == "jewelery") {
            array1.push(producto);
            localStorage.setItem("array1", JSON.stringify(array1));
        } else if (producto.category == "men's clothing") {
            array2.push(producto);
            localStorage.setItem("array2", JSON.stringify(array2));
        } else {
            array3.push(producto);
            localStorage.setItem("array3", JSON.stringify(array3));
        }
    }
};
//listener para ir a cada categoria
sectionCategorias.addEventListener("click", (e) => {
    e.preventDefault();
    directorioInterno = e.target.attributes[0].value;
    categoria = "array" + directorioInterno;
    productosPorCategoria(categoria);
});
//funcion para mostrar paginas
let showPages = () => {
    sectionLoading.style.display = "none";
    sectionProductos.style.display = "none";
    sectionSplash.style.display = "flex";
    sectionCategorias.style.display = "flex";
    header.style.display = "flex";
    contadorCarrito.style.display = "block";
    footer.style.display = "flex";
    sectionCarrito.style.display = "none";
};
//funcion para apagar sections
let apagarSections = (sectionPrendido) => {
    sectionSplash.style.display = "none";
    sectionCategorias.style.display = "none";
    sectionCarrito.style.display = "none";
    sectionProductos.style.display = "none";
    sectionPrendido.style.display = "flex";
};

let productosPorCategoria = (categoria) => {
    guardado = JSON.parse(localStorage.getItem(categoria));
    divProductos.innerHTML = "";
    for (producto of guardado) {
        const modeloProductos = `<div class="col-md-3">
    <div class="imagenProducto"><img src="${producto.image}" class="card-img-top" alt="${producto.image}"></div>
    <div class="card-body">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text">$ ${producto.price} </p>
    </div>
    <button id="btnComprar${producto.id}" class="btnComprar" onClick="sumarAlCarrito('${producto.id}')">COMPRAR</button>
</div>`;
        divProductos.innerHTML += modeloProductos;
    }
    apagarSections(sectionProductos);
};
//funcion para agregar contador al carrito
let sumarAlCarrito = (id) => {
    arrayCarrito.push(arrayProductos[id - 1]);
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    numeroCompra = arrayCarrito.length;
    contadorCarrito.innerHTML = numeroCompra;
};
//funcion para agregar a la lista del carrito + suma de precios
let funcionCarrito = () => {
    ulCarrito.innerHTML = "";
    let productosCarrito = JSON.parse(localStorage.getItem("arrayCarrito"));
    apagarSections(sectionCarrito);
    let sumaPrecio = 0;
    for (producto of productosCarrito) {
        sumaPrecio += producto.price;
        const modeloCarrito = `<li class="list-group-item">
            <div class="detalleCarrito">
                <img src="${producto.image}" alt="">
                <div class="tituloDetalleCarrito">
                    <h4>${producto.title}</h4>
                </div>
                <p>$ ${producto.price}</p>
            </div>
            </li>
            `;
        ulCarrito.innerHTML += modeloCarrito;
    }
    let modeloTotal = `TOTAL $ ` + sumaPrecio.toFixed(2);
    totalCompra.innerHTML = modeloTotal;
    numeroCompra = productosCarrito.length;
    contadorCarrito.innerHTML = numeroCompra;
};
//funcion para vaciar carrito y localStorage una vez realizada la compra
let vaciarCarritoYLocal = () => {
    arrayCarrito = [];
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
    ulCarrito.innerHTML = "";
    contadorCarrito.innerHTML = "";
    totalCompra.innerHTML = "TOTAL $000000";
};

//btn para finalizar proceso
btnComprarCarrito.addEventListener("click", () => {
    alert("Gracias por tu compra :)");
    vaciarCarritoYLocal();
});
