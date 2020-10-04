const frontmatter = require('remark-frontmatter')
const markdown = require('remark-parse')
const unified = require('unified')
const extract = require('.')

function noop() {
  this.Compiler = function (tree) {
    return tree
  }
}

const processor = unified()
  .use(markdown, { position: false })
  .use(frontmatter)
  .use(extract)
  .use(noop)

const fixture = `---
title: Test
---

# Heading

Text
`

it('should expose parsed yaml frontmatter on vfile.data', async () => {
  const { data } = await processor.process(fixture)
  expect(data).toMatchInlineSnapshot(`
    Object {
      "frontmatter": Object {
        "title": "Test",
      },
    }
  `)
})
