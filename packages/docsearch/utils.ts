function getHighlightedValue(object, property) {
  if (
    object._highlightResult &&
    object._highlightResult[property] &&
    object._highlightResult[property].value
  ) {
    return object._highlightResult[property].value;
  }

  return object[property];
}

function getSnippetedValue(object, property) {
  if (
    !object._snippetResult ||
    !object._snippetResult[property] ||
    !object._snippetResult[property].value
  ) {
    return object[property];
  }

  const snippet = object._snippetResult[property].value;

  return [
    snippet[0] !== snippet[0].toUpperCase() && '…',
    snippet,
    ['.', '!', '?'].indexOf(snippet[snippet.length - 1]) === -1 && '…',
  ]
    .filter(Boolean)
    .join('');
}

function mergeKeyWithParent(object, property) {
  if (object[property] === undefined) {
    return object;
  }

  if (typeof object[property] !== 'object') {
    return object;
  }

  const newObject = Object.assign({}, object, object[property]);
  delete newObject[property];

  return newObject;
}

function groupBy(collection, property) {
  const newCollection = {};

  collection.forEach(item => {
    if (item[property] === undefined) {
      throw new Error(`[groupBy]: Object has no key ${property}`);
    }

    let key = item[property];

    if (typeof key === 'string') {
      key = key.toLowerCase();
    }
    // fix #171 the given data type of docsearch hits might be conflict with the properties of the native Object,
    // such as the constructor, so we need to do this check.
    if (!Object.prototype.hasOwnProperty.call(newCollection, key)) {
      newCollection[key] = [];
    }

    newCollection[key].push(item);
  });

  return newCollection;
}

function getValues(object) {
  return Object.keys(object).map(key => object[key]);
}

function flatten(array) {
  const results = [];
  array.forEach(value => {
    if (!Array.isArray(value)) {
      results.push(value);
      return;
    }
    value.forEach(subvalue => {
      results.push(subvalue);
    });
  });
  return results;
}

function flattenAndFlagFirst(object, flag) {
  const values = getValues(object).map(collection =>
    collection.map((item, index) => {
      // eslint-disable-next-line no-param-reassign
      item[flag] = index === 0;
      return item;
    })
  );

  return flatten(values);
}

function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

function formatHits(receivedHits) {
  const clonedHits = deepClone(receivedHits);
  const hits = clonedHits.map(hit => {
    if (hit._highlightResult) {
      // eslint-disable-next-line no-param-reassign
      hit._highlightResult = mergeKeyWithParent(
        hit._highlightResult,
        'hierarchy'
      );
    }
    return mergeKeyWithParent(hit, 'hierarchy');
  });

  // Group hits by category / subcategory
  let groupedHits = groupBy(hits, 'lvl0');
  // $.each(groupedHits, (level, collection) => {
  //   const groupedHitsByLvl1 = groupBy(collection, 'lvl1');
  //   const flattenedHits = flattenAndFlagFirst(
  //     groupedHitsByLvl1,
  //     'isSubCategoryHeader'
  //   );
  //   groupedHits[level] = flattenedHits;
  // });
  groupedHits = flattenAndFlagFirst(groupedHits, 'isCategoryHeader');

  // Translate hits into smaller objects to be send to the template
  return groupedHits.map(hit => {
    const url = hit.url;
    const category = getHighlightedValue(hit, 'lvl0');
    const subcategory = getHighlightedValue(hit, 'lvl1') || category;
    const displayTitle = [
      getHighlightedValue(hit, 'lvl2') || subcategory,
      getHighlightedValue(hit, 'lvl3'),
      getHighlightedValue(hit, 'lvl4'),
      getHighlightedValue(hit, 'lvl5'),
      getHighlightedValue(hit, 'lvl6'),
    ].join(
      '<span class="aa-suggestion-title-separator" aria-hidden="true"> › </span>'
    );
    const text = getSnippetedValue(hit, 'content');
    const isTextOrSubcategoryNonEmpty =
      (subcategory && subcategory !== '') ||
      (displayTitle && displayTitle !== '');
    const isLvl1EmptyOrDuplicate =
      !subcategory || subcategory === '' || subcategory === category;
    const isLvl2 =
      displayTitle && displayTitle !== '' && displayTitle !== subcategory;
    const isLvl1 =
      !isLvl2 &&
      (subcategory && subcategory !== '' && subcategory !== category);
    const isLvl0 = !isLvl1 && !isLvl2;

    return {
      isLvl0,
      isLvl1,
      isLvl2,
      isLvl1EmptyOrDuplicate,
      isCategoryHeader: hit.isCategoryHeader,
      isSubCategoryHeader: hit.isSubCategoryHeader,
      isTextOrSubcategoryNonEmpty,
      category,
      subcategory,
      title: displayTitle,
      text,
      url,
    };
  });
}

export { formatHits };
