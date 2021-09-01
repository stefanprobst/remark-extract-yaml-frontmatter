import { visit } from 'unist-util-visit'
import * as YAML from 'yaml'

export default function attacher() {
  return transformer
}

function transformer(tree, vfile) {
  visit(tree, 'yaml', visitor)

  function visitor(node) {
    vfile.data.frontmatter = YAML.parse(node.value)
    return visit.EXIT
  }
}
