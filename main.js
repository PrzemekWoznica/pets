// Background animation
let backgroundInterval = null;

const randomImage = (min, max) => {
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    if(randomNumber == 1007){
        randomNumber = min;
        return "https://picsum.photos/id/" + randomNumber + "/600/400";
    } else {
        return "https://picsum.photos/id/" + randomNumber + "/600/400";
    };
};

const setImage = () => {
    let image = document.createElement("img");
    image.setAttribute("src", randomImage(1000, 1011));
    image.style.opacity = 0.0;
    document.querySelector(".image-container").appendChild(image);
};

const backgroundLoop = () => {
    if(window.innerWidth <= 767){
        clearInterval(backgroundInterval);
        let imageContainer = document.querySelector(".image-container");
        let images = document.querySelector(".image-container img");
        for(let i = 0; i < images.length; i++){
            imageContainer.removeChild(images[i]);
        }
    } else {
        let oldImage = document.querySelector(".image-container img:first-child");
        oldImage.addEventListener("animationend", () => {
            oldImage.parentNode.removeChild(oldImage);
        });
        oldImage.style.animation = "decreaseOpacity 5s linear forwards";
        setImage();
        let newImage = document.querySelector(".image-container img:last-child");
        newImage.style.animation = "increaseOpacity 5s linear forwards";
    };
};

const onLoadBackground = () => {
    let image = document.createElement("img");
    image.setAttribute("src", "https://picsum.photos/id/1000/600/400");
    document.querySelector(".image-container").appendChild(image);
};

onLoadBackground();

backgroundInterval = setInterval(backgroundLoop, 10000);

// Slides show
const dogButton = document.querySelector(".dog-button");
// const catButton = document.querySelector(".cat-button");
let dogInterval = null;
// let catInterval = null;
let dogMarker = "to-start";
// let catMarker = "to-start";
let selection = "";
let continueInterval = 1;

const changeImage = () => {
    const petsImage = document.querySelector("#current");
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
        // if(selection == "cat") {
        //     let file = "" + request.response.file;
        //     petsImage.setAttribute("src", file);
        // } else 
        if (selection == "dog") {
            let url = "" + request.response.url;
            petsImage.setAttribute("src", url);
        }
    });
    // if(selection == "cat") {
    //     request.open("GET", "https://aws.random.cat/meow");
    // } else 
    if (selection == "dog") {
        request.open("GET", "https://random.dog/woof.json");
    };
    request.responseType = "json";
    request.send();
}

const startImage = () => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
        const slider = document.querySelector(".images");
        const petImage = document.createElement("img");
        // if (selection == "cat") {
        //     let file = "" + request.response.file;
        //     petImage.setAttribute("src", file);
        //     petImage.setAttribute("id", "current")
        //     slider.appendChild(petImage);
        // } else 
        if (selection == "dog") {
            let url = "" + request.response.url;
            petImage.setAttribute("src", url);
            petImage.setAttribute("id", "current")
            slider.appendChild(petImage);
        }
        
    });
    // if(selection == "cat") {
    //     request.open("GET", "https://aws.random.cat/meow");
    // } else 
    if (selection == "dog") {
        request.open("GET", "https://random.dog/woof.json");
    };
    request.responseType = "json";
    request.send();
}

// catButton.addEventListener("click", () => {
//     dogButton.style.background = "none";
//     clearInterval(dogInterval);
//     dogInterval = null;
//     selection = "cat";
//     dogMarker = "to-start"
//     if(catMarker == "to-start") {
//         catMarker = "to-stop";
//         catButton.style.background = "#FFF851";
//         let hasChilds = document.querySelector(".images").hasChildNodes();
//         if(hasChilds == false) {
//             continueInterval = 1;
//             startImage();
//             catInterval = setInterval(changeImage, 5000);            
//         } else if (continueInterval == 1) {
//             changeImage();
//             catInterval = setInterval(changeImage, 5000);
//         };
//     } else if (catMarker == "to-stop") {
//         catMarker = "to-start";
//         clearInterval(catInterval);
//         catInterval = null;
//         catButton.style.background = "#761CEA";
//     }  
// })

dogButton.addEventListener("click", () => {
    // catButton.style.background = "none";
    // clearInterval(catInterval);
    // catInterval = null;
    selection = "dog";
    // catMarker = "to-start"
    if(dogMarker == "to-start") {
        dogMarker = "to-stop";
        dogButton.style.background = "#FFF851";
        let hasChilds = document.querySelector(".images").hasChildNodes();
        if(hasChilds == false) {
            continueInterval = 1
            startImage();
            dogInterval = setInterval(changeImage, 4000);   
        } else if (continueInterval == 1) {
            changeImage();
            dogInterval = setInterval(changeImage, 4000);
        };
    }
    // } else if (dogMarker == "to-stop") {
    //     dogMarker = "to-start";
    //     clearInterval(dogInterval);
    //     dogInterval = null;
    //     dogButton.style.background = "#761CEA";
    // };
})