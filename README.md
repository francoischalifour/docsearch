# Docsearch

> Create search experiences with DocSearch and its renderers.

_⚠️ This is a POC._

## Usage

```js
import docsearch from 'docsearch.js';
import docsearchDefaultTemplate from 'docsearch-template-default';

docsearch({
  apiKey: 'API_KEY',
  indexName: 'INDEX_NAME',
  searchParameters: {
    hitsPerPage: 10,
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  },
  input: document.querySelector('input'),
})(docsearchDefaultTemplate);
```

## Create your own renderer

```js
const renderer = ({ result, refine, input }) => {
  input.addEventListener(
    'input',
    event => {
      refine(event.target.value);
    },
    { once: true }
  );

  const dropdown = getDropdown();

  dropdown.innerHTML = `
  <ol>
    ${Object.values(result)
      .map(hit => `<li>${getSuggestionTemplate(hit)}</li>`)
      .join('')}
  </ol>`.trim();
};

export default renderer;
```

Check the [default template implementation](packages/docsearch-template-default/index.ts).
