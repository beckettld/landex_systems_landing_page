import type { Metadata } from 'next'
import Article from '@/components/Article/Article'

const TITLE = 'Scan to BIM'
const DESCRIPTION =
  'Landex Systems turns a laser scan of a building into an IFC model automatically: slabs, walls, columns, beams, openings and services, each measured from the point cloud and written to IFC with schedules and drawings.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/scan-to-bim' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/scan-to-bim' },
}

export default function Page() {
  return (
    <Article
      eyebrow="Scan to BIM"
      title="A laser scan, returned as a BIM model."
      lede="Send a raw point cloud of a building. Get back an IFC model where every slab, wall, column and beam was measured from the scan, with the drawings and schedules that go with it. Nobody traces a wall."
      href="/scan-to-bim"
      live={{ href: 'https://bim.landexsystems.com', host: 'bim.landexsystems.com', title: 'A concrete shell under construction, as 109 IFC elements' }}
    >
      <h2>What comes back</h2>
      <ul>
        <li><strong>An IFC model.</strong> Slabs, walls, columns, beams, openings, cable trays and conduits, each placed and classified. Opens in Revit, Archicad, Solibri, BIMcollab or any IFC viewer.</li>
        <li><strong>Drawings.</strong> Plans and sections as a PDF sheet and a layered DXF.</li>
        <li><strong>Schedules.</strong> A CSV per element type with dimensions, position and how much of each element the scanner saw.</li>
        <li><strong>The viewer.</strong> The model over the raw points, so a modeller can toggle between the two and check the result instead of building it.</li>
      </ul>

      <h2>The example</h2>
      <p>
        The live example is a scan of a concrete shell under construction: about a million points, no drawings, no labels, lifts and stacked material still sitting inside. From that scan alone the system produced 109 elements. The lifts and stock were left out on purpose, as temporary. Every element records the share of its surface the scanner actually captured, so an occluded column reads differently from a fully seen one.
      </p>

      <h2>Where it fits</h2>
      <p>
        For a scanning firm, this is the modelling step done before the modeller opens the file. They check and finish rather than draw from zero. For an owner, it is a model of what is actually built, not what was designed. For a contractor, it is the as-built record at the stage the scan was taken.
      </p>
      <p>
        A BIM model is one deliverable among several. The same scan also returns <a href="/deliverables">plans, counts and takeoffs</a> without the model, if that is all you need.
      </p>
    </Article>
  )
}
