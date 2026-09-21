import type { Metadata } from 'next'
import Article from '@/components/Article/Article'

const TITLE = 'Ask the scan'
const DESCRIPTION =
  'Ask a point cloud a question in plain language and get a measured answer. Landex Systems labels every point in your scan, then answers counts, areas and distances on the spot, with the answer lit up in the viewer.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/ask-the-scan' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/ask-the-scan' },
}

export default function Page() {
  return (
    <Article
      eyebrow="Ask the scan"
      title="Type a question. The point cloud answers."
      lede="Reports cover the questions everyone asks. The scan can answer the ones only you ask. Count the chairs. How much greenhouse is on this tile. What is parked behind the shed. The answer comes back measured, and what it is about lights up in the view."
      href="/ask-the-scan"
      live={{ href: 'https://demo.landexsystems.com', host: 'demo.landexsystems.com', title: 'A LiDAR kitchen and a drone village, labeled and askable' }}
    >
      <h2>How it works for you</h2>
      <ul>
        <li><strong>Every point is labeled first.</strong> Before you ask anything, the scan has been turned into named elements pinned where they sit: walls, floors, fixtures, equipment, buildings, roads, trees.</li>
        <li><strong>You ask in plain language.</strong> No query language, no menu of reports. Questions about counts, sizes, distances, areas and what is where.</li>
        <li><strong>The answer is measured.</strong> Each number comes from the points, not from a guess about the picture, and the elements it refers to are highlighted so you can check.</li>
        <li><strong>It stays askable.</strong> The scan is hosted, so the next question next month costs nothing but the typing.</li>
      </ul>

      <h2>The examples</h2>
      <p>
        The live demo holds two scans. One is a LiDAR scan of a kitchen, where you can ask about the cabinets, the appliances and the clear floor. The other is a drone-survey tile of a village, where the questions are about buildings, greenhouses, roads, vehicles and stored material. Each opens with a few answers already recorded, and takes any question you type.
      </p>

      <h2>Where it fits</h2>
      <p>
        Owners who want to know what is in a space without a site visit. Facilities teams counting assets. Estimators checking a quantity. Anyone handed a point cloud who does not want to learn point cloud software to get one number out of it.
      </p>
      <p>
        Questions are one part of the return. The scan also comes back as <a href="/deliverables">plans, counts, takeoffs and models</a> you can download.
      </p>
    </Article>
  )
}
