// ===============================
// BÔNUS DEDILHADO PIMA
// Curso de Violão
// ===============================


let audioCtx = null;


// ===============================
// Iniciar áudio
// ===============================

function initAudio(){

    if(!audioCtx){

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    }


    if(audioCtx.state === "suspended"){

        audioCtx.resume();

    }

}



// ===============================
// Notas dos acordes
// ===============================


const notes = {

    bassG:98.00,       // Sol
    bassD:146.83,      // Ré
    bassEm:82.41,      // Mi menor
    bassC:130.81,      // Dó


    G:196.00,
    B:246.94,
    E:329.63

};




// ===============================
// Som mais próximo de violão
// ===============================


function playString(freq,time){


    const now = audioCtx.currentTime + time;



    const osc = audioCtx.createOscillator();

    const gain = audioCtx.createGain();

    const filter = audioCtx.createBiquadFilter();



    // Onda mais suave, sem o brilho agressivo de um sintetizador sawtooth.
    osc.type = "triangle";


    osc.frequency.setValueAtTime(
        freq,
        now
    );



    filter.type = "lowpass";


    filter.frequency.setValueAtTime(
        1800,
        now
    );


    filter.frequency.exponentialRampToValueAtTime(
        400,
        now + 1
    );



    gain.gain.setValueAtTime(
        0.001,
        now
    );


    // Ataque curto de uma corda beliscada. Rampas exponenciais
    // precisam sempre partir de um valor maior que zero.
    gain.gain.exponentialRampToValueAtTime(
        0.32,
        now + 0.015
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 1.2
    );



    osc.connect(filter);

    filter.connect(gain);

    gain.connect(audioCtx.destination);



    osc.start(now);

    osc.stop(now + 1.3);





}





// ===============================
// Controle das letras P I M A
// ===============================


const dedos = [
    "p",
    "i",
    "m",
    "a"
];



function apagar(){


    dedos.forEach(id=>{


        const elemento =
        document.getElementById(id);



        if(elemento){

            elemento.classList.remove("active");

        }


    });


}




function acender(id,tempo){


    setTimeout(()=>{


        apagar();



        const elemento =
        document.getElementById(id);



        if(elemento){

            elemento.classList.add("active");

        }


    },tempo * 1000);


}







// ===============================
// Padrão único P → I → M → A
// ===============================


function tocarPadrao(baixo,inicio){


    const t = 0.45;



    // Polegar

    acender("p",inicio);

    playString(
        baixo,
        inicio
    );



    // Indicador

    acender("i",inicio+t);

    playString(
        notes.G,
        inicio+t
    );



    // Médio

    acender(
        "m",
        inicio+(t*2)
    );


    playString(
        notes.B,
        inicio+(t*2)
    );



    // Anelar

    acender(
        "a",
        inicio+(t*3)
    );


    playString(
        notes.E,
        inicio+(t*3)
    );


}






// ===============================
// Botão Ouvir Dedilhado
// ===============================


function playPIMA(){


    initAudio();


    const status =
    document.getElementById("status");



    if(status){

        status.innerHTML =
        "🎵 Tocando P → I → M → A";

    }



    apagar();



    tocarPadrao(
        notes.bassC,
        0
    );



    setTimeout(()=>{


        apagar();


        if(status){

            status.innerHTML="";

        }


    },2200);



}







// ===============================
// Exemplo com acordes
// G - D - Em - C
// ===============================


function playSong(){


    initAudio();



    const status =
    document.getElementById("status");



    if(status){

        status.innerHTML =
        "🎸 Tocando exemplo";

    }



    apagar();



    const acordes=[


        notes.bassG,

        notes.bassD,

        notes.bassEm,

        notes.bassC


    ];



    let tempo = 0;



    acordes.forEach(acorde=>{


        tocarPadrao(
            acorde,
            tempo
        );


        tempo += 2;



    });



    setTimeout(()=>{


        apagar();


        if(status){

            status.innerHTML="";

        }


    },tempo*1000);



}







// ===============================
// Tecla espaço
// ===============================


document.addEventListener(
"keydown",
(e)=>{


    if(e.code === "Space"){


        e.preventDefault();


        playPIMA();


    }


});







// ===============================
// Mensagem inicial
// ===============================


window.onload = ()=>{


    const status =
    document.getElementById("status");



    if(status){

        status.innerHTML =
        "Clique em Ouvir Dedilhado para começar.";

    }


};
