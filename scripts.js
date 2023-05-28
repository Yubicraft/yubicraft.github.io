//oshi picker
let data
let filtered
let filter = ""
const selectroot = document.getElementById("selectroot")
const selectcat = document.getElementById("selectcat")
const selectoshi = document.getElementById("selectoshi")
const copybutton = document.getElementById("copybutton")
const filterinput = document.getElementById("filter")
const span = document.getElementById("result")
const resultsfound = document.getElementById("resultsfound")
const startScript = async () => {
    data = await fetch("info.json")
        .then(response => response.json())
    handleData()
}
startScript()

const handleData = () => {
    filtered = JSON.parse(JSON.stringify(data))
    let sum = 0
    filtered.forEach(s =>  //iterate data
    {
        s.categories.forEach((t) => {t.oshis = t.oshis.filter(oshi => oshi.realname.toUpperCase().includes(filter.toUpperCase()));sum += t.oshis.length})
        s.categories = s.categories.filter(category => category.oshis.length > 0)
    }
    )
    filtered = filtered.filter(root => root.categories.length > 0)
    resultsfound.innerText = `${sum} oshis found`
    selectroot.innerHTML = '<option value="" selected disabled>Select</option>'
    filtered.forEach(e => {
        selectroot.innerHTML += `<option value="${e.root}">${e.root}</option>`
    })

}
const handleFilter = () => {
    filter = filterinput.value
    selectcat.style.display = 'none'
    selectoshi.style.display = 'none'
    span.style.display = 'none'
    copybutton.style.display = 'none'
    handleData()
}
const handleSelectRoot = () => {

    const span = document.getElementById("result")

    selectoshi.style.display = 'none'
    span.style.display = 'none'
    copybutton.style.display = 'none'

    const dataSelected = filtered.find(e => e.root == selectroot.value)
    selectcat.innerHTML = '<option value="" selected disabled>Select</option>'
    dataSelected.categories.forEach(e => {
        selectcat.innerHTML += `<option value="${e.category}">${e.category}</option>`
    })
    selectcat.style.display = 'block'
}
const handleSelectCat = () => {

    const dataSelected = filtered.find(e => e.root == selectroot.value)
    const value = selectcat.value
    selectoshi.innerHTML = '<option value="" selected disabled>Select</option>'
    dataSelected.categories.find(e => e.category == value).oshis.forEach(e => {
        selectoshi.innerHTML += `<option value="${e.commandname}">${e.realname}</option>`
    })
    selectoshi.style.display = 'inline'
}
const printResult = () => {

    const result = selectoshi.value
    span.style.display = 'inline'
    span.innerText = `/tags select ${result}`
    copybutton.style.display = 'inline'
}
const copySelection = async () => {

    await navigator.clipboard.writeText(span.innerText);
}
selectroot.addEventListener("change", handleSelectRoot)
selectcat.addEventListener("change", handleSelectCat)
selectoshi.addEventListener("change", printResult)
filterinput.addEventListener("keyup", handleFilter)

//random banner
const max = 96
const img = document.getElementById("lefunny")
const selectRandom = () => {
    const r = Math.floor(Math.random() * max) + 1;
    img.src = `banners/b${r}.png`
}
img.addEventListener("click", selectRandom)
selectRandom()

