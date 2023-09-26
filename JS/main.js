let select = (selector) => document.querySelector(selector);
let selectAll = (selector) => document.querySelectorAll(selector);

let bodyElement = select("body");
let contentElement = select(".content");
let topContainerElement = select(".topContainer");
let imgElement = select(".pokeImg");
let typeElement = select(".type");
let heightElement = select(".height");
let abilityElement = select(".ability");
let pokecardElement = select(".PokeCard");




//Overlay 

//Overlay Enable

function on_micEnable() {
    document.getElementById("micEnable").style.opacity = 1;
    document.getElementById("micEnable").style.pointerEvents = "all";
}


function off_micEnable() {
    document.getElementById("micEnable").style.opacity = 0;
    document.getElementById("micEnable").style.pointerEvents = "none";
}
window.addEventListener("load", on_micEnable);

//Overlay Question

function on_overlayError() {
    document.getElementById("overlayError").style.opacity = 1;
    document.getElementById("overlayError").style.pointerEvents = "all";
}

function off_overlayError() {
    document.getElementById("overlayError").style.opacity = 0;
    document.getElementById("overlayError").style.pointerEvents = "none";
}
window.addEventListener("load", off_overlayError);

//Overlay Error

function on_overlayQuestion() {
    document.getElementById("overlayQuestion").style.opacity = 1;
    document.getElementById("overlayQuestion").style.pointerEvents = "all";
}

function off_overlayQuestion() {
    document.getElementById("overlayQuestion").style.opacity = 0;
    document.getElementById("overlayQuestion").style.pointerEvents = "none";
}
window.addEventListener("load", off_overlayQuestion);





//Overlay Pokecard

let off_overlayPokecard = () => {
    document.getElementById("overlayPokecard").style.opacity = 0;
    document.getElementById("overlayPokecard").style.pointerEvents = "none";
    pokecardElement.classList.remove("spin");
}
window.addEventListener("load", off_overlayPokecard);

//API Fetch

const getPokemonData = async (pokemonCall) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonCall}`;
    await fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let name = data["name"];
            let ability = data["abilities"][0]["ability"]["name"];
            let type = data["types"][0]["type"]["name"];
            let height = data["height"];
            let picture = data["sprites"]["front_default"];
            let id = data["id"];

            console.log(data);
            console.log(name);
            console.log(ability);
            console.log(type);
            console.log(height);
            console.log(picture);
            console.log(id);

            topContainerElement.innerHTML = name;
            typeElement.innerHTML = type;
            abilityElement.innerHTML = ability;
            heightElement.innerHTML = (height / 3.048).toFixed(2) + "'";
            document.getElementById("pokeImg").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            document.getElementById("overlayPokecard").style.opacity = 1;
            document.getElementById("overlayPokecard").style.pointerEvents = "all";
            pokecardElement.classList.add("spin");


        })
        .catch(on_overlayError);
}


//Speech Recognition

// Start of Copied code  - From Async Voice Recognition Lesson

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

const tap = contentElement;
tap.onclick = () => {
    recognition.start();
}

let pokemonCall;
let transcript;

recognition.onresult = (event) => {
    let last = event.results.length - 1;
    transcript = event.results[last][0].transcript;
    transcript = transcript.toLowerCase();
    getPokemonData(transcript);
    console.log(transcript);

}
// End of Copied code  - From Async Voice Recognition Lesson

recognition.onaudiostart = () => {
    contentElement.classList.add("listening");
};

recognition.onaudioend = () => {
    contentElement.classList.remove("listening");
};

recognition.onspeechend = () => {
    recognition.stop();
}
recognition.onerror = (event) => {
    console.log('Error occured in recognition: ' + event.error);
}