# How do I use jQuery in Webpack?

By default, `idv-kit` does not include jQuery. In many cases, [jQuery is no longer necessary](http://youmightnotneedjquery.com/) to ensure good browser support across the board, and we often only need a small portion of it. You are encouraged to **explore alternative solutions when you feel the need for jQuery** - it may be easier than you thought!

## What's your use case?

Depending on what you need to do with jQuery, there are a few methods for ensuring it's usable within Webpack.

### I want to use jQuery, but I am using **no jQuery plugins**

This is easiest method - install jQuery with `npm` and import into your scripts like you'd do with any other installed library.

```sh
npm install --save jquery
```

```js
// in a JavaScript file in your project

import $ from 'jquery';

$('.all-the-things').on('click', function () {
  console.log('Clicked something!');
});
```

The only potential curveball - you'll need to ensure you `import` jQuery in *every file you use it in*. It won't be accessible otherwise.

### I want to use jQuery, but I **do need jQuery plugins**

The vast majority jQuery plugins expect jQuery to be reachable globally. This is somewhat incompatible with Webpack's expectations (no JavaScript should pollute the global scope), but there are ways to get around it.

First, you'll still need to install jQuery with `npm`.

```sh
npm install --save jquery
```

Next, we need to tell Webpack to expose jQuery to the global scope so plugins can find it. In the `webpack.config.js` file, we can add a new Webpack plugin to the `plugins` section to instruct Webpack to treat jQuery differently.

```js
// webpack.config.js

module.exports = {
  ...
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    ...
  ]
  ...
}
```

To make things a little easier, this is already in `webpack.config.js` but commented out unless needed.

A side effect of this method - none of your scripts that reference jQuery will need to `import` jQuery anymore. The `$` and `jQuery` variables will be available everywhere. However, it's still recommended that you do so it's exceedingly clear that jQuery is making an appearance in that file.
