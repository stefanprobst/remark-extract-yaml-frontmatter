import withFrontmatter from 'remark-frontmatter'
import fromMarkdown from 'remark-parse'
import { unified } from 'unified'
import { compile } from 'xdm'

import withParsedFrontmatter from '../src/index'
import withParsedFrontmatterExport from '../src/mdx'

function noop() {
  this.Compiler = function (tree) {
    return tree
  }
}

function createProcessor(options = {}) {
  const processor = unified()
    .use(fromMarkdown)
    .use(withFrontmatter)
    .use(withParsedFrontmatter, options)
    .use(noop)
  return processor
}

const fixture = `---
title: Test
authors:
  - stefan
---

# Heading

Text
`

it('should expose parsed yaml frontmatter on vfile.data', async () => {
  const { data } = await createProcessor().process(fixture)
  expect(data).toMatchInlineSnapshot(`
    Object {
      "frontmatter": Object {
        "authors": Array [
          "stefan",
        ],
        "title": "Test",
      },
    }
  `)
})

it('should expose transformed yaml frontmatter on vfile.data', async () => {
  const options = {
    transform(metadata) {
      return {
        ...metadata,
        authors: metadata.authors.map((author) => `🚀 ${author}`),
      }
    },
  }
  const { data } = await createProcessor(options).process(fixture)
  expect(data).toMatchInlineSnapshot(`
    Object {
      "frontmatter": Object {
        "authors": Array [
          "🚀 stefan",
        ],
        "title": "Test",
      },
    }
  `)
})

it('should expose parsed yaml frontmatter as named export', async () => {
  const file = await compile(fixture, {
    remarkPlugins: [
      withFrontmatter,
      withParsedFrontmatter,
      withParsedFrontmatterExport,
    ],
  })
  expect(String(file)).toMatchInlineSnapshot(`
    "/*@jsxRuntime automatic @jsxImportSource react*/
    import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from \\"react/jsx-runtime\\";
    export const metadata = {
      \\"title\\": \\"Test\\",
      \\"authors\\": [\\"stefan\\"]
    };
    function MDXContent(props = {}) {
      const {wrapper: MDXLayout} = props.components || ({});
      return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
        children: _jsx(_createMdxContent, {})
      })) : _createMdxContent();
      function _createMdxContent() {
        const _components = Object.assign({
          h1: \\"h1\\",
          p: \\"p\\"
        }, props.components);
        return _jsxs(_Fragment, {
          children: [_jsx(_components.h1, {
            children: \\"Heading\\"
          }), \\"\\\\n\\", _jsx(_components.p, {
            children: \\"Text\\"
          })]
        });
      }
    }
    export default MDXContent;
    "
  `)
  expect(file.data.frontmatter).toMatchInlineSnapshot(`
    Object {
      "authors": Array [
        "stefan",
      ],
      "title": "Test",
    }
  `)
})

it('should expose parsed yaml frontmatter as custom named export', async () => {
  const file = await compile(fixture, {
    remarkPlugins: [
      withFrontmatter,
      withParsedFrontmatter,
      [withParsedFrontmatterExport, { name: 'frontmatter' }],
    ],
  })
  expect(String(file)).toMatch(/export const frontmatter/)
  expect(file.data.frontmatter).toBeDefined()
})
