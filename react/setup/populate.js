const readline = require("readline")
const fs = require('file-system')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let keys

const CONFIG_FILE = 'src/config/geolocation-app-keys.json'

try {
    const rawdata = fs.readFileSync(CONFIG_FILE)
    keys = JSON.parse(rawdata)
    if (keys && keys.publishKey.length && keys.subscribeKey.length && keys.googleMapsApiKey.length) {
        console.log(`Keys detected in ${CONFIG_FILE}.`)
        if (process.argv[2] === '--quick-test') {
            process.exit(0)
        }
    } else {
        //in case of empty pub&sub values
        addKeysAndStartScript()
    }
} catch (e) {
    addKeysAndStartScript() //in case of non-existing keys file
}

function addKeysAndStartScript() {
    console.log('\n*** A PubNub account is required. ***')
    console.log('\nVisit the PubNub dashboard to create an account or login.')
    console.log('\n     https://dashboard.pubnub.com/')
    console.log('\nCreate a new geolocation app or locate your geolocation app in the dashboard.')
    console.log('\nCopy and paste your publish key and then your subscribe key below.')
    console.log('\n*** A Google Could account is required. ***')
    console.log('\nFollow the instructions below to get your Google Maps API key:')
    console.log('\n     https://developers.google.com/maps/documentation/javascript/get-api-key')
    console.log('\nCopy and paste your Google Maps API key below.')
    rl.question("\nEnter your publish key: ", publishKey => {
        rl.question("Enter your subscribe key: ", subscribeKey => {
            rl.question("Enter your Google Maps API key: ", googleMapsApiKey => {
                if (publishKey.startsWith('pub') && subscribeKey.startsWith('sub')) {
                    const updateKeys = {
                        "publishKey": publishKey,
                        "subscribeKey": subscribeKey,
                        "googleMapsApiKey": googleMapsApiKey
                    }
                    if (!keys) {
                        fs.openSync(CONFIG_FILE, 'a')
                        console.log(`\n${CONFIG_FILE} file for storing your publish and subscribe key is created.`)
                    }
                    fs.writeFile(CONFIG_FILE, JSON.stringify(updateKeys), (err) => {
                        if (!err) console.log(`\nYour keys have been saved to ${CONFIG_FILE} file.`)
                    })
                } else {
                    console.log('\nYou entered invalid keys format!')
                    process.exit(1)
                }
            })
        })
    })
}