import * as YAML from 'js-yaml'
import { visit, EXIT } from 'unist-util-visit'

export default function attacher() {
  return transformer
}

function transformer(tree, vfile) {
  visit(tree, 'yaml', visitor)

  function visitor(node) {
    vfile.data.frontmatter = YAML.load(node.value, { schema: YAML.CORE_SCHEMA })
    return EXIT
  }
}
