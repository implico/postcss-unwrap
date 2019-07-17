# postcss-unwrap-helper
Unwrap container contents with PostCSS

## Install

```
$ npm install postcss-unwrap-helper
$ yarn add postcss-unwrap-helper
```


## Usage

This is **not** a PostCSS plugin, just exposes a helper function that unwraps a node, preserving the correct whitespace.

```js
import postcss from 'postcss';
import unwrapHelper from 'postcss-unwrap-helper';

// Am example plugin that unwraps all media queries
postcss.plugin('postcss-unwrap-all-media-queries', () => root => {
  root.walkAtRules('media', unwrapHelper);
};
```

Input CSS:
```css
@media screen and (min-width: 960px) {
  div {
    display: block;
  }
}

span {
  display: flex;
}
```

Output CSS:
```css
div {
  display: block;
}

span {
  display: flex;
}
```
