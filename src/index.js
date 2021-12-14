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

      return EXIT
    }

    if (
      vfile.data.frontmatter != null &&
      typeof options.transform === 'function'
    ) {
      const result = options.transform(vfile.data.frontmatter, vfile)
      if (typeof result.then === 'function') {
        return result.then((transformed) => {
          vfile.data.frontmatter = transformed
        })
      } else {
        vfile.data.frontmatter = result
      }
    }

    return undefined
  }
}
