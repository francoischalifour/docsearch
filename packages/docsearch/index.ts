import algoliasearch from 'algoliasearch/lite';
import { formatHits } from './utils';

// type SearchResult = {
//   hits: object[];
// };

// type Refine = (query: string) => void;

// type DocSearchOptions = {
//   apiKey: string;
//   indexName: string;
//   searchParameters: object;
//   input: HTMLElement;
// };

// type DocSearchRendererOptions = {
//   input: HTMLElement;
//   refine: Refine;
//   result: object;
// };

// type DocSearchRenderer = (
//   options: DocSearchRendererOptions
// ) => DocSearchRenderer;

// type DocSearch = (
//   options: DocSearchOptions
// ) => (renderer: DocSearchRenderer) => DocSearchRenderer;

const appId = 'BH4D9OD16A';

const docsearch = options => renderer => {
  const { apiKey, indexName, searchParameters, input } = options;

  if (!apiKey) {
    throw new Error('The `apiKey` option is required.');
  }

  if (!indexName) {
    throw new Error('The `indexName` option is required.');
  }

  if (!input) {
    throw new Error('The `input` option is required.');
  }

  const index = algoliasearch(appId, apiKey).initIndex(indexName);

  const refine = query => {
    index
      .search({
        query,
        hitsPerPage: 5,
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        ...searchParameters,
      })
      .then(result => {
        renderer({
          input,
          refine,
          result: formatHits(result.hits),
          searchParameters,
        });
      });
  };

  return renderer({
    input,
    result: {},
    refine,
  });
};

export default docsearch;
