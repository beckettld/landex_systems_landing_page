import type { Metadata } from 'next'
import Article from '@/components/Article/Article'

const TITLE = 'Drone site survey from a point cloud'
const DESCRIPTION =
  'Landex Systems turns a drone point cloud into a site survey: every building, greenhouse, road, tree, vehicle and stockpile counted and measured, delivered as a PDF survey pack, GeoJSON layers and a CSV table.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/drone-site-survey' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/drone-site-survey' },
}

export default function Page() {
  return (
    <Article
      eyebrow="Drone site survey"
      title="A site, counted and measured from a drone capture."
      lede="Fly the site once. Send the point cloud. Get back every building, road, tree, vehicle and stockpile as a survey pack, GIS layers and a table, each item placed in real-world coordinates."
      href="/drone-site-survey"
      live={{ href: 'https://geospatial.landexsystems.com', host: 'geospatial.landexsystems.com', title: 'A 100 m tile of a rural site, 105 elements measured' }}
    >
      <h2>What comes back</h2>
      <ul>
        <li><strong>A survey pack.</strong> A PDF with the site plan, the inventory and the measurements, ready to hand over.</li>
        <li><strong>GIS layers.</strong> GeoJSON per class: buildings with storeys and roof form, roads with widths, walls, fences, hedges, trees, vehicles and stored material.</li>
        <li><strong>A table.</strong> A CSV of every element with its coordinates, dimensions and how much of it the drone saw.</li>
        <li><strong>The viewer.</strong> Every element outlined on the point cloud. Click the ground for its coordinates. Ask it what is parked where.</li>
      </ul>

      <h2>The example</h2>
      <p>
        The live tile is 100 by 100 metres of a rural site captured in one drone pass, with no ground control and no labels. On that tile the system found 14 roofed structures, 8 greenhouses with 13 bays and about 1,870 square metres under cover, 7 road runs totalling 235 metres, 4 cars, a flatbed trailer and a farm cart, 13 material piles and stacks, and 11 single trees plus 7 canopy groups. All of it measured from the points, none of it traced.
      </p>

      <h2>Where it fits</h2>
      <p>
        Planning submissions, site inventories, yard and stockpile counts, condition records before and after works, and any case where someone would otherwise spend a day in GIS drawing polygons over an orthophoto. Larger sites are tiled and re-assembled, so the same process covers a farm or a depot.
      </p>
      <p>
        See the full list of <a href="/deliverables">what we return from a scan</a>, indoors and out.
      </p>
    </Article>
  )
}
