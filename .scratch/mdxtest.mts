import { compile } from '@mdx-js/mdx'
const src = `
Some prose.

<DecisionTable
  caption="A caption"
  columns={["a", "b"]}
  rows={[{ option: "x", cells: ["1", "2"] }]}
/>

More prose.
`
const out = String(await compile(src, { jsx: true }))
const m = out.match(/DecisionTable[\s\S]{0,400}/)
console.log(m?.[0] ?? out.slice(0, 600))
