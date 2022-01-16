<div align="center">
  <h1>@saninn/cypress-ionic</h1>

<span style="font-size:2em">👨‍💻💻</span>

A set of helper functions to tests your Ionic apps with Cypress

<div align="center">

[![Build Status](https://github.com/distante/cypress-ionic/actions/workflows/node.js.yml/badge.svg)](https://github.com/distante/cypress-ionic/actions/workflows/node.js.yml) [![Known Vulnerabilities](https://snyk.io/test/github/distante/cypress-ionic/badge.svg?targetFile=package.json)](https://snyk.io/test/github/distante/cypress-ionic?targetFile=package.json) [![Maintainability](https://api.codeclimate.com/v1/badges/171b458d255d4112ffd6/maintainability)](https://codeclimate.com/github/distante/cypress-ionic/maintainability)

</div>
</div>

<hr />

## The Problem

To be able to get a hold of Ionic's web components and with Cypress one has to inspect their ShadowDom and create cypress helper commands to change them for each project, which is time consuming.

With this library you can just give the css selector of the Ionic Element, or the element itself and you can interact with it in an easy way.

## Install

`npm install @saninn/cypress-ionic --save-dev`.

Then enable ShadowDom access on your Cypress Project:

```json
{
  "$schema": "https://on.cypress.io/cypress.schema.json",
  "includeShadowDom": true,
  ...
}
```

\*\* Although it is not needed, it is recommended to disable Ionic animations when possible. That said, this library let the animations active so timing issues are handled.

## Basic usage

Each helper function returns an `Cypress.Chainable<JQuery<IonComponent>>` object with the component that was changed. So an example of usage could be

```ts
import { ionRangeCypress } from '@saninn/cypress';

it('can be changed by set value', () => {
  ionRangeCypress.setValue('ion-range.my-ion-range', 42);

  cy.get('my-view-item').should('eq', '42');
});
```

## API and Documentation

[See the generated documentation here](https://cypress-ionic.saninnsalas.com)

## License

[AGPLv3](/LICENSE)

## Development

Each exported function is directly tested on Cypress.
Call `npm run develop` to start a simple server and open cypress.
You can see the served host on `http://localhost:3999` with:

- [html/index.html](/html/index.html) is the file with the supported components.
- [html/assets/scripts.mjs](/html/assets/scripts.mjs) contains the Ionic initialization calls and some event listeners needed for testing.

## TODO.

- Dev Guidelines
- More components

## Pull requests are welcome

❤

# Find me 🏃‍

- Website [https://www.saninnsalas.com](https://www.saninnsalas.com)
- Twitter [@SaninnSalas](https://twitter.com/saninnsalas)
- Facebook [@SaninnSalas](https://www.facebook.com/SaninnSD/)
