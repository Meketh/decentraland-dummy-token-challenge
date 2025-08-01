# Full Stack dApp Take home

This is a challenge for Full Stack developers from decentraland.

## Objectives

- [ ] Check token balance.
- [ ] Transfer tokens from wallet.

## Nice to have

- [ ] Ttransfer section as a new page with react-router.
- [ ] Use reselect for selectors.
- [ ] Add test using test network.

## Setup

1. Run `npm install`
2. Run `npm run e2e`

## WHY ?!

- Why use a submodule instead of a copy of dummy-token ?

  I decided to think of it as a dependancy so it's keept clean in it's original form. That's why I didn't change it's scripts though it would have been easier that way.

- Why e2e instead of unit tests ?

  UI is mostly integration code, in fact this example is almost only integration code.
