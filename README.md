# Simple hotel app

App consists of 3 separate parts:

- REST api backend
- GraphQL api gateway
- React app

App suits presentation/demonstration purpose so far.

# How to run

### Clone repo

```bash
git clone https://github.com/zitzy/simple-hotels-app.git
```

### Running the application

In 3 separate terminals move to service folder and run:

```bash
yarn
```

to install the dependencies:

In same fashion run:

```bash
yarn start
```

to start each service.
The order for starting the app succesfully is:

- backend
- api-gateway
- frontend

NOTE: This is subject to change, as dockerizing the parts and running them in compose would be much more convenient

Please see each service's README.md file for more info
