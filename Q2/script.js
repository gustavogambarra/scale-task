const countries = [
    { code: "COL", name: "COLOMBIA", fronteiras: ["BRA", "ECU", "PAN", "PER", "VEN"] },
    { code: "BRA", name: "BRASIL", fronteiras: ["ARG", "BOL", "COL", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"] },
    { code: "ECU", name: "EQUADOR", fronteiras: ["COL", "PER"] },
    { code: "PAN", name: "PANAMA", fronteiras: ["COL"] },
    { code: "PER", name: "PERU", fronteiras: ["BOL", "BRA", "CHL", "COL", "ECU"] },
    { code: "VEN", name: "VENEZUELA", fronteiras: ["BRA", "COL", "GUY"] },
    { code: "ARG", name: "ARGENTINA", fronteiras: ["BOL", "BRA", "CHL", "PRY", "URY"] },
    { code: "BOL", name: "BOLIVIA", fronteiras: ["ARG", "BRA", "CHL", "PRY", "PER"] },
    { code: "GUF", name: "GUIANA FRANCESA", fronteiras: ["BRA", "SUR", "VEN"] },
    { code: "PRY", name: "PARAGUAI", fronteiras: ["BRA", "GUF", "GUY"] },
    { code: "SUR", name: "SURINAME", fronteiras: ["BRA", "GUF", "GUY"] },
    { code: "URY", name: "URUGUAI", fronteiras: ["ARG", "BRA"] },
    { code: "CHL", name: "CHILE", fronteiras: ["ARG", "BOL", "PER"] }
]

function ordenaPaises(countries) {
    for (let i = 1; i < countries.length; i++) {

        let j = i;

        while (j > 0 && countries[j].fronteiras.length > countries[j - 1].fronteiras.length) {
            let aux = countries[j];
            countries[j] = countries[j - 1];
            countries[j - 1] = aux;
            j -= 1;
        }
    }

    countries.forEach((countrie) => {
        console.log(`${countrie.name}: ${countrie.fronteiras.length} FRONTEIRAS`)
    })
}

ordenaPaises(countries)