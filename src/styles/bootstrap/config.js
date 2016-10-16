/**
 * Bootstrap configuration for bootstrap-sass-loader
 *
 * Scripts are disabled to not load jQuery.
 * If you depend on Bootstrap scripts consider react-bootstrap instead.
 * https://github.com/react-bootstrap/react-bootstrap
 *
 * In order to keep the bundle size low in production
 * disable components you don't use.
 *
 */

module.exports = {
  preBootstrapCustomizations: './src/styles/variables.scss',
  mainSass: './src/styles/bootstrap/overrides.scss',
  verbose: false,
  debug: false,
  styles: {
    mixins: true,
    normalize: true,
    print: true,
    code: true,
    tables: true,
    forms: true,
    buttons: true,
    'component-animations': true,
    dropdowns: true,
    'button-groups': true,
    'input-groups': true,
    breadcrumbs: true,
    pagination: true,
    pager: true,
    labels: true,
    badges: true,
    thumbnails: true,
    alerts: true,
    'progress-bars': true,
    media: true,
    'list-group': true,
    panels: true,
    'responsive-embed': true,
    close: true,
    modals: true,
    tooltip: true,
    popovers: true,
    type: true,
    utilities: true,

    // NOT USED
    navs: false,
    navbar: false,
    jumbotron: false,
    wells: false,
    grid: false,
    scaffolding: false,
    glyphicons: false,
    carousel: false,
    'responsive-utilities': false,
  },
  // We don't use boostrap's javascript
  scripts: {
    transition: false,
    alert: false,
    button: false,
    carousel: false,
    collapse: false,
    dropdown: false,
    modal: false,
    tooltip: false,
    popover: false,
    scrollspy: false,
    tab: false,
    affix: false
  },
};
