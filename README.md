# Shopify Cart Transfrom App - Extension only

This is an extension based app with the prupose of transforming the cart when certain products are added. 

This function is triggered when the [Free Ring Sizing Kit](https://stagheaddesigns.com/products/free-ring-sizing-kit) product is added to the cart with another product from the collection [Elligible For Free Ring Sizing Kit](https://stagheaddesigns.com/collections/elligible-for-free-ring-sizing-kit) pulled from the Shopify API.


## Benefits

Creates a function automatically makes "Free Ring Sizing Kit" product free when triggered, allowing it to be discounted to $0 without conflicting with other automatic/code discounts.

## Built With
-TypeScript
-JavaScript
-Shopify API


## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Installing the template

This template can be installed using your preferred package manager:

Using yarn:

```shell
yarn create @shopify/app
```

Using npm:

```shell
npm init @shopify/app@latest
```

Using pnpm:

```shell
pnpm create @shopify/app@latest
```

This will clone the template and install the required dependencies.

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables and runs commands in parallel.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development (such as generating extensions).

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
- [Extension only apps](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)

## Contact
Hannah Payne - hannah.payne140@gmail.com
Project Link: https://github.com/hannahrpayne/free-ring-sizer-w-purchase.git