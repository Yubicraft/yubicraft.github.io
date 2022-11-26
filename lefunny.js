const max = 91
const img = document.getElementById("lefunny")
const selectRandom = () => {
    const r = Math.floor(Math.random() * max) + 1;
    img.src = `banners/b${r}.png`
}
img.addEventListener("click", selectRandom)
selectRandom()

