# remark-extract-yaml-frontmatter

[remark](https://github.com/remarkjs/remark) transformer plugin to parse `yaml`
nodes and expose parsed data on `vfile.data.frontmatter`. Works on `yaml` nodes
created by
[`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter).

## How to install

```bash
yarn add remark-frontmatter @stefanprobst/remark-extract-yaml-frontmatter
```

## How to use

```js
import { remark } from 'remark'
import withFrontmatter from 'remark-frontmatter'
import withParsedFrontmatter from '@stefanprobst/remark-extract-yaml-frontmatter'

const md = `---
title: Test
---

Text
`

const file = remark()
  .use(withFrontmatter)
  .use(withParsedFrontmatter)
  .processSync(md)

const frontmatter = file.data.frontmatter

console.log(frontmatter)
// { title: 'Test' }
```

## When not to use

If you just want to extract frontmatter (without a full unified processor
pipeline), you can use [`vfile-matter`](https://github.com/vfile/vfile-matter).

## How to use with MDX

When transforming MDX documents, you can expose the frontmatter as a named
export, which defaults to `metadata`.

```js
import { compile } from '@mdx-js/mdx'
import withFrontmatter from 'remark-frontmatter'
import withParsedFrontmatter from '@stefanprobst/remark-extract-yaml-frontmatter'
import withParsedFrontmatterExport from '@stefanprobst/remark-extract-yaml-frontmatter/mdx'

async function run() {
  const file = await compile(doc, {
    remarkPlugins: [
      withFrontmatter,
      withParsedFrontmatter,
      withParsedFrontmatterExport,
      /** Optionally, provide a custom name for the export. */
      // [withParsedFrontmatterExport, { name: 'frontmatter' }],
    ],
  })

  console.log(String(file))
}

run()
```

If you are using TypeScript, you can add typings with:

```js
/** mdx.d.ts (should be referenced in `tsconfig.json#include`) */
declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'

  export const metadata: Record<string, unknown>
  export default function MDXContent(props: MDXProps): JSX.Element
}
```
