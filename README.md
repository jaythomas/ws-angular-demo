# ws-angular-demo

Here's a crude ci-runner prototype.

An up-to-date revision can be found at: https://github.com/jaythomas/ws-angular-demo

## Running the app

Launch the server using one of two methods:

1.) Build and run the docker container
```sh
docker build -t runner .
docker run runner
```

2.) Install node and the node modules locally
```
yarn install
yarn run dev
```

Then open `index.html` in your browser!
