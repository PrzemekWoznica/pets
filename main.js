const slide = document.getElementById("slide");

const setImage = (url) => {
    slide.setAttribute("src", url);
}

const getImage = () => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", () => {
        setImage(request.response.url);
    });
    
    request.open("GET", "https://random.dog/woof.json");
    request.responseType = "json";
    request.send();
}

window.onload = (event) => {
    getImage();
    setInterval(getImage, 5000);
};