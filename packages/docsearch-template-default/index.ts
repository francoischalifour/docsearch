const getSuggestionTemplate = hit => `
<a
  class="
    algolia-docsearch-suggestion
    ${hit.isCategoryHeader ? 'algolia-docsearch-suggestion__main' : ''}
    ${hit.isSubCategoryHeader ? 'algolia-docsearch-suggestion__secondary' : ''}
  "
  aria-label="Link to the result"
  href="${hit.url}"
>
<div class="algolia-docsearch-suggestion--category-header">
    <span class="algolia-docsearch-suggestion--category-header-lvl0">${
      hit.category
    }</span>
</div>
<div class="algolia-docsearch-suggestion--wrapper">
  <div class="algolia-docsearch-suggestion--subcategory-column">
    <span class="algolia-docsearch-suggestion--subcategory-column-text">${
      hit.subcategory
    }</span>
  </div>
  ${
    hit.isTextOrSubcategoryNonEmpty
      ? `
  <div class="algolia-docsearch-suggestion--content">
    <div class="algolia-docsearch-suggestion--subcategory-inline">${
      hit.subcategory
    }</div>
    <div class="algolia-docsearch-suggestion--title">${hit.title}</div>
    ${
      hit.text
        ? `<div class="algolia-docsearch-suggestion--text">${hit.text}</div>`
        : ''
    }
  </div>
  `
      : ''
  }
</div>
</a>`;

function getDropdown() {
  const dropdown = document.querySelector('#docsearch-dropdown');

  if (!dropdown) {
    const newDropdown = document.createElement('nav');
    newDropdown.id = 'docsearch-dropdown';

    return newDropdown;
  }

  return dropdown;
}

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

  document.body.appendChild(dropdown);
};

export default renderer;
