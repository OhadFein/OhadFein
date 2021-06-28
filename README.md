## Setup

- Use `yarn`
- Use lerna: `yarn global add lerna`
- Setup project: `yarn setup`

## Dev

Run `yarn dev`. Wait for client bundle to compile.

### Client only

`cd packages/client && yarn dev`

### Server only

`cd packages/server && yarn dev`

## Test

Run `yarn test`

## Build

Run `yarn build`

## Production

Run `NODE_ENV=production yarn start`
