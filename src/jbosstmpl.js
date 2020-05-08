const asciidoctor = require('asciidoctor')();

class JBossTmpl {
    constructor () {
        this.baseConverter = asciidoctor.Html5Converter.$new()
        this.templates = {
            document: (node) => `
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${node.getDocumentTitle()} - JBoss.org</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/custom-elements-es5-adapter.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.4.3/webcomponents-bundle.js"></script>
                <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;500;600&family=Montserrat&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="css/jbossorg.css">
            </head>
            <body class="${node.getAttribute('short-name')}">
            <header>
                <h1 class="site-home"><a href="/">JBoss<strong>.ORG</strong></a></h1>
                <nav>
                    <a href="blogs.html">Blogs</a>
                    <a href="twitter.html">Twitter</a>
                    <a href="#">Projects</a>
                </nav>
            </header>
            <main id="main-content">
                <article class="">
                ${node.getContent()}
                </article>
                
            </main>
            <script type="module" src="js/cpx-search/cpx-query.js"></script>
            <script type="module" src="js/cpx-search/cpx-results.js"></script>
            <script src="js/jbossorg.js"></script>
            </body>
            </html>`,
            paragraph: (node) => `<p>${node.getContent()}</p>`,
            preamble: (node) => `${ node.getSourceLocation() && node.getSourceLocation().getFile().indexOf('index') < 0 ? '' : '<div class="preamble">'}
            <h2>${node.getAttribute('heading')}</h2>
            <p>${node.getContent()}</p>
            ${ node.getSourceLocation()&& node.getSourceLocation().getFile().indexOf('index') < 0 ? '' : '</div>'}`        
        }
    }

    convert (node, transform, opts) {
        const template = this.templates[transform || node.node_name]
        if (template) {
            return template(node)
        }
        return this.baseConverter.convert(node, transform, opts)
    }
}

module.exports = JBossTmpl;