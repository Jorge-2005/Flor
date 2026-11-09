const canvas = document.getElementById("flor");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

//Array de particulas
const particulas = []
//tiempo de animacion
let tiempo = 0;
//esto parecera polvo
const destellos = [];

function crearDestellos(){
    for(let i = 0; i < 60; i++){
        destellos.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radio: Math.random() * 2 + 1,
            fase: Math.random() * Math.PI * 2
        });
    }
}


//500 particulas
for(let i = 0; i < 500; i++){

    const angulo = Math.random() * Math.PI * 2;
    const esCentro= Math.random() < 0.15;
    let distancia;

    if(esCentro){
        distancia = Math.random() * 25;
    } else{
        distancia = 100 + Math.sin(angulo * 6) * 45 + Math.random() * 25;
    }

    particulas.push({
        x: canvas.width / 2 + Math.cos(angulo) * distancia,
        y: canvas.height / 2 + Math.sin(angulo) * distancia,
        //guardo abajo la posicion inicial para asi moverlas despues
        origenX: canvas.width / 2 + Math.cos(angulo) * distancia,
        origenY: canvas.height / 2 + Math.sin(angulo) * distancia,
        radio: Math.random() * 3 + 1,
        esCentro: esCentro,
        fase: Math.random() * Math.PI * 2
    });
}

//dibujar el tallo
function tallo(){
    for(let i = 0; i < 150; i++){

        const t = Math.random();
        //controla que el tallo se genere bien como queremos
        const x = (1-t)*(1-t)*400
            + 2*(1-t)*t*370
            + t*t*400;
        //controla que el tallo se genere bien como queremos
        const y = (1-t)*(1-t)*400
            + 2*(1-t)*t*475
            + t*t*550;

        particulas.push({
            //posicion
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            //guarda la posicion inicial para animar/ lo de abajo
            origenX: x,
            origenY: y,

            radio: Math.random() * 2 + 1,
            esCentro: false,
            fase: Math.random() * Math.PI * 2
        });
    }
}

//hoja del tallo
function crearHoja(cx, cy, rotacion){

    for(let i = 0; i < 200; i++){

        const angulo = Math.random() * Math.PI * 2;
        const distancia = Math.sqrt(Math.random());

        const x = 35 * distancia * Math.cos(angulo);
        const y = 12 * distancia * Math.sin(angulo);

        const rx = x * Math.cos(rotacion) - y * Math.sin(rotacion);
        const ry = x * Math.sin(rotacion) + y * Math.cos(rotacion);

        particulas.push({
            //posicion
            x: cx + rx,
            y: cy + ry,
            //guarda la posicion
            origenX: cx + rx,
            origenY: cy + ry,

            radio: Math.random() * 2 + 1,
            esCentro: false,
            fase: Math.random() * Math.PI * 2
        });
    }
}


//Dibujar particulas
function dibujar(){
    tiempo += 0.02;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particulas){

        if (p.origenX !== undefined) {
            p.x = p.origenX + Math.sin(tiempo + p.fase) * 2;
            p.y = p.origenY + Math.cos(tiempo + p.fase) * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2)

        if(p.esCentro){
            ctx.fillStyle = "#f2c2ff";
            ctx.shadowBlur = 25;
            ctx.shadowColor = "#f2c2ff";
        }else{
            ctx.fillStyle = "#a020f0";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#bd55ff";
        }
        //con esto hago que cada punto brille de manera diferente
        ctx.globalAlpha = 0.6 + (Math.sin(tiempo + p.fase) + 1) * 0.2;
        ctx.fill();
    }
    //Bucle Destellos
    for (const d of destellos) {
        ctx.beginPath();
        //crea los destellos y hace que se desplazen 3 px
        ctx.arc(
            d.x + Math.sin(tiempo + d.fase) * 3,
            d.y + Math.cos(tiempo + d.fase) * 3,
            d.radio, 0, Math.PI * 2
        );
        ctx.fillStyle = "#e6b3ff";
        ctx.globalAlpha = 0.5 + (Math.sin(tiempo + d.fase) + 1) * 0.25;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#bd55ff";
        ctx.fill();
    }
}

function animar(){
    dibujar();
    requestAnimationFrame(animar);
}

tallo();
crearHoja(416, 485, -0.5);
crearHoja(360, 510, 0.5);
animar();
crearDestellos();