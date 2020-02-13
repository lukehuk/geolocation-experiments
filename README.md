# geolocation-experiments

## Requirements

* [Node.js](https://nodejs.org/en/)
* PubNub Publish/Subscribe Keys (Free)
* Google Maps API Key (Free) - [get here](https://developers.google.com/maps/documentation/geocoding/get-api-key)
* Docker

### PubNub Account

If you don't already have an account, you can [create one for free](https://dashboard.pubnub.com/).

1. Sign in to your PubNub [Admin Dashboard](https://dashboard.pubnub.com/), click Create New App for PubNub Chat and give your app a name.

1. Select your new app, then click its keyset.

1. Locate the Publish and Subscribe keys. You'll need these keys to include in this project.

## Building the project

1. Clone the GitHub repository.

    ```bash
    git clone git@github.com:lukehuk/geolocation-experiments.git
    ```

1. Install the project.

    ```bash
    cd geolocation-experiments/react
    npm install
    ```

1. Run init.sh script to remove any running Docker containers and start containers required for this application.

    ```bash
    cd docker
    ./init.sh
    ```

1. Run the project in your local environment. You may be asked to input your PubNub keys and populate sample data if you are running the app for the first time.

    ```bash
    cd ../
    npm start
    ```

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.