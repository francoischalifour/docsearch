# Docsearch

## Usage

```js
const docsearchRenderer = result => {
  <Downshift
    itemToString={item => (item ? item.excerpt : '')}
    initialHighlightedIndex={0}
    onSelect={(selectedItem, state) => {
      state.closeMenu()
      state.inputValue = ''
    }}
  >
  {({inputValue}) => (
    <div>
      <input value={inputValue} />

      <ol>
        {result.map(hit => (
          <li>{hit.excerpt}</li>
        ))}
      </ol>
    </div>
  )}
  </DownShift>
}

docsearch({
  apiKey: 'API_KEY',
  indexName: 'INDEX_NAME',
  searchParameters: {
    hitsPerPage: 5,
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  },
  transformResult: result => result,
})(docsearchRenderer);
```
