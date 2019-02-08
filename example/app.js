// const { h, render } = preact;

// const html = htm.bind(h);

// const docsearchRenderer = ({ result, container, refine } = {}) => {
//   setTimeout(() => refine('me'), 2000);
//   const html = `
//   <a class="algolia-docsearch-suggestion
//   {{#isCategoryHeader}}algolia-docsearch-suggestion__main{{/isCategoryHeader}}
//   {{#isSubCategoryHeader}}algolia-docsearch-suggestion__secondary{{/isSubCategoryHeader}}
//   "
//   aria-label="Link to the result"
//   href="{{{url}}}"
//   >
//   <div class="algolia-docsearch-suggestion--category-header">
//       <span class="algolia-docsearch-suggestion--category-header-lvl0">{{{category}}}</span>
//   </div>
//   <div class="algolia-docsearch-suggestion--wrapper">
//     <div class="algolia-docsearch-suggestion--subcategory-column">
//       <span class="algolia-docsearch-suggestion--subcategory-column-text">{{{subcategory}}}</span>
//     </div>
//     {{#isTextOrSubcategoryNonEmpty}}
//     <div class="algolia-docsearch-suggestion--content">
//       <div class="algolia-docsearch-suggestion--subcategory-inline">{{{subcategory}}}</div>
//       <div class="algolia-docsearch-suggestion--title">{{{title}}}</div>
//       {{#text}}<div class="algolia-docsearch-suggestion--text">{{{text}}}</div>{{/text}}
//     </div>
//     {{/isTextOrSubcategoryNonEmpty}}
//   </div>
// </a>`;

//   const template = Hogan.compile(html);
//   console.log(template);
//   const output = template.render(result[1]);

//   console.log(output);

//   container.innerHTML = output;
// };

// const docsearchRenderer = ({ result, container, refine } = {}) => {
//   render(
//     html`
//       <div>
//         <h3>hello</h3>
//         <input onInput=${event => refine(event.target.value)} />

//         <pre><code>${JSON.stringify(result)}</code></pre>
//       </div>
//     `,
//     container
//   );
// };

// const docsearchRenderer = ({ result, container, refine } = {}) => {
//   container.innerHTML = `
//     <input>
//     <pre><code>${JSON.stringify(result)}</code></pre>
//   `;

//   container
//     .querySelector('input')
//     .addEventListener('input', event => refine(event.target.value));
// };

// import docsearch from 'docsearch'
// import docsearchTemplate from 'docsearch-template-starter'

docsearch({
  apiKey: '05f2b9f825e93891445000c63e103290',
  indexName: 'francoischalifour',
  input: document.querySelector('input'),
})(docsearchTemplateDefault);
