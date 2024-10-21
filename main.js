function app(){
    let image=Array.from(document.getElementsByClassName('img1'));
    let galeria = document.getElementById('boxGaleria');
    let contenedor = document.getElementById('contenedor');

    let cerrar = document.getElementById('cerrar')
    let btnIzquierdo = document.getElementById('izquierda');
    let btnDerecho = document.getElementById('derecha');

    let imgbx = document.getElementById('imgbx');
    let estilos1 = window.getComputedStyle(contenedor);
    let estilos2 = window.getComputedStyle(imgbx);

    //---- funcion para mostrar la imagen en detalle al hacer click sobre ella
    function mostrarGaleria(event){
        let elementoClicado = event.target.id;
        let margen = -100*parseInt(elementoClicado);//--- Se calcula el margen para posicionar el contenedor al nivel de la imagen seleccionada
        galeria.style.display = "block";
        contenedor.style.marginLeft = `${margen}%`;
    }


    //---funcion para obtener algunas dimenciones de la galeria
    function dimencionGaleria(){
        let anchoContenedor = parseInt(estilos1.getPropertyValue('width'));//Se obtiene el ancho del contenedor
        let anchoImagen = parseInt(estilos2.getPropertyValue('width')); //se obtiene el ancho de cada elemento li de la imagen
        let margenActual = parseInt(estilos1.getPropertyValue('margin-left'));//margen izquierdo acual del contenedor
        let cantidadImagenes = contenedor.getElementsByTagName("li").length;//Cuantas imagenes tiene la galeria
        let margenActPorcen = ((margenActual)*cantidadImagenes*100)/anchoContenedor;//Se pasa el margen izquierdo de pixeles a porcentaje.
        return [anchoContenedor, anchoImagen, margenActPorcen, margenActual];
    }

    function pasarImagen(event){
        let dimenciones = dimencionGaleria();
        console.log("dimencionGaleria()[2]", dimenciones[2]);
        let direccion = event.target.id;// Identifica si se presionó el boton izquierdo o derecho
        console.log("direccion: ", direccion);
        if(direccion =="izq"){
            console.log("margenActual: ", dimenciones[3]);
            if(dimenciones[3]<0){ 
                contenedor.style.marginLeft = `${dimenciones[2]+100}%`; 
            }
        }else {
            if(dimenciones[3]>(-(dimenciones[0]-dimenciones[1]))){//Esta condicion evita que el margen izquierdo del contenedor se posicione mas alla de la ultima imagen
                contenedor.style.marginLeft = `${dimenciones[2]-100}%`
            }
        }
    }

    image.forEach(element => {
        element.addEventListener("click",mostrarGaleria,false);
    });

    cerrar.addEventListener("click",()=>{
        galeria.style.display="none";
    },false)

    btnIzquierdo.addEventListener("click",pasarImagen,false);
    btnDerecho.addEventListener("click",pasarImagen,false)

    //------Control de galeria mediante el teclado---------------//
    document.addEventListener("keydown",(event)=>{

        let dimenciones = dimencionGaleria();
        if(event.key=="ArrowLeft" && dimenciones[3]<0){
            contenedor.style.marginLeft = `${dimenciones[2]+100}%`; 
        }
        if(event.key=="ArrowRight" && (dimenciones[3]>(-(dimenciones[0]-dimenciones[1])))){
            contenedor.style.marginLeft = `${dimenciones[2]-100}%`
        }

        if(event.key == "Escape"){
            galeria.style.display="none";
        }
    },false)
}
window.onload = app;