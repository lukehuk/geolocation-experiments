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
    // checkPubNubFunctionsExist() //If the key file exists, we will assume the functions have already been created
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

function checkPubNubFunctionsExist() {
    console.log('\n***  PubNub Functions required. ***')
    console.log('\nA specific set of PubNub functions PubNub are required for this application to work.')
    console.log('These can be created automatically but you will need to enter your PubNub account email, password and key id for the key set added previously.')
    console.log('Please also note that if the account used SSO to register with PubNub this process will not ne possible.')
    console.log('\n')
    rl.question("\nWould you like to automatically create the required PubNub Functions? (y/n): ", continueResponse => {
        if (continueResponse !== "y") {
            return
        }
        rl.question("\nPlease enter your PubNub account email: ", email => {
            rl.question("\nPlease enter your PubNub account password: ", password => {
                rl.question("\nPlease enter your PubNub key id: ", keyId => {
                    const token = getSessionToken(email, password)
                    createModule(token, keyId)
                })
            })
        })
    })
}

function getSessionToken(email, password) {
    const xhr = new XMLHttpRequest()
    const url = "https://admin.pubnub.com/api/me"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText)
            return json.result.token
        }
    }
    const data = JSON.stringify({ "email": email, "password": password })
    xhr.send(data)
}

function createModule(token, keyId) {
    const xhr = new XMLHttpRequest()
    const url = "https://admin.pubnub.com/api/v1/blocks/key/" + keyId + "/block"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("X-Session-Token", token)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText)
            const moduleId = json.payload.id
            createFunctions(token, keyId, moduleId)
        }
    }
    const data = JSON.stringify({ "key_id": keyId, "name": "Geolocation Demo", "description": "Module containing geolocation demo functions" })
    xhr.send(data)
}

function createFunctions(token, keyId, moduleId) {
    //TODO
    for (let i = 0; i < 0; i++) {
        //For each function we want to generate
        const functionCode = ""
        createFunction(token, keyId, moduleId, functionCode)
    }
}

function createFunction(token, keyId, moduleId, functionCode) {
    const xhr = new XMLHttpRequest()
    const url = "https://admin.pubnub.com/api/v1/blocks/key/" + keyId + "/block"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("X-Session-Token", token)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText)
            const moduleId = json.payload.id
            createFunctions(moduleId)
        }
    }
    const data = JSON.stringify(
        {
            "type": "on-rest",
            "key_id": keyId,
            "block_id": moduleId,
            "channels": "eventHandlerChannel",
            "code": functionCode,
            "event": "js-on-rest",
            "log_level": "debug",
            "name": "on-rest-eventHandlerName",
            "path": "some/path/here",
            "output": "output-0.5823105682419438"
        }
    )
    xhr.send(data)
}

// PUT https://admin.pubnub.com/api/vault/<subscribe_key>/key/<key_name>