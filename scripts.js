//test
let data
const selectroot = document.getElementById("selectroot")
const selectcat = document.getElementById("selectcat")
const selectoshi = document.getElementById("selectoshi")
const copybutton = document.getElementById("copybutton")
const span = document.getElementById("result")
const startScript = async () => {
    data = await fetch("info.json")
        .then(response => response.json())
    handleData(data)
}
startScript()
const handleData = (data) => {

    selectroot.innerHTML = '<option value="" selected disabled>Select</option>'
    data.forEach(e => {
        selectroot.innerHTML += `<option value="${e.root}">${e.root}</option>`
    })
    selectroot.addEventListener("change", handleSelectRoot)
    selectcat.addEventListener("change", handleSelectCat)
    selectoshi.addEventListener("change", printResult)
}
const handleSelectRoot = () => {

    const span = document.getElementById("result")

    selectoshi.style.display = 'none'
    span.style.display = 'none'

    const dataSelected = data.find(e => e.root == selectroot.value)
    selectcat.innerHTML = '<option value="" selected disabled>Select</option>'
    dataSelected.categories.forEach(e => {
        selectcat.innerHTML += `<option value="${e.category}">${e.category}</option>`
    })
    selectcat.style.display = 'block'
}
const handleSelectCat = () => {

    const dataSelected = data.find(e => e.root == selectroot.value)
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
const copySelection = () => {

    navigator.clipboard.writeText(span.innerText)
}