# Full Stack dApp Take home

This is a challenge for Full Stack developers from decentraland.

## Objectives

- [x] Check token balance.
- [x] Transfer tokens from wallet.

## Nice to have

- [x] Transfer section as a new page with react-router.
- [ ] Use reselect for selectors.
- [ ] Add test using test network.

## Setup

1. Run `npm install`

2. Run `npm start` to start the app
3. Run `npm run e2e:test` to run the e2e tests

or

2. Run `npm run e2e` to run the e2e tests as standalone processes

## WHY ?!

- Why use a submodule instead of a copy of `dummy-token` ?

  I decided to think of it as a dependency so it's kept clean in its original form. That's why I didn't change it's scripts though it would have been easier that way.

- Why `e2e` instead of `unit tests` ?

  UI is mostly integration code, in fact this example is only integration code. And for testing such code is better to use `e2e tests`. `Unit tests` will be very cumbersome to handle (with mocks and spies).

- Why `react-query` instead of `redux` ?

  `Redux` is, though highly verbose, a good solution for handling global state. However, in this case we are just using remote state (the chain). `React-query` is a better fit for handling that.

- Why remove the `Navbar` ?

  It has nothing to do with the assignment because it's not modifiable and has lopgic specific to decentraland. That's probably the reason why it throws some errors to the console that I can't fix and I don't want to pollute the console.

- Why `tailwindcss` ?

  To avoid polution and better locality of behavior.
