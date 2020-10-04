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
const remark = require('remark')
const frontmatter = require('remark-frontmatter')
const yaml = require('@stefanprobst/remark-extract-yaml-frontmatter')

const md = `---
title: Test
---

Text
`

const { data } = remark().use(frontmatter).use(yaml).processSync(md)
console.log(data.frontmatter)

// { title: 'Test' }
```
