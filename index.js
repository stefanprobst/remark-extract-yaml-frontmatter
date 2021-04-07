const visit = require('unist-util-visit')
const YAML = require('yaml')

module.exports = attacher

function attacher() {
  return transformer
}

function transformer(tree, vfile) {
  visit(tree, 'yaml', visitor)

  function visitor(node) {
    vfile.data.frontmatter = YAML.parse(node.value)
    return visit.EXIT
  }
}
