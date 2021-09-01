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
import frontmatter from 'remark-frontmatter'
import yaml from '@stefanprobst/remark-extract-yaml-frontmatter'

const md = `---
title: Test
---

Text
`

const { data } = remark().use(frontmatter).use(yaml).processSync(md)
console.log(data.frontmatter)

// { title: 'Test' }
```

## When not to use

If you just want to extract frontmatter (without a full unified processor
pipeline), you can use [`vfile-matter`](https://github.com/vfile/vfile-matter).
