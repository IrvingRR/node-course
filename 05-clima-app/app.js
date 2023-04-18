const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async () => {
    
    let option;
    const searches = new Searches();

    do {
        option = await inquirerMenu();

        switch (option) {
            case 1:
                // Show message
                const place = await leerInput('What place do you want to search?');
                searches.city(place);
                // Search the places

                // Select the place

                // Weather

                // Show the results

                console.log('\nCity information:\n'.cyan);
                console.log('City');
                console.log('Latitude');
                console.log('Longitude');
                console.log('Temperature');
                console.log('Minimal');
                console.log('Maximum');
            break;
        
        }
        if(option !== 0) await pausa();

    } while (option !== 0);

}

main();
