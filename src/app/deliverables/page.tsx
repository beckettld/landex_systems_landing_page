import type { Metadata } from 'next'
import Article, { articleStyles as s } from '@/components/Article/Article'

const TITLE = 'Deliverables from a point cloud'
const DESCRIPTION =
  'What Landex Systems returns from one scan: floor plans, equipment counts, quantity takeoffs, site inventories and a BIM model, as PDF, DXF, CSV, GeoJSON and IFC, plus a viewer you can ask questions in.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/deliverables' },
  openGraph: { title: `${TITLE} | Landex Systems`, description: DESCRIPTION, url: '/deliverables' },
}

export default function Page() {
  return (
    <Article
      eyebrow="Deliverables"
      title="Everything we return from one scan."
      lede="Scan to BIM is one thing we do. Most of what comes back from a scan is not a model at all. It is the counts, plans, measurements and answers your team would otherwise pull out of the point cloud by hand."
      href="/deliverables"
      live={{ href: 'https://bim.landexsystems.com', host: 'bim.landexsystems.com', title: 'Five real scans, each returned as a model' }}
    >
      <h2>The files</h2>
      <p>
        Each deliverable arrives in the format the people who use it already work in. Nothing needs our software to open.
      </p>
      <table className={s.table}>
        <thead>
          <tr>
            <th>What you get</th>
            <th>Delivered as</th>
            <th>Who usually asks for it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Floor plans and areas by room</td>
            <td><code>PDF</code> sheet, <code>DXF</code> drawing</td>
            <td>Architects, facilities, brokers</td>
          </tr>
          <tr>
            <td>Equipment, fixture and asset counts</td>
            <td><code>CSV</code> schedule, each item pinned in the viewer</td>
            <td>Facilities, MEP, owners</td>
          </tr>
          <tr>
            <td>Quantity takeoffs and stockpile inventories</td>
            <td><code>CSV</code> with lengths, areas and volumes</td>
            <td>Estimators, contractors, yards</td>
          </tr>
          <tr>
            <td>Site survey of a drone capture</td>
            <td><code>PDF</code> survey pack, <code>GeoJSON</code> layers, <code>CSV</code> table</td>
            <td>Surveyors, civil, planners</td>
          </tr>
          <tr>
            <td>BIM model (Shell, Shell + MEP, Civil + outdoor)</td>
            <td><code>IFC</code> or Revit, with element schedules as <code>CSV</code></td>
            <td>Scanning firms, BIM managers</td>
          </tr>
          <tr>
            <td>Answers to anything else</td>
            <td>Typed into the viewer, answered on the same page</td>
            <td>Everyone</td>
          </tr>
        </tbody>
      </table>

      <h2>The viewer</h2>
      <p>
        Every scan also comes back hosted in a viewer where each element is labeled and pinned where it sits. Ask it a question in plain language and the answer lights up in the point cloud. There is no menu of reports. If you need a count that is not on the list, you type it.
      </p>

      <h2>What we need from you</h2>
      <p>
        One scan you already have, as E57, LAS or LAZ. Tell us what was captured and what you want back. Send it to us and we will show you the result, or <a href="/tesseract/pricing">pick a plan</a> and upload it yourself. A model is usually back within an hour.
      </p>

      <h2>Every number is measured</h2>
      <p>
        Nothing on a sheet is estimated from a photo or typed in by a person. Each count, length and area is measured from the points in the scan, and each element records how much of it the scanner actually saw, so you know which numbers to trust and which to check.
      </p>
    </Article>
  )
}
