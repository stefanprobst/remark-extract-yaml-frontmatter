import type { Plugin } from 'unified'
import type { VFile } from 'vfile'

export interface RemarkExtractFrontmatterOptions {
  /**
   * Transform parsed frontmatter.
   */
  transform?: (frontmatter: unknown, vfile: VFile) => unknown
}

declare const extractFrontmatter: Plugin<[RemarkExtractFrontmatterOptions?]>

export default extractFrontmatter

export interface Frontmatter {}

declare module 'vfile' {
  interface DataMap {
    frontmatter: Partial<Frontmatter>
  }
}
