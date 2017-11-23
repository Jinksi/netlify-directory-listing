const fs = require('fs')
const dirTree = require('directory-tree')
const Handlebars = require('handlebars')

const template = Handlebars.compile(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Files within {{path}}</title>

      <link rel="stylesheet" href="/styles.css">
    </head>

    <body>
      <main>
        <header>
          <h1>
            <i>Index of&nbsp;</i>

            {{#each children}}
              <a href="/{{path}}">{{name}}</a>
            {{/each}}
          </h1>

          <a class="single-column" id="toggle" title="click to toggle the view"></a>
        </header>

        <ul id="files">
          {{#each children}}
            <li>
              <a href="/{{path}}" title="{{title}}" class="{{ext}}">{{base}}</a>
              <i>{{size}}</i>
            </li>
          {{/each}}
        </ul>
      </main>

      <script type="text/javascript">
        (function() {
          toggle.addEventListener('click', function() {
            files.classList.toggle('single-column');
            toggle.classList.toggle('single-column');
          });
        })();
      </script>
    </body>
  </html>
`)

const data = dirTree('./files')
console.log(JSON.stringify(data, null, 2))
const html = template(data)
console.log(html)

const outputDir = 'public'
fs.writeFileSync('public/index.html', html)
