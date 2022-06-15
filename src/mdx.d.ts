import type { Plugin } from 'unified'

export interface RemarkExportFrontmatterMdxOptions {
  /**
   * The variable to export the frontmatter metadata as.
   *
   * @default 'metadata'
   */
  name?: string
}

declare const withExportedFrontmatter: Plugin<[RemarkExportFrontmatterMdxOptions?]>

export default withExportedFrontmatter
