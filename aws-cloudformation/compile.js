var fs = require('fs')

var resources = Object.assign(
    {},
    JSON.parse(fs.readFileSync('resources/fdbucket.json')),
    JSON.parse(fs.readFileSync('resources/fdlambda.json')),
    //JSON.parse(fs.readFileSync('resources/restapi.json')),
    JSON.parse(fs.readFileSync('security/policies.json')),
    JSON.parse(fs.readFileSync('security/roles.json'))
)

var output = JSON.stringify({
    "Resources": resources,
    "Parameters": JSON.parse(fs.readFileSync('parameters.json')),
    "Outputs": JSON.parse(fs.readFileSync('outputs.json'))
}, null, 2)

fs.writeFileSync('template.json', output)