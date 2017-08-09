# reactive-login-poc

A lightweight Proof of Concept to demonstrate how forms don't need buttons. Obviously rate limiting and security measures should be factored in to this, but I'm lazy.

As it's built in docker, all you need is docker. No node, no java, no nothing (except docker)..

## To run

```
docker run -p 9090:9090 benwallman/reactive-login-poc
```

## To build / developer
```
npm run docker:shell
npm install
npm run dev
```
