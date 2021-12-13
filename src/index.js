import * as YAML from 'js-yaml'
import { visit, EXIT } from 'unist-util-visit'

export default function attacher(options = {}) {
  return transformer

  function transformer(tree, vfile) {
    visit(tree, 'yaml', visitor)

    function visitor(node) {
      vfile.data.frontmatter = YAML.load(node.value, {
        schema: YAML.CORE_SCHEMA,
      })

      if (typeof options.transform === 'function') {
        vfile.data.frontmatter = options.transform(
          vfile.data.frontmatter,
          vfile,
        )
      }

      return EXIT
    }
  }
}
