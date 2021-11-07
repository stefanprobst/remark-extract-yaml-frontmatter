import type { Plugin } from 'unified'

export interface RemarkExtractFrontmatterOptions {
  /**
   * Transform parsed frontmatter.
   */
  transform?: (frontmatter: unknown) => unknown
}

declare const extractFrontmatter: Plugin<[RemarkExtractFrontmatterOptions?]>

export default extractFrontmatter
