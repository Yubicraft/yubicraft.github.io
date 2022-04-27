const fs = require('fs')
const yaml = require('js-yaml');

const toplevel = ['Hololive', 'Holostars', 'Nijisanji', 'PRISM', 'Vshojo', 'Phase-Connect', 'Indie/Others']

const nonstandard = ['Indie/Others']

const standards = toplevel.filter(e => nonstandard.find(j => j != e))

const input = fs.readFileSync('./input.yml', 'utf8')

const converted = yaml.load(input)

const categories = []

for (const [key, value] of Object.entries(converted.deluxetags)) {
    if (!categories.includes(value.description)) categories.push(value.description)
}
const subcats = categories.map(e => ({ category: e, oshis: Object.entries(converted.deluxetags).filter(k => k[1].description == e).map(j => ({commandname:j[0].replace(/\s/g, ''), realname:j[0]})) }))

const output = toplevel.map(e => ({
    root: e, categories: subcats.filter(j => {
        if (j.category.toUpperCase().includes(e.toUpperCase())) return true
        else if (nonstandard.includes(e) && !standards.find(g => j.category.toUpperCase().includes(g.toUpperCase()))) return true
    })
}))

fs.writeFileSync('./info.json', JSON.stringify(output))