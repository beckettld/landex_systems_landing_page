import type { Metadata } from 'next'
import Article from '@/components/Article/Article'

const TITLE = 'Scan to BIM'
const DESCRIPTION =
  'Tesseract by Landex turns a laser scan of a building or structure into an IFC or Revit model: walls, slabs, openings, columns, beams and services, each measured from the point cloud.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/scan-to-bim' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/scan-to-bim' },
}

export default function Page() {
  return (
    <Article
      eyebrow="Scan to BIM · Tesseract"
      title="A laser scan, returned as a BIM model."
      lede="Send a raw point cloud of a building. Get back an IFC or Revit model where every slab, wall, column and beam was measured from the scan, usually within an hour. Nobody traces a wall."
      href="/scan-to-bim"
      live={{ href: 'https://bim.landexsystems.com', host: 'bim.landexsystems.com', title: 'A house, a plant room, a timber frame, a lattice tower and a motorway bridge, each as a model over its scan' }}
    >
      <h2>What comes back</h2>
      <ul>
        <li><strong>An IFC or Revit model.</strong> Slabs, walls, columns, beams, openings, cable trays and conduits, each placed and classified. Opens in Revit, Archicad, Solibri, BIMcollab or any IFC viewer.</li>
        <li><strong>Schedules.</strong> A CSV per element type with dimensions, position and how much of each element the scanner saw.</li>
        <li><strong>The viewer.</strong> The model over the raw points, so a modeller can toggle between the two and check the result instead of building it.</li>
      </ul>

      <h2>The example</h2>
      <p>
        The live examples are five real scans: a brick cottage (129 elements), a plant room (130), a timber-frame hall (184), a lattice steel tower (557) and a tied-arch motorway bridge (233). Each model sits over its scan, so you can switch between the two and check every element against the points it came from.
      </p>

      <h2>Tesseract</h2>
      <p>
        Scan to BIM at Landex is a product called <a href="/tesseract">Tesseract</a>: upload a scan, pick Shell, Shell + MEP or Civil + outdoor, see the price, get the model. <a href="/tesseract/pricing">Plans and credits</a>.
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
