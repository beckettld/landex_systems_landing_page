// Blog post data. Each post is a structured document so we can render it
// without pulling in an MDX/markdown toolchain. Keep the voice human, specific,
// and technical. No filler, no em dashes.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  author: string;
  readingTime: string;
  tags: string[];
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "digitize-paper-utility-maps-guide",
    title: "How to digitize paper utility maps without losing your mind",
    description:
      "A practical, field-tested walkthrough for turning decades of paper utility atlases into searchable, georeferenced data your team will actually use.",
    date: "2026-03-24",
    author: "Beckett Devoe",
    readingTime: "11 min read",
    tags: ["digitization", "GIS", "utilities", "how-to"],
    blocks: [
      {
        type: "p",
        text: "If you manage utility records for a city, a campus, or a water district, you already know the problem. Somewhere in your building there is a room, or a closet, or a very tired flat file, and inside it are the drawings that tell you where everything is buried. They are taped, coffee-stained, marked up in three colors of pencil by people who retired before you were hired. Half of them are the only copy.",
      },
      {
        type: "p",
        text: "This post is the guide I wish existed when I started doing this work. It is not a sales pitch for any one tool. It is what actually happens when you take a stack of paper utility maps and try to turn them into something a GIS analyst, a locator, or a contractor can query. I will walk through the steps in the order they matter, flag the places teams get stuck, and give you numbers you can plan around.",
      },
      { type: "h2", text: "Start with the question, not the scanner" },
      {
        type: "p",
        text: "The single most expensive mistake I see is teams buying a big scanner, digitizing everything, and then trying to figure out what to do with the files. You end up with a terabyte of TIFFs nobody can find anything in. Before any paper moves, write down the questions you want to be able to answer on the other side. A few that come up constantly:",
      },
      {
        type: "ul",
        items: [
          "Where is the nearest shutoff valve to this address?",
          "What is the material and install year of this main?",
          "Which sheets cover the block between 4th and 6th on Oak?",
          "Show me every as-built that mentions a specific project number.",
          "Did we ever abandon a line under this new building footprint?",
        ],
      },
      {
        type: "p",
        text: "Those questions drive everything else. They tell you what metadata you need to capture, how precisely you need to georeference, and whether you need full vectorization or just a searchable raster index. If all you need is the third question, you do not need to vectorize anything. You need a good index and decent georeferencing. That can be the difference between a six month project and a two year project.",
      },
      { type: "h2", text: "Inventory before you scan" },
      {
        type: "p",
        text: "Walk the room with a clipboard. Count sheets, not folders. Note the sheet size distribution, because that drives scanner choice. Note condition: brittle, taped, mylar, linen, blueprint, sepia. Note whether sheets are in a logical order or whether someone is going to have to reconstruct the grid from scratch.",
      },
      {
        type: "p",
        text: "On a recent campus project we expected around 800 sheets and found just over 1,200 once we actually counted. That 50 percent miss would have blown up the budget if we had quoted on the original number. Count twice.",
      },
      {
        type: "p",
        text: "While you are in the room, photograph every index sheet, key map, and handwritten legend you can find. These are the Rosetta Stones. They tell you what the symbols mean, what the sheet numbering system is, and which sheets belong to which era of construction. If you lose the index, you can usually rebuild it, but it will cost you weeks.",
      },
      { type: "h2", text: "Scanning: the boring part that decides everything" },
      {
        type: "p",
        text: "Scan at 400 DPI minimum for anything you might vectorize or OCR. 300 is fine for pure visual archive. Go to 600 for anything with tight hatching, small text, or faint pencil annotations. Color, not grayscale, even if the original looks monochrome. You will thank yourself the first time you need to separate a red pencil redline from a black printed line.",
      },
      {
        type: "p",
        text: "Large format sheets need a roll feed scanner that can handle fragile media. For anything taped, torn, or brittle, do not feed it through rollers. Use a flatbed or an overhead capture setup. A single ripped sheet can cost more to restore than the entire scanning budget for the day.",
      },
      {
        type: "p",
        text: "Name files with a scheme you can parse later. Sheet number, date, project, revision, in that order, separated by underscores. Do not use spaces. Do not use the original file names from whatever scanner came with the copier. You will regret it in month three when you try to batch process and the filenames have eleven different date formats in them.",
      },
      { type: "h2", text: "Georeferencing: good enough is a real answer" },
      {
        type: "p",
        text: "This is where projects stall. People hear the word georeference and assume every drawing needs to be warped to sub foot accuracy. For most legacy utility work, that is not true and chasing it will bankrupt you.",
      },
      {
        type: "p",
        text: "Think about georeferencing in three tiers, and pick per sheet:",
      },
      {
        type: "ol",
        items: [
          "Tile level: the sheet is placed on the map in roughly the right spot, oriented correctly, and bounded by a rectangle. Good enough to answer 'which sheet covers this corner'. Fast, cheap, scales to thousands of sheets a week.",
          "Control point level: four to eight tie points to known features like street intersections, building corners, or survey monuments. Accuracy in the one to five meter range. Good enough for most planning and locate work.",
          "Rubber sheet level: many control points and a transformation that warps the raster to fit modern survey. Sub meter accuracy on good source material. Expensive, slow, and worth it only for specific high stakes areas.",
        ],
      },
      {
        type: "p",
        text: "The mistake is doing tier three on everything. The right move is tier one on the whole archive, then tier two on the neighborhoods or systems that get the most locate tickets, then tier three only where someone is about to dig near something expensive.",
      },
      { type: "h2", text: "Indexing and OCR: the unsexy unlock" },
      {
        type: "p",
        text: "Once sheets are scanned and loosely georeferenced, the biggest leverage you get is making the text searchable. Sheet titles, revision blocks, project numbers, street names, valve tags, manhole IDs. Most of this is printed and OCRs cleanly. A surprising amount is handwritten and does not. Plan for both.",
      },
      {
        type: "p",
        text: "Run OCR on the full sheet first for coverage, then run a second pass that is restricted to the title block region. The title block is where the high value structured metadata lives, and a targeted pass on a known region is dramatically more reliable than trying to parse the whole drawing. Write the extracted fields into a database, not back into the image. You want structured data you can query, not a searchable PDF.",
      },
      {
        type: "p",
        text: "For handwritten notes, do not try to auto transcribe at scale in 2026 unless you are willing to hand verify. Instead, flag regions that contain handwriting so a human reviewer can transcribe them in batches. That workflow is a lot cheaper than it sounds and far more accurate than a fully automated pipeline.",
      },
      { type: "h2", text: "Vectorization: only when you need it" },
      {
        type: "p",
        text: "Vectorizing means turning the lines on the drawing into GIS features with attributes. Pipes become polylines with diameter, material, and install year. Valves become points with tag numbers. This is the most expensive step by a wide margin, and it is where teams burn the most money on things they did not actually need.",
      },
      {
        type: "p",
        text: "Vectorize the assets that drive decisions. Mains, valves, hydrants, manholes, service connections if you run a small enough system to justify it. Do not vectorize every leader line, every north arrow, every title block border. Do not try to preserve the drawing as a drawing. You are building a data model, not making a copy.",
      },
      {
        type: "p",
        text: "A rough rule of thumb from recent projects: tier one indexing runs about 5 to 15 dollars a sheet at volume. Tier two georeferencing plus OCR and title block extraction runs 25 to 75 dollars a sheet. Full vectorization with QA is anywhere from 150 to 600 dollars a sheet depending on density and source quality. These numbers move around, but the ratios are stable. Vectorization is always at least an order of magnitude more expensive than indexing.",
      },
      { type: "h2", text: "QA is a process, not a step" },
      {
        type: "p",
        text: "Every pipeline I have seen that tried to bolt QA onto the end failed. You cannot audit a hundred thousand features at the end of a project. You have to sample continuously, from the first week, and you have to close the loop with whoever is doing the work. Pick a sample rate, hold it, and track error rates by source sheet, by operator, and by feature type. When a specific sheet series shows high error rates, that is usually a data quality problem upstream, not an operator problem.",
      },
      {
        type: "p",
        text: "The most useful QA metric is not accuracy in the abstract. It is how often a field crew goes to a location based on the digitized data and finds what the data said would be there. Track that. Ask your locators. They will tell you exactly where your data is good and where it is lying to you.",
      },
      { type: "h2", text: "What to do Monday morning" },
      {
        type: "ol",
        items: [
          "Write down the five questions you want to answer from your archive.",
          "Walk the room and actually count sheets and note condition.",
          "Photograph every index and legend sheet you find.",
          "Pick a pilot: one neighborhood, one system, or one project era. Do the whole pipeline on that pilot before you scale.",
          "Measure cost and error rate on the pilot. Use those numbers to scope the rest.",
        ],
      },
      {
        type: "p",
        text: "The teams that succeed at this are not the ones with the biggest budgets. They are the ones who scope ruthlessly, pilot before they commit, and resist the urge to vectorize everything. Your paper archive is not going anywhere. You can keep improving the digitization over time. The goal in year one is to make it searchable and roughly locatable. Everything else is an upgrade on top of that foundation.",
      },
      {
        type: "p",
        text: "If you want to talk through a specific archive, we do this for a living and we are happy to look at a few sample sheets and tell you what tier makes sense. No pitch, just an opinion. That offer is real.",
      },
    ],
  },
  {
    slug: "ocr-engineering-drawings-what-works",
    title: "OCR on engineering drawings: what actually works in 2026",
    description:
      "A grounded look at running OCR and layout models on scanned utility plans and as-built drawings, including what fails, what works, and how to build a pipeline you can trust.",
    date: "2026-03-31",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["OCR", "computer vision", "drawings", "AI"],
    blocks: [
      {
        type: "p",
        text: "Every few months someone sends me a screenshot of a hosted OCR demo reading a clean invoice and asks whether we can just point it at a pile of utility drawings and be done. The honest answer is no, but the more useful answer is that a lot of it does work, if you stop treating a drawing like a document and start treating it like a scene.",
      },
      {
        type: "p",
        text: "This post is what I have learned running text extraction against tens of thousands of scanned engineering drawings over the last couple of years. It is opinionated and specific. If you are evaluating OCR for an archive project, this should save you a few weeks.",
      },
      { type: "h2", text: "Why generic OCR falls over on drawings" },
      {
        type: "p",
        text: "Document OCR is tuned for a world where text sits in lines, lines sit in columns, and the page is mostly white. Engineering drawings violate all three assumptions. Text is rotated at every angle. It overlaps line work, hatching, and dimension arrows. The same sheet mixes 14 point title block type with 6 point annotations that were stamped on a mylar forty years ago. A generic model sees all of that as noise and hallucinates structure that is not there.",
      },
      {
        type: "p",
        text: "The first time you run Tesseract on a full utility plan you will get back something that looks like a ransom note. That is not a bug in Tesseract. It is a mismatch between the model and the input. The fix is not a better model. The fix is to stop asking the model to read the whole page.",
      },
      { type: "h2", text: "Segment first, read second" },
      {
        type: "p",
        text: "The single most important shift is to do layout analysis before you run any text recognition. You want to find the regions on the sheet that contain text, classify what kind of region each one is, and then run a recognizer that is appropriate for that region. On a typical utility plan you can count on finding:",
      },
      {
        type: "ul",
        items: [
          "A title block in a known corner, usually lower right. Structured fields, printed text, high value.",
          "A revision block, often stacked above or beside the title block.",
          "A legend or symbol table, sometimes on sheet one of a set only.",
          "Sheet notes, usually as a numbered list in a margin.",
          "In-drawing annotations: pipe sizes, materials, station callouts, elevations, valve tags.",
          "Dimension text attached to dimension lines.",
          "Street names and parcel IDs in the map body.",
          "Stamped approvals, seals, and handwritten redlines.",
        ],
      },
      {
        type: "p",
        text: "Each of those categories wants a different treatment. The title block wants a targeted crop plus a recognizer tuned for printed text and a schema you know in advance. In-drawing annotations want a detector that can find small rotated text at arbitrary angles. Handwriting wants to be flagged and kicked to a human queue or a specialized model, not passed to your default OCR engine and silently mangled.",
      },
      { type: "h2", text: "The pipeline that actually holds up" },
      {
        type: "p",
        text: "Here is the shape of the pipeline we run today. It is not the only way, but every piece is there because something earlier broke without it.",
      },
      {
        type: "ol",
        items: [
          "Pre-process the raster. Deskew, denoise, normalize contrast, and detect the drawing frame. Crop to the frame so margins and scanner artifacts do not confuse downstream models.",
          "Run a layout detector that outputs region boxes with type labels. Title block, revision block, legend, notes, body. A fine tuned model on a few thousand labeled sheets beats any off the shelf document model by a wide margin for this.",
          "For each structured region, crop and route to a recognizer that expects that region type. Title block recognition is a constrained extraction problem, not a free form OCR problem. You know the field names. Ask for them.",
          "For the body of the drawing, run a rotated text detector. Modern scene text models handle this well. Feed each detected box to a recognizer that supports non horizontal input.",
          "Classify every recognized string by what it probably is. A four digit number near a pipe symbol is probably a station or a diameter, not a year. Context matters and you should encode it.",
          "Write the results to a structured store keyed by sheet and region. Never flatten the output into a single text blob. You will need the structure later.",
          "Score every extraction with a confidence and a provenance pointer back to the pixel region it came from. This is what makes review possible.",
        ],
      },
      { type: "h2", text: "Where large language models actually help" },
      {
        type: "p",
        text: "LLMs are not a replacement for OCR on drawings. They are a very good post processor. Once you have candidate strings from a recognizer, an LLM is excellent at tasks like normalizing units, resolving abbreviations, matching free form material descriptions to a controlled vocabulary, and validating that a title block extraction is internally consistent. If the sheet number says A4 and the file name says sheet 17, the LLM will notice and flag it. A regex will not.",
      },
      {
        type: "p",
        text: "Vision language models are also getting genuinely useful for targeted questions on a cropped region. Feed them the title block crop and ask for structured JSON with named fields. The best of them are now reliable enough to be a first pass on clean printed blocks, with a rules based validator on the back end and a human in the loop on anything below a confidence threshold. Do not feed them the whole sheet and ask for everything. That is where they hallucinate, confidently.",
      },
      { type: "h2", text: "Handwriting is still the hard part" },
      {
        type: "p",
        text: "If your archive has meaningful handwritten content, and most utility archives do, accept up front that you will not fully automate it. The right goal is not to transcribe every handwritten annotation. The right goal is to detect that handwriting exists in a specific region, capture the crop, and route it to a human reviewer with enough context to transcribe quickly.",
      },
      {
        type: "p",
        text: "The economics on this are better than you expect. A trained reviewer can clear a few hundred handwritten annotations an hour if the tool shows them the crop, the sheet context, and a form field ready to type into. What kills you is making a reviewer hunt for the annotations on a full sheet. Let the model find them. Let the human read them.",
      },
      { type: "h2", text: "Things that will waste your time" },
      {
        type: "ul",
        items: [
          "Hoping that a higher DPI scan will fix a bad pipeline. It will not. 400 DPI is almost always enough. Your problems are further downstream.",
          "Building a mega prompt that asks a VLM to output every field from a raw sheet. It will invent fields with total confidence.",
          "Training a custom OCR model from scratch. You do not have enough labeled data and you do not need to. Fine tune a recognizer and invest your training budget in layout.",
          "Chasing 100 percent accuracy. The last 5 percent costs more than the first 95 and is almost always better served by a review queue than by more model work.",
          "Ignoring confidence scores. If you are not thresholding and routing, you are just guessing.",
        ],
      },
      { type: "h2", text: "What good looks like" },
      {
        type: "p",
        text: "A pipeline you can trust has three properties. It knows what it does not know, which means every output has a confidence and a region of origin. It is auditable, which means any value in your database can be traced back to the exact pixels it came from. And it improves, which means every human correction flows back into training data for the next round.",
      },
      {
        type: "p",
        text: "If you build those three properties in from the start, you can live with lower accuracy in week one because you have a clear path to higher accuracy in month six. If you do not, you end up with a black box that extracts data nobody trusts and nobody will use. I have watched several large archive projects end that way. It is avoidable.",
      },
      { type: "h2", text: "A minimum viable test for a vendor or a tool" },
      {
        type: "p",
        text: "If you are evaluating OCR for your archive, do not accept a canned demo. Send a stratified sample of ten sheets from your actual collection: two clean modern prints, two mid era blueprints, two mylars with pencil redlines, two high density plan and profile sheets, and two of your worst. Ask for structured output with confidence scores and region pointers, not a PDF with a hidden text layer. If the vendor pushes back on that format, that tells you what you need to know.",
      },
      {
        type: "p",
        text: "OCR on drawings is not the impossible problem it was five years ago, but it is also not the solved problem that the demos imply. The teams doing it well are boring about it. They segment, they threshold, they review, they iterate. That is the whole trick.",
      },
    ],
  },
  {
    slug: "utility-map-digitization-cost",
    title: "How much does utility map digitization actually cost?",
    description:
      "Real numbers, real ranges, and an honest breakdown of where the money goes when you digitize a legacy utility archive.",
    date: "2026-04-07",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["digitization", "cost", "utilities", "planning"],
    blocks: [
      {
        type: "p",
        text: "The most common question we get before any project starts is: what is this going to cost? It is a fair question and the answer is almost always 'it depends,' which is not helpful. So here is a more useful answer: here are the real numbers, the real ranges, and an explanation of what drives cost in each phase.",
      },
      {
        type: "p",
        text: "These figures come from projects we have worked on or evaluated in detail. The ranges are wide because the inputs vary widely. A clean set of modern CAD plots from a recent project is cheap to process. A collection of fragile linen drawings from 1940 with pencil annotations in three languages is expensive. Most archives sit somewhere in between.",
      },
      {
        type: "p",
        text: "One thing to know before you read any numbers: vendors quote this work in very different ways. Some quote per sheet. Some quote per linear foot of utility digitized. Some quote as a lump sum after a discovery phase. All three are legitimate, but they make direct comparison almost impossible unless you understand what is and is not included. I will try to make this apples-to-apples by breaking down each cost component separately.",
      },
      { type: "h2", text: "The five cost components" },
      {
        type: "p",
        text: "Digitization projects have five distinct cost buckets. Most vendors bundle them in ways that obscure which phases you are actually paying for. Unbundle them before you evaluate any quote.",
      },
      {
        type: "ol",
        items: [
          "Physical handling and preparation",
          "Scanning",
          "Georeferencing",
          "Indexing and OCR",
          "Vectorization and attribute population",
        ],
      },
      {
        type: "p",
        text: "You do not need all five for every project. Most archives need the first three plus a basic index. Only a subset need vectorization. Paying for five phases when you need three is a real and common mistake, and it usually happens because the organization did not scope before they solicited proposals.",
      },
      { type: "h2", text: "Physical handling and preparation" },
      {
        type: "p",
        text: "Someone has to touch every sheet. Unfold it, check its condition, flag damage, organize it against an index. For large format drawings in reasonable condition, figure 2 to 4 minutes per sheet. For a collection with significant folding, tears, or unusual formats, budget 6 to 10 minutes per sheet.",
      },
      {
        type: "p",
        text: "At typical hourly rates for this kind of tech work, preparation costs run $0.50 to $2.00 per sheet. On a 5,000 sheet archive, that is $2,500 to $10,000 before anyone scans anything. It is often the least glamorous line item and the most underestimated.",
      },
      {
        type: "p",
        text: "Preparation also includes building the initial inventory: recording what you have, in what physical condition, organized against whatever filing system exists. This is a separate task from scanning and should be scoped separately. Organizations that skip it and go straight to scanning almost always discover mid-project that their sheet count was off by 20 to 40 percent, which breaks the budget.",
      },
      { type: "h2", text: "Scanning" },
      {
        type: "p",
        text: "Large format scanning at 400 DPI for a mix of sheet sizes runs $1.00 to $3.00 per sheet at reputable reprographics shops, or $3.00 to $8.00 per sheet if you are sending to a specialty vendor with conservation handling for fragile material. In-house scanning with a rented or leased wide format scanner cuts the per-sheet cost but adds setup, staffing, and QA overhead that usually wipes out the savings at volumes below 10,000 sheets.",
      },
      {
        type: "p",
        text: "The number that surprises people: scanning is rarely the biggest cost in a digitization project. It feels like the main event, but it usually represents 10 to 25 percent of total project cost once you add everything else. Organizations that treat the scanning quote as the project budget estimate are systematically setting themselves up for overruns.",
      },
      {
        type: "p",
        text: "What to specify when you send drawings to be scanned: 400 DPI minimum for any drawing you might later vectorize or run OCR on. Color, not grayscale, even if the original looks monochrome. TIFF for archival quality, PDF for access copies. A consistent file naming scheme agreed to in advance. And QA criteria, specifically what percentage of scans will be reviewed and what constitutes a rescan trigger.",
      },
      { type: "h2", text: "Georeferencing" },
      {
        type: "p",
        text: "This is where the range gets wide. Rough placement, which means dropping a sheet onto a map in approximately the right location and orientation, costs $5 to $15 per sheet. Four to eight control point registration to modern survey or aerial imagery runs $20 to $60 per sheet. Full rubber sheet transformation with many control points and accuracy validation runs $75 to $200 per sheet.",
      },
      {
        type: "p",
        text: "For a 3,000 sheet water utility archive, the difference between rough placement and full rubber sheet transformation is the difference between a $15,000 georeferencing budget and a $300,000 one. The right tier depends entirely on what decisions you need to make with the data. For most planning and search use cases, control point registration is enough.",
      },
      {
        type: "p",
        text: "A practical triage approach: rough placement for all sheets, then control point registration for the areas that see the most locate tickets or the most active construction. Leave full rubber sheet for the specific high-stakes corridors where a locator needs sub-meter confidence. This approach gets you functional geographic search across the entire archive without blowing your budget on accuracy you will never use.",
      },
      { type: "h2", text: "Indexing and OCR" },
      {
        type: "p",
        text: "A basic title block extraction, sheet number, project name, date, revision, area covered, runs $5 to $25 per sheet depending on how clean the source material is and how complex the title block schema is. If you add full text OCR of the drawing body plus a structured keyword index, budget $15 to $50 per sheet. These numbers assume printed text. Handwritten content adds cost because it requires human review.",
      },
      {
        type: "p",
        text: "The output of this phase is a database you can search. For most organizations, getting to a searchable index is the highest ROI step in the entire project. Being able to answer 'which sheets cover this block' in five seconds instead of forty minutes pays back fast.",
      },
      {
        type: "p",
        text: "When evaluating vendors for this phase, ask specifically what they extract from the title block and how they handle title blocks that vary in format across different project eras. Most archives span 30 to 50 years of drawing production, and the title block layout changed every time a new CAD template was adopted. A vendor who extracts a fixed set of fields from a fixed location will fail on a third of your sheets. A vendor who uses adaptive extraction that handles layout variation will cost more per sheet and produce more usable output.",
      },
      { type: "h2", text: "Vectorization" },
      {
        type: "p",
        text: "Full vectorization, converting drawn lines into GIS features with attributes, is the most expensive phase by a wide margin. Realistic ranges for utility drawings: $75 to $150 per sheet for simple single utility plans in good condition, $200 to $500 per sheet for complex multi-utility plans with dense annotation, and $400 to $800 per sheet for degraded or ambiguous source material that requires significant interpretation.",
      },
      {
        type: "p",
        text: "On a 2,000 sheet archive, full vectorization at the middle of the range is $400,000 to $600,000. That is a real number. Most organizations that get sticker shock are comparing it to the scanning quote they received, not to the total cost of the project they actually need.",
      },
      {
        type: "p",
        text: "A useful reframe: you probably do not need to vectorize the whole archive. Vectorize the systems that drive your highest volume decisions, prioritize by age and risk, and leave the rest as georeferenced rasters with a good index. The index gets you 70 percent of the operational value at 20 percent of the cost. You can always vectorize more later. You cannot easily recover money spent vectorizing things you did not need.",
      },
      {
        type: "p",
        text: "If vectorization is in scope, ask vendors to break down their per-sheet rate by feature density. A simple residential water main plan at 1:1200 scale with 8 to 15 pipe segments per sheet is a very different job than a complex transmission main plan with detailed profile views, multiple utility conflicts shown, and 40 to 60 annotated features per sheet. A flat per-sheet rate for both is a sign that the vendor has not looked at your drawings carefully.",
      },
      { type: "h2", text: "The hidden costs: QA, project management, and revisions" },
      {
        type: "p",
        text: "Every quote should include explicit line items for QA, project management, and revisions. If it does not, ask where those costs live and whether they are included.",
      },
      {
        type: "p",
        text: "QA on digitization work typically runs 15 to 25 percent of the production cost. If a vendor is quoting a very low per-sheet rate and no explicit QA cost, either QA is not happening or it is being absorbed into a margin that will disappear when something goes wrong.",
      },
      {
        type: "p",
        text: "Revision cycles happen on every project. You will review a batch of vectorized features, find that the vendor interpreted a particular symbol type incorrectly, and send back corrections. On a well-run project, two rounds of revisions per phase is normal. On a poorly scoped project, revisions continue indefinitely because the acceptance criteria were never defined. Write acceptance criteria before the work starts.",
      },
      { type: "h2", text: "Total project benchmarks" },
      {
        type: "ul",
        items: [
          "1,000 sheet archive, scan plus rough georeferencing plus basic index: $15,000 to $35,000",
          "1,000 sheet archive, scan plus control point geo plus full OCR index: $40,000 to $80,000",
          "1,000 sheet archive, full pipeline including vectorization of primary utility: $150,000 to $350,000",
          "5,000 sheet archive, scan plus control point geo plus full OCR index: $150,000 to $320,000",
          "5,000 sheet archive, full vectorization: $600,000 to $1,500,000",
        ],
      },
      {
        type: "p",
        text: "These are all-in numbers including QA and project management. They assume a well-scoped project with a defined pilot phase. Projects without a pilot and with vague acceptance criteria tend to run 30 to 50 percent over these estimates.",
      },
      { type: "h2", text: "How to get a better quote" },
      {
        type: "p",
        text: "The quality of the quote you receive is directly proportional to the quality of the brief you send. Vendors who cannot see the archive will pad estimates to cover their uncertainty. A good brief includes:",
      },
      {
        type: "ul",
        items: [
          "A verified sheet count, not an estimate. Walk the room and count.",
          "A condition sample: 10 to 20 representative sheets covering the range of quality and age in your archive.",
          "A list of the questions you want to answer from the digitized data.",
          "A draft output specification: what fields, what accuracy, what file format.",
          "An explicit pilot requirement: you want a sample of 20 to 30 sheets processed end to end before committing to the full scope.",
        ],
      },
      {
        type: "p",
        text: "The pilot is the most important item on that list. It converts vendor promises into measurable evidence. Run the pilot before you sign the full contract. The vendor who does excellent pilot work and the vendor who does mediocre pilot work are obvious once you compare output. Do not skip this step to save time. It will cost you far more time later.",
      },
      {
        type: "p",
        text: "The projects I have seen go badly over budget almost always have the same root cause: they scoped based on what sounded good in a proposal rather than on a real understanding of the archive and a clear definition of the output. If you want a better estimate, start by building a better brief.",
      },
    ],
  },
  {
    slug: "pdf-as-builts-to-gis-approaches",
    title: "Converting PDF as-builts to GIS: 5 approaches compared",
    description:
      "Not all PDF to GIS paths are equal. Here is a grounded comparison of five approaches, with honest tradeoffs for each.",
    date: "2026-04-08",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["GIS", "PDF", "as-built", "digitization"],
    blocks: [
      {
        type: "p",
        text: "PDF as-builts are the dominant format for utility records produced between roughly 1995 and today. They are better than paper but worse than actual GIS data, and the gap between the two is where a lot of organizations get stuck. The PDF exists. The shapefile does not. Converting one to the other is not a single process. It is a family of processes, and picking the wrong one is a reliable way to waste money.",
      },
      {
        type: "p",
        text: "Here are the five approaches I see used in practice, with honest assessments of when each makes sense, what the output actually looks like, and what tends to go wrong.",
      },
      { type: "h2", text: "Start by auditing what you have" },
      {
        type: "p",
        text: "Before picking an approach, you need to know what kind of PDFs you are dealing with. Not all PDFs are equal. Open a sample of 20 to 30 files in Adobe Acrobat and try to select text and lines. If you can click on a pipe centerline and it highlights as a selectable object, the file has vector geometry inside it. If clicking produces nothing, it is a raster. That single distinction changes which approaches are available to you.",
      },
      {
        type: "p",
        text: "In a typical utility archive of PDFs produced over the last 30 years, you will find a mix: scan-to-PDF files that are pure raster, plot-to-PDF files from CAD that preserve vector geometry, and hybrid files that have vector geometry in the body but a rasterized background. The proportion varies by organization and by era. Running this audit on a stratified sample before you scope a project tells you what combination of approaches you will need.",
      },
      { type: "h2", text: "1. Manual heads-up digitizing" },
      {
        type: "p",
        text: "A GIS technician loads the georeferenced PDF as a backdrop in ArcGIS or QGIS and traces the features by hand. Each pipe segment, valve, manhole, and fitting gets traced and attributed one by one.",
      },
      {
        type: "p",
        text: "When it works: small to medium archives where you need high accuracy and the source material is complex enough that automation will fail. Branching networks with many attribute changes, plans where pipes shift utility type between sheets and need connectivity handled manually, or drawings with custom symbology that no automated tool recognizes.",
      },
      {
        type: "p",
        text: "When it fails: any scale above a few hundred sheets. Manual digitizing at scale is slow, expensive, and error rates compound as the work becomes repetitive. Expect roughly 4 to 8 feature-rich sheets per technician per day. At 2,000 sheets, that is a year of work for one person at full allocation.",
      },
      {
        type: "p",
        text: "What the output looks like: the cleanest of any method, when done by skilled technicians with good source material. Network connectivity is correct. Attribute assignment is accurate. The failure mode is fatigue and inconsistency across a large team, not model error.",
      },
      { type: "h2", text: "2. PDF vector extraction" },
      {
        type: "p",
        text: "Some PDF as-builts are true vector PDFs, meaning lines are stored as geometric objects rather than pixels. Tools like GDAL, pdf2cad, Inkscape, and Bluebeam can extract those geometries and output them as DXF, shapefile, or GeoJSON.",
      },
      {
        type: "p",
        text: "When it works: when the source PDF was produced directly from CAD or GIS software and the vectors are intact. In the best case this can pull complete geometry from a sheet in under a minute. For archives that are predominantly modern CAD-to-PDF with consistent layer naming, this approach can process thousands of sheets quickly with a post-processing step for attribute assignment.",
      },
      {
        type: "p",
        text: "When it fails: extraction gives you geometry without meaningful attributes. Every line comes out the same unless it is on a distinct layer, and layer naming from CAD exports is often inconsistent across projects and years. You will spend significant time in post-processing classifying feature types and assigning attributes. Also, a large fraction of as-built PDFs are scan-to-PDF or plot-to-PDF files that rasterize the linework. Vector extraction returns nothing useful on those.",
      },
      {
        type: "p",
        text: "A useful diagnostic: open the PDF in a text editor and search for stream objects. PDFs with substantial vector content have many short stream entries. PDFs that are scans have a few very large stream entries. This tells you quickly whether vector extraction is worth attempting.",
      },
      { type: "h2", text: "3. Automated raster line following" },
      {
        type: "p",
        text: "Tools in this category analyze the raster image, detect linear features using edge detection and thinning algorithms, and output polylines. They have been around in various forms since the 1990s.",
      },
      {
        type: "p",
        text: "When it works: clean black and white single-utility plans with clear line weights, no annotation overlap, and consistent symbology. Some water main atlas pages from the 1980s are genuinely well suited to this. The drawings were produced with uniform drafting standards on high quality media and they scan cleanly. Throughput can be high on these, and human review can keep quality acceptable.",
      },
      {
        type: "p",
        text: "When it fails: anything with dense annotation, multiple overlapping utility types, varied line styles, or unusual symbology. The tools detect edges, not features. They trace everything including contours, hatching, dimension lines, annotation leaders, and scratches on the original drawing. Filtering down to utility centerlines after the fact often takes as long as manual digitizing would have. In practice, results on real mixed utility drawings are frequently disappointing despite looking adequate on screenshots.",
      },
      { type: "h2", text: "4. AI-assisted feature extraction" },
      {
        type: "p",
        text: "More recent tools use computer vision models trained on engineering drawings to detect utility features, classify them by type, and output structured GIS data. Unlike rule-based line followers, these models learn to distinguish pipe centerlines from annotation leaders because they have seen thousands of examples of each.",
      },
      {
        type: "p",
        text: "When it works: archives with moderate to high drawing quality where the model has been trained on similar drawing styles. On well-represented types like municipal water plans drawn in common CAD templates, detection rates are high enough to produce usable GIS data with human review only on flagged low-confidence features, rather than a full redraw.",
      },
      {
        type: "p",
        text: "When it fails: unusual drawing conventions, heavily degraded source material, or utility types underrepresented in training data. The model's confidence scores are the key signal. Low confidence features need human review. High confidence features on unfamiliar drawing styles still need spot checking. The failure mode is not random: it is systematic underperformance on specific drawing types, and you need to identify those types before committing the archive to automated extraction.",
      },
      {
        type: "p",
        text: "How to evaluate an AI extraction tool: ask the vendor to process 20 to 30 sheets from your actual archive, stratified across drawing ages and types. Ask for output with feature-level confidence scores and provenance pointers back to source pixels. Then check a sample of the high-confidence output by hand. If high-confidence features are wrong more than 5 to 10 percent of the time, the model is not calibrated for your data.",
      },
      { type: "h2", text: "5. Hybrid pipeline" },
      {
        type: "p",
        text: "Most production-grade projects use some combination of the approaches above, routing each sheet or each feature type to the method best suited to it. The practical playbook: use PDF vector extraction as an opportunistic first pass on any files that turn out to be true vectors. Use AI-assisted extraction as the primary engine for raster drawings. Route low-confidence features and complex areas to manual review. Reserve pure manual digitizing for drawing types where no automated approach performs adequately.",
      },
      {
        type: "p",
        text: "The ratio of automated to manual work shifts dramatically based on archive composition. On a well-formatted modern archive with consistent CAD-to-PDF output, 80 to 90 percent of features might flow through automated extraction at acceptable quality. On a diverse historical archive with mixed scan and vector content, inconsistent drawing standards, and significant handwritten annotation, that number might be 40 to 50 percent. The hybrid approach is not a compromise. It is the only approach that handles real archive diversity at scale.",
      },
      { type: "h2", text: "Output format decisions" },
      {
        type: "p",
        text: "Before you start any conversion work, define the output format you want. Shapefile is widely compatible but has attribute name length limits and no native support for multiple geometry types in one file. GeoJSON is portable and human-readable but gets large at scale. File GDB is the most capable but requires Esri software to read fully. GeoPackage is the best open format for most utility GIS work: single file, no attribute length limits, supports multiple layers, reads in QGIS and ArcGIS both.",
      },
      {
        type: "p",
        text: "Define your coordinate reference system before work starts and enforce it throughout. Mixing WGS84 and NAD83 in the same project without documenting which files are in which CRS will create offsets that are subtle enough to be hard to detect and expensive to fix.",
      },
      { type: "h2", text: "The decision framework" },
      {
        type: "ul",
        items: [
          "Under 200 sheets and you need high accuracy: manual heads-up digitizing is often still the right answer.",
          "Predominantly modern CAD-to-PDF with consistent layers: try vector extraction first on a sample and evaluate how much post-processing the attribute assignment requires.",
          "200 to 2,000 sheets with consistent drawing styles: AI extraction with human review is the typical sweet spot.",
          "Over 2,000 sheets or diverse archive types: plan for a hybrid pipeline from the start. No single approach handles that scale cleanly.",
          "Any archive that mixes raster scans and vector PDFs: you need a routing step that detects file type before extraction begins.",
          "Tight budget and moderate quality requirements: prioritize georeferenced raster with searchable index. The index gets you 70 percent of the value at 20 percent of the vectorization cost.",
        ],
      },
      {
        type: "p",
        text: "The worst outcome is picking an approach based on what impressed you in a vendor demo and discovering three months in that it does not generalize to your actual drawings. Require any vendor you evaluate to process a stratified sample from your real archive, not a sample they provide. If they will not, that tells you what you need to know.",
      },
    ],
  },
  {
    slug: "georeferencing-scanned-utility-plans",
    title: "Georeferencing scanned utility plans: a practical walkthrough",
    description:
      "How to place scanned utility drawings accurately on a map, which tools to use, and how to avoid the common errors that corrupt your whole dataset.",
    date: "2026-04-09",
    author: "Beckett Devoe",
    readingTime: "10 min read",
    tags: ["georeferencing", "GIS", "utilities", "how-to"],
    blocks: [
      {
        type: "p",
        text: "Georeferencing is the process of assigning real-world coordinates to a scanned image so it shows up in the right place on a map. It sounds simple and in concept it is. In practice, doing it well on a legacy utility archive requires understanding the source material, picking the right transformation, and building a QA process that catches errors before they propagate.",
      },
      {
        type: "p",
        text: "This walkthrough focuses on utility plans specifically. Those have characteristics that differ from topographic maps or aerial photos, and most generic georeferencing tutorials skip the parts that matter most for this use case.",
      },
      { type: "h2", text: "What you are actually trying to do" },
      {
        type: "p",
        text: "When you georeference a utility plan, you are telling your GIS software: the corner of this drawing corresponds to this longitude and latitude. You do that for enough points, and the software fits the image to the world. The question is how many points, how you find them, and what math the software uses to warp the image in between.",
      },
      {
        type: "p",
        text: "The accuracy you need depends on what you plan to do with the result. For search and retrieval, rough placement to within 50 meters is fine. For planning and design, you want to be within 5 meters. For staking in the field, you may want sub-meter, which on a legacy drawing requires careful control and a realistic understanding of how accurate the original drawing was.",
      },
      { type: "h2", text: "Finding control points" },
      {
        type: "p",
        text: "Control points are identifiable features that appear on both the scanned drawing and a modern reference source like aerial imagery, a street centerline dataset, or a current survey. The quality of your georeferencing is almost entirely determined by the quality of your control points.",
      },
      {
        type: "p",
        text: "Good control points for utility plans:",
      },
      {
        type: "ul",
        items: [
          "Street intersections. They are in every drawing and are usually in authoritative modern datasets. They do move over time due to road widening or realignment, so check against imagery from around the drawing date if possible.",
          "Building corners for structures that have not changed. Universities and municipal campuses often have buildings that are 50 to 100 years old and have not moved.",
          "Survey monuments if shown on the drawing. These are the most reliable anchor points when they appear.",
          "Manhole rims, fire hydrants, and valve boxes that have been field located in a modern GPS survey. These require that someone has already done field work, but they are extremely accurate.",
        ],
      },
      {
        type: "p",
        text: "Bad control points: features that may have changed, like driveways, fence lines, or curb cuts. Features that are ambiguous on the drawing, like a corner of a parking lot that could be two different corners. Features that were approximate on the original drawing to begin with.",
      },
      { type: "h2", text: "Transformation types and when to use them" },
      {
        type: "p",
        text: "Once you have control points, your GIS software transforms the image to fit them. There are several transformation types, and picking the wrong one is a common source of error.",
      },
      {
        type: "ul",
        items: [
          "Similarity (Helmert): scales, rotates, and translates the image but does not warp it. Use this for drawings made from good surveys at consistent scale. 2 control points minimum.",
          "Affine: scales independently in X and Y, rotates, and translates. Handles slight differences in scale between axes, which occurs in drawings that were produced at different times or photocopied with slight distortion. 3 control points minimum.",
          "Polynomial (2nd or 3rd order): warps the image to fit the control points, introducing local deformation. Use when the drawing is distorted, which happens with old mylars, blueprints that shrank unevenly, or drawings that were assembled from multiple sources at different scales. Requires at least 6 or 10 control points respectively.",
          "Spline: exact fit through all control points. Useful when you have many high quality control points and want tight local accuracy. Can produce wild artifacts between control points on low quality source material.",
        ],
      },
      {
        type: "p",
        text: "The most common mistake is using a high order polynomial on a drawing with only 4 or 5 control points. The transform will fit the points exactly and produce nonsense everywhere else. Match the transform complexity to the point density.",
      },
      { type: "h2", text: "Assessing residuals" },
      {
        type: "p",
        text: "Every GIS georeferencing tool reports residuals, which are the distances between where your control points ended up after transformation and where you told them they should be. These are your primary quality indicator.",
      },
      {
        type: "p",
        text: "A residual of 1 to 3 meters on a drawing at 1:1000 scale is typically acceptable for planning work. If your residuals are 10 to 20 meters, something is wrong. Either your control points are off, your reference data has an error, or the drawing is heavily distorted and needs a higher order transform or more points. Do not accept high residuals and move on. Investigate the worst offenders before you build anything on top of the result.",
      },
      { type: "h2", text: "Dealing with drawing distortion" },
      {
        type: "p",
        text: "Legacy utility drawings distort for several reasons. Blueprint paper shrinks as it ages, and it does not shrink uniformly. Mylar stretches. Drawings that were photocopied or reprinted through a plotter introduce barrel distortion at the edges. Composite drawings were sometimes assembled by hand from separate survey sections that did not perfectly align.",
      },
      {
        type: "p",
        text: "When you see residuals that are low in the center of a drawing and high at the edges, suspect radial distortion from photocopying. When residuals are low in one quadrant and high in another, suspect a composite drawing with a seam. Understanding the source of distortion tells you whether more control points will fix it or whether the source material simply cannot be georeferenced to better than a certain accuracy.",
      },
      { type: "h2", text: "Batch georeferencing at scale" },
      {
        type: "p",
        text: "For archives of hundreds or thousands of sheets, manual control point placement sheet by sheet is not practical. There are two ways to scale this up.",
      },
      {
        type: "p",
        text: "The first is index-driven placement. If your drawing set has a coherent index or key map, you can extract the bounding box for each sheet from the index and use those four corners as initial control points. This gives you affine-quality georeferencing for the whole archive quickly, and you can refine individual sheets from there.",
      },
      {
        type: "p",
        text: "The second is automated control point detection. If your drawings are consistent enough in style, you can train a detector to find specific feature types like intersections and building corners in both the drawing and a modern reference image, then match them automatically. This works well on consistent CAD-produced drawing sets and poorly on diverse historical archives.",
      },
      {
        type: "p",
        text: "In practice, bulk archives usually go through a tiered process: automated rough placement on all sheets, automated control point refinement on sheets that meet quality thresholds, and manual review on the remainder. Tracking per-sheet accuracy metrics lets you prioritize where human time goes.",
      },
      { type: "h2", text: "Common errors that propagate" },
      {
        type: "ul",
        items: [
          "Using the wrong coordinate system. If your reference data is in NAD83 and you georeference against it but store the image in WGS84, every sheet will be off by a consistent offset. Check CRS before you start and enforce it throughout.",
          "Control points on features that moved. A street widening moves the centerline. If your control point was on the old centerline and your reference is the new one, every sheet with that intersection is systematically off.",
          "Not checking across sheet boundaries. Individual sheets can look great and still have gaps or overlaps where they meet. Spot check along boundaries on neighboring sheets.",
          "Skipping QA on the outliers. The sheets with the highest residuals are the most important ones to review. It is tempting to average them into the dataset and move on. Do not.",
        ],
      },
      {
        type: "p",
        text: "Georeferencing is foundational. Every layer you build on top of it inherits its errors. Spending extra time here, especially on QA and on understanding your worst residuals, pays more than almost anything else you can do in a digitization project.",
      },
    ],
  },
  {
    slug: "cad-to-gis-when-to-automate",
    title: "CAD to GIS conversion: when to automate and when to redraw",
    description:
      "A decision framework for one of the most common and most mishandled questions in utility data management.",
    date: "2026-04-10",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["CAD", "GIS", "conversion", "utilities"],
    blocks: [
      {
        type: "p",
        text: "CAD and GIS are not the same thing. This is obvious when you say it, but the practical implication is that converting from one to the other is never as simple as changing a file extension. The questions you face every time are: what gets converted automatically, what needs human intervention, and what needs to be completely rebuilt?",
      },
      {
        type: "p",
        text: "There is no universal answer, but there is a decision framework that holds up across most utility CAD archives. Here it is.",
      },
      { type: "h2", text: "What CAD has that GIS needs" },
      {
        type: "p",
        text: "CAD files store geometry: lines, arcs, circles, polylines, blocks. GIS datasets store features: objects with geometry, attributes, and topology. Converting from CAD to GIS means bridging that gap. The geometry often translates mechanically. Everything else requires decisions.",
      },
      {
        type: "p",
        text: "The three things GIS needs that CAD rarely provides cleanly: feature classification, attribute schema, and topological correctness. A CAD file might have a line on a layer called 'W-8in-PVC-2005.' That is useful metadata. It is also not a GIS attribute schema. You need to decide how to parse it, what fields to create, and what to do with the inconsistent naming that will exist in any real CAD archive.",
      },
      { type: "h2", text: "When automated conversion works well" },
      {
        type: "p",
        text: "Automated conversion through tools like FME, ogr2ogr, or ArcGIS's CAD to GIS tools produces reliable results when three conditions are met:",
      },
      {
        type: "ol",
        items: [
          "The CAD files were produced with consistent layer naming conventions that map cleanly to GIS feature types.",
          "The geometry is topologically reasonable. Lines connect where they should, closed polygons are actually closed, and there are no duplicate or crossing features that would create invalid GIS geometry.",
          "The drawings use blocks for point features like valves, hydrants, and manholes, and those blocks are consistently named.",
        ],
      },
      {
        type: "p",
        text: "If your CAD archive meets all three, automated conversion with an FME workspace or equivalent can process thousands of drawings and produce serviceable GIS data in a fraction of the time that manual conversion would take. The output still needs QA, but the bulk of the geometry comes through clean.",
      },
      { type: "h2", text: "When it does not work" },
      {
        type: "p",
        text: "Most real utility CAD archives do not meet all three conditions. They usually fail on at least one of the following:",
      },
      {
        type: "ul",
        items: [
          "Layer naming is inconsistent across projects, contractors, and years. The same feature type might be on five different layer names depending on who drew it and when.",
          "Geometry that represents network features as collections of individual segments rather than as connected polylines. The water main stops and restarts at every valve, manhole, or fitting. That is meaningful in a drawing and meaningless in a GIS network.",
          "Blocks that were exploded to lines before the file was saved, meaning point features exist only as clusters of short line segments with no block reference to classify them.",
          "Elevation data embedded as Z coordinates that are actually sheet elevation labels rather than real topographic values.",
        ],
      },
      {
        type: "p",
        text: "When these conditions exist, automated conversion produces geometry dumps that require as much manual cleanup as starting fresh. The geometry exists, but classifying it, connecting it into a network, and assigning attributes is all manual work.",
      },
      { type: "h2", text: "The decision points" },
      {
        type: "p",
        text: "Before you commit to a conversion approach, evaluate your CAD archive on these four questions:",
      },
      {
        type: "ol",
        items: [
          "How consistent is layer naming? Pull 20 files at random and document the layer names you find. If you see more than 3 to 4 variations per feature type, you have a normalization problem that needs a solution before automated conversion will work.",
          "What percentage of the geometry needs topological cleanup? Run a topology check on a sample. If more than 15 to 20 percent of features have errors, plan for a significant cleanup phase after conversion.",
          "Are point features stored as blocks? Check a sample. If most valves and hydrants are exploded, you are looking at manual attribution work regardless of what your conversion tool does.",
          "What is the source of truth for attributes? If the attributes you need are in the drawing as text annotation rather than as block attributes, extraction is a text parsing problem, not a geometry problem.",
        ],
      },
      { type: "h2", text: "The hybrid approach" },
      {
        type: "p",
        text: "For most real archives, the practical answer is a hybrid. Use automated conversion for the geometry to avoid redrawing anything. Write transformation rules to handle the layer name variations you documented. Plan a targeted manual phase for topological cleanup, block classification, and attribute assignment.",
      },
      {
        type: "p",
        text: "The ratio of automated to manual work shifts based on archive quality. On a well-managed archive from a single organization with enforced CAD standards, automated conversion might get you to 90 percent. On a multi-decade archive built by many different contractors with no consistent standards, you might be at 50 percent before the manual work starts.",
      },
      { type: "h2", text: "When to just redraw" },
      {
        type: "p",
        text: "Redrawing makes sense when the CAD geometry is wrong, not just messy. If the original survey that the CAD was based on has been superseded by newer higher accuracy survey, the converted geometry will be accurately wrong. If the CAD was produced as a design drawing and never updated to reflect as-built conditions, you are converting design intent, not reality.",
      },
      {
        type: "p",
        text: "In those cases, converting the CAD faithfully produces GIS data that will lead locators to the wrong location. It is better to identify those areas explicitly and either leave them blank pending field verification or flag them as unverified than to populate the GIS with confident but wrong geometry.",
      },
      {
        type: "p",
        text: "The cardinal rule: GIS data that is known to be wrong is worse than no data. It displaces the 'we don't know' signal that would otherwise prompt verification.",
      },
    ],
  },
  {
    slug: "raster-to-vector-utility-maps",
    title: "Raster to vector for utility maps: tools and tradeoffs",
    description:
      "A clear-eyed look at the raster-to-vector pipeline for utility drawings, covering the tools that work, the ones that disappoint, and how to set expectations before you start.",
    date: "2026-04-11",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["raster", "vector", "GIS", "digitization"],
    blocks: [
      {
        type: "p",
        text: "Raster-to-vector conversion is the process of taking a scanned image and extracting geometric features from it. Lines become polylines. Symbols become points. Text becomes attribute data. It is the step that turns a TIFF into a shapefile, and it is harder than it looks.",
      },
      {
        type: "p",
        text: "I want to give an honest account of what the tools available in 2026 actually do on utility drawings, because the marketing around automated vectorization has been optimistic for about 30 years now.",
      },
      { type: "h2", text: "Why utility drawings are harder than they look" },
      {
        type: "p",
        text: "A utility plan is not a clean line drawing. It is a densely annotated document where pipes, annotation leaders, dimension lines, hatching, text, and symbols all overlap. The lines you want to vectorize, the pipe centerlines, are the same width and color as many of the lines you do not want to vectorize, the title block borders, the north arrow, the scale bar.",
      },
      {
        type: "p",
        text: "On top of that, most legacy utility drawings were produced over multiple revisions by multiple people with different drafting habits. Pipe symbols are not always consistent. Valve callout formats differ. A 4 inch main is labeled '4\"' on one sheet and '4 IN' on the next. Any vectorization tool has to handle that variability, and the ones that do it well are doing something much more sophisticated than line detection.",
      },
      { type: "h2", text: "Traditional raster vectorization tools" },
      {
        type: "p",
        text: "Tools like R2V, Able Software, and various QGIS plugins have been around for decades. They work by detecting edges, thinning lines to centerlines, and connecting segments into polylines. They produce output that looks correct on a screenshot and falls apart on inspection.",
      },
      {
        type: "p",
        text: "The core problem is that they detect lines, not features. They will happily vectorize every dimension line, every hatch pattern, every annotation leader, and every scratch on the original drawing. The output is a spaghetti of lines with no classification. Filtering it down to utility centerlines requires either manual review of every segment or a classifier that you have to build yourself.",
      },
      {
        type: "p",
        text: "These tools are useful in a narrow case: clean, simple, single-layer drawings with consistent line weights and no annotation overlap. Some 1970s water atlas pages drawn on good mylar are well suited to them. Most real utility archives are not.",
      },
      { type: "h2", text: "Modern computer vision approaches" },
      {
        type: "p",
        text: "The meaningful advance in the last five years is training detection and segmentation models on labeled engineering drawings rather than relying on generic edge detection. When you train a model on examples of what a pipe segment looks like versus what a dimension line looks like, it learns to discriminate between them in a way that a rule-based line detector cannot.",
      },
      {
        type: "p",
        text: "In practice this produces dramatically better output on drawing types that are well represented in training data. Residential water main plans in a common CAD template, sewer atlas pages for a common regional format, electric distribution plans with standard ANSI symbols. On these, a well-trained model can extract utility centerlines with high recall and reasonable precision, outputting classified polylines with confidence scores.",
      },
      {
        type: "p",
        text: "The limitation is generalization. A model trained on one drawing style underperforms on another. If your archive was produced in-house with a custom drawing standard, a commercial AI vectorization tool may not have enough training data for your format to perform reliably. Testing on a representative sample before committing is not optional.",
      },
      { type: "h2", text: "Hybrid human-in-the-loop workflows" },
      {
        type: "p",
        text: "The production workflows that hold up at scale are neither fully automated nor fully manual. They look like this: the automated tool extracts what it is confident about, routes low confidence regions or features to a human reviewer, and the human makes decisions at the boundary rather than drawing from scratch.",
      },
      {
        type: "p",
        text: "The key metric is what fraction of the drawing area can be handled with high confidence. On good source material with a well-matched model, that number might be 70 to 80 percent. On difficult material, it might be 30 to 40 percent. Either number is better than fully manual, because even the 30 to 40 percent you get for free reduces the human workload proportionally.",
      },
      { type: "h2", text: "OCR as part of the pipeline" },
      {
        type: "p",
        text: "Vectorizing the geometry without extracting the text is half a pipeline. The pipe size, material, install year, and project number are in the drawing as text, and text near a detected feature is how you assign attributes to it. Building OCR into the vectorization pipeline, detecting text regions, recognizing them, and associating them with nearby geometric features based on proximity and layout rules, is what makes the output data rather than just geometry.",
      },
      {
        type: "p",
        text: "This association step is where a lot of automated tools fall short. They extract geometry and they extract text but they do not reliably connect the two. The text callout for a valve is 8 millimeters away from the valve symbol on the drawing, and on a dense plan there are other symbols within that radius. Getting the association right requires understanding drawing conventions, not just image processing.",
      },
      { type: "h2", text: "Setting expectations" },
      {
        type: "p",
        text: "Here is the honest version of what automated vectorization delivers in 2026: on favorable source material with appropriate tools, you can expect 60 to 80 percent of features to be extracted at usable quality, with human review needed on the remainder. On unfavorable source material, that number drops to 30 to 50 percent. Fully automated zero-human vectorization on complex utility drawings does not exist as a reliable production tool yet, despite what some demo videos suggest.",
      },
      {
        type: "p",
        text: "That said, even 50 percent automation is substantial. If it takes 4 hours to manually digitize a sheet, and automation gets you a draft that takes 2 hours to review and clean up, you have halved your cost. The question is whether the tool you are evaluating delivers that ratio on your specific archive, not on the demo dataset.",
      },
    ],
  },
  {
    slug: "building-searchable-as-built-archive",
    title: "We can't find our as-builts: building a searchable archive",
    description:
      "Most utility organizations have the drawings. They just can't locate them. Here is how to fix that without a multi-year GIS project.",
    date: "2026-04-14",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["as-built", "archive", "search", "records management"],
    blocks: [
      {
        type: "p",
        text: "The call comes in: there is a contractor about to excavate near a known utility corridor, and someone needs to know if there is a four-inch gas main running under the parking lot. You know the drawing exists somewhere. You just do not know which drawer, which binder, which project folder. Twenty minutes later, someone is standing in front of a flat file cabinet flipping through plastic sleeves.",
      },
      {
        type: "p",
        text: "This is the most common situation I encounter, and it is almost never a GIS problem. It is an archive access problem. The fix is not a full digitization and vectorization project. The fix is a searchable index. Here is how to build one, what tools work, and what to do after the index exists so it does not immediately fall apart.",
      },
      { type: "h2", text: "Understand what you actually have" },
      {
        type: "p",
        text: "Before you can find a drawing, you need to know that it exists. This sounds obvious, but most organizations do not have a reliable count of what is in their archive. Start by building a manifest. Walk the room, open every drawer, and write down what you find. Not at the sheet level yet. At the project or set level. What series are there? What years? What utilities?",
      },
      {
        type: "p",
        text: "This takes a day or two and it is the highest value thing you can do before spending anything on technology. You will find duplicate sets, gaps you did not know existed, records that belong to a different department, and at least one index sheet that will unlock the whole filing system.",
      },
      {
        type: "p",
        text: "While you are walking the room, photograph every index sheet, key map, and legend you find. These are the documents that describe the filing system itself. If you lose them, reconstructing the filing logic takes weeks. If you have them, you can answer 'which drawer has the sheets for this quadrant' in under a minute.",
      },
      { type: "h2", text: "The minimum viable index" },
      {
        type: "p",
        text: "You need to capture enough metadata per sheet to answer the questions that actually come up. Based on the retrieval requests we see across organizations, those questions almost always reduce to four:",
      },
      {
        type: "ul",
        items: [
          "What sheets cover this location?",
          "What is the latest version of the drawing for this project?",
          "Where are all the drawings related to this utility type in this area?",
          "What drawings show work done in this year range?",
        ],
      },
      {
        type: "p",
        text: "Those four questions require seven fields: sheet number, title or project name, utility type or system, area or geographic coverage, date, revision, and physical location in the archive. That is it. A spreadsheet with those seven fields and one row per sheet is a searchable archive. Not a beautiful one, but a functional one that any staff member can query in under 30 seconds.",
      },
      {
        type: "p",
        text: "Two fields deserve more attention than the others. Area coverage is usually expressed as a street bounding box or a grid cell reference. Either works. What does not work is free text like 'north side' or 'near the reservoir.' Make it specific enough that two different people would write the same thing for the same sheet. Revision is the other tricky field. Many archives have multiple versions of the same drawing with no clear indication of which is current. Establish a rule for this up front: date supersedes revision letter, or explicit 'Superseded by:' notation, or something else. Whatever the rule is, apply it consistently.",
      },
      { type: "h2", text: "What tool to use for the index" },
      {
        type: "p",
        text: "Start with a spreadsheet. Google Sheets or Excel. Not because it is the best tool, but because everyone can use it immediately with no training and no procurement. A spreadsheet index that everyone actually uses is better than a document management system that nobody has time to learn.",
      },
      {
        type: "p",
        text: "When you outgrow the spreadsheet, the right next step depends on what you already have. If your organization uses SharePoint, a SharePoint document library with custom metadata columns is a reasonable step up. It adds versioning, permissions, and a usable search interface without requiring new software. If you are a utility on an enterprise asset management platform like Maximo, Hansen, or Cityworks, most of them have document attachment functionality that can serve as the index with a bit of configuration.",
      },
      {
        type: "p",
        text: "Purpose-built document management systems for engineering drawings, OpenText, Meridian, ProjectWise, are worth considering for large archives or organizations with active construction programs generating many new as-builts per year. They add value through version control, workflow routing for approvals, and integration with CAD and GIS platforms. They also add implementation cost and training burden. Do not buy one until your spreadsheet is genuinely failing you.",
      },
      { type: "h2", text: "Scanning for access versus scanning for accuracy" },
      {
        type: "p",
        text: "If your goal is to make drawings accessible, scan at 200 to 300 DPI to a PDF and attach the scan to the index record. This lets anyone pull up the drawing on a screen without going to the archive room. It also protects against loss. At this resolution and workflow, a good reprographics shop can get through 200 to 400 sheets a day.",
      },
      {
        type: "p",
        text: "Do not let scan quality become a blocker. A 200 DPI PDF that someone can read on their laptop in 30 seconds is infinitely more useful than an unscanned drawing in a drawer. Scan for access first, then upgrade the scans for the high-use, high-value drawings later. The upgrade can happen incrementally over years. The access copy needs to exist now.",
      },
      {
        type: "p",
        text: "Name the scanned files with the same scheme as your index: a unique ID that matches the sheet number field in the spreadsheet. This makes linking the scan to the index record trivial. If you use a random filename from the scanner, you will spend hours later rebuilding the link between the file and the record.",
      },
      { type: "h2", text: "Geographic search without a GIS project" },
      {
        type: "p",
        text: "The most requested feature is always 'show me which drawings cover this area.' You do not need a full GIS implementation for this. A light georeferencing workflow, placing the rough bounding box of each drawing on a web map, gives you click-to-find coverage with a day or two of work per thousand sheets.",
      },
      {
        type: "p",
        text: "The simplest implementation: store the four corners of each drawing as lat/lon pairs in the index database. Build a simple map interface that shows those bounding boxes as polygons. Click a polygon, see the drawing. This is a few days of web development, or a configured deployment of an off-the-shelf document georeferencing tool. It is not a GIS migration project.",
      },
      {
        type: "p",
        text: "Getting the four corners into the index does not require GPS field work. For any drawing that has a north arrow and a scale bar, you can estimate the corners from aerial imagery using recognizable features on the drawing. Street intersections are the easiest: find one on the drawing, find the same one in Google Maps, note the coordinates. Two intersection coordinates plus scale and orientation give you all four corners with enough accuracy for search purposes.",
      },
      { type: "h2", text: "OCR for full text search" },
      {
        type: "p",
        text: "Once you have scanned PDFs, running OCR on them costs almost nothing and adds substantial value. The drawing text, project numbers, street names, valve tags, contractor names, is now searchable. A locator who remembers that the main was installed as part of a specific project can search for that project number and find the drawing in seconds.",
      },
      {
        type: "p",
        text: "For utility drawings, OCR quality on the title block matters most. The body of the drawing has a lot of text that is ambiguous out of context. The title block has structured fields in consistent locations, and extracting those reliably is achievable with targeted OCR even on drawings with variable print quality.",
      },
      {
        type: "p",
        text: "Tesseract, the open source OCR engine, handles printed title block text on clean scans well and costs nothing. For a few hundred sheets, running it as a batch process and reviewing the results manually is entirely practical. For thousands of sheets, you will want either a commercial OCR service or a pipeline with automated confidence filtering and human review on low-confidence extractions.",
      },
      { type: "h2", text: "Handling digital-native as-builts" },
      {
        type: "p",
        text: "Once you build a searchable archive for your paper and scanned records, the question becomes: what happens with new as-builts that come in as CAD or PDF files? Most organizations receive some combination of AutoCAD DWG files, Revit models, and PDF plots from contractors at project closeout.",
      },
      {
        type: "p",
        text: "The key is to define a submission standard before the next project closes. What file formats are acceptable? What layer naming convention is required for CAD files? What metadata fields must be in the title block? How should the file be named? A one-page submission standard distributed to contractors at the start of each project costs almost nothing to produce and dramatically reduces the time spent normalizing as-builts at closeout.",
      },
      { type: "h2", text: "Governance: the part everyone skips" },
      {
        type: "p",
        text: "A searchable archive stays searchable only if new drawings are added to it with consistent metadata. This requires a defined submission process for new as-builts, someone who owns the archive, and a format standard that contractors follow on submission.",
      },
      {
        type: "p",
        text: "The organizations with the worst archives are almost never the ones with the oldest drawings. They are the ones with 20 years of digital files in inconsistent formats, no naming convention, no metadata capture, and no process for deciding what the master record is. Paper archives were often better organized than this because physical space constraints forced some discipline.",
      },
      {
        type: "p",
        text: "Define the submission format before you digitize. Otherwise you are building an index that is out of date the moment the next project closes. The index is infrastructure. It needs maintenance.",
      },
      { type: "h2", text: "The 90 day plan" },
      {
        type: "ol",
        items: [
          "Week 1 to 2: walk the archive, count every sheet, photograph every index and key map, build the manifest.",
          "Week 3 to 4: define the 7-field index schema, create the spreadsheet, start populating it for the last 5 years of as-builts.",
          "Month 2: scan the last 10 years of as-builts to access-resolution PDFs. Link each scan to its index record. Finish populating the index for the full archive.",
          "Month 3: add four-corner coordinates to each index record. Set up a simple map view showing bounding boxes. Run OCR on title blocks for all scanned PDFs.",
        ],
      },
      {
        type: "p",
        text: "At the end of 90 days you have a searchable archive that a field crew or a planner can query from a laptop. You have not vectorized anything. You have not migrated to a new GIS platform. You have not spent $200,000. And you can find your drawings in under a minute instead of forty.",
      },
    ],
  },
  {
    slug: "campus-facilities-missing-drawings-cost",
    title: "What missing drawings actually cost a campus facilities team",
    description:
      "The indirect costs of an inaccessible utility archive are bigger than they look, and they fall mostly on the people who can least absorb them.",
    date: "2026-04-15",
    author: "Beckett Devoe",
    readingTime: "7 min read",
    tags: ["campus", "facilities", "cost", "utilities"],
    blocks: [
      {
        type: "p",
        text: "Nobody budgets for 'time lost searching for drawings.' It does not appear as a line item anywhere. But on a university or corporate campus with decades of infrastructure, it is one of the most consistent and most avoidable costs in a facilities operation.",
      },
      {
        type: "p",
        text: "I want to put some numbers on this, because the abstract argument for better records management does not move budgets. Real costs do.",
      },
      { type: "h2", text: "The locate ticket delay" },
      {
        type: "p",
        text: "Every excavation permit requires a utility locate. On most campuses, that locate depends on someone knowing where the drawings are and being able to pull the relevant sheets. When that process works well, it takes 30 to 60 minutes. When the drawing is missing, misfiled, or exists only in someone's memory, it can take a day or more.",
      },
      {
        type: "p",
        text: "A mid-size research university might issue 200 to 400 excavation permits a year. If 20 percent of those result in a drawing search that costs an extra half day, that is 20 to 40 days of facilities staff time per year on nothing but finding drawings. At a fully loaded rate of $80 to $100 per hour for a senior utilities coordinator, that is $13,000 to $26,000 per year in search time alone. Before you count the delay cost to the project waiting on the locate.",
      },
      { type: "h2", text: "The unexpected utility strike" },
      {
        type: "p",
        text: "Utility strikes during construction have direct costs: repair, downtime, potential injury liability, and schedule impact. Most utility strikes happen either because there was no locate or because the locate was based on information that was incomplete or wrong.",
      },
      {
        type: "p",
        text: "A conservative estimate from insurance data puts the average cost of an unintentional utility strike at $50,000 to $150,000 all in. A campus with an active construction program might see one of these every few years. One strike pays for a very good archive management system. The argument for infrastructure records is partly insurance.",
      },
      { type: "h2", text: "The design do-over" },
      {
        type: "p",
        text: "When a designer cannot find reliable utility records for a site, they either design with uncertainty and add cost to handle it, or they discover the conflict during construction and redesign in the field. Both options are expensive.",
      },
      {
        type: "p",
        text: "Design contingency for unknown utilities on a campus renovation project typically adds 5 to 15 percent to the construction budget for the affected site area. On a $2 million renovation, that is $100,000 to $300,000 in contingency that exists largely because the records are not accessible. Not all of that contingency is avoidable, but a meaningful fraction is.",
      },
      {
        type: "p",
        text: "Field-discovered conflicts that require design changes during construction cost roughly 5 to 10 times what the same change would have cost during design. If an improperly documented steam tunnel conflicts with a new building foundation and the conflict is found during excavation, the redesign, schedule extension, and carrying costs make a small coordination problem into a large claims situation.",
      },
      { type: "h2", text: "The institutional knowledge problem" },
      {
        type: "p",
        text: "On most campuses, the utility knowledge lives in the heads of 2 to 4 people. There is usually one person who has been there 30 years and knows where the 1977 steam loop drawings are because they were the one who put them there. When that person retires, the knowledge walks out with them.",
      },
      {
        type: "p",
        text: "This is not a sentimental observation. It is a risk quantification problem. The replacement cost of institutional knowledge is the cost of the worse decisions made without it, plus the cost of any physical damage from acting on incomplete information, plus the staff time spent reconstructing what was known. On the campuses I have talked to that have been through a key retirement without a knowledge transfer plan, the number runs into the hundreds of thousands of dollars over the first few years.",
      },
      { type: "h2", text: "The audit and compliance exposure" },
      {
        type: "p",
        text: "Federal and state environmental and safety regulations require documented records of certain utility systems, particularly those handling hazardous materials, high pressure systems, and electrical distribution. When those records are not accessible, the organization is technically out of compliance whether or not anything bad has happened.",
      },
      {
        type: "p",
        text: "Inspection findings and regulatory penalties for records deficiencies are low frequency but high cost events. The more common exposure is the audit preparation cost: pulling together documentation that should be immediately accessible but requires days of archive search. That preparation time before every compliance review is a recurring cost that scales with how bad the records are.",
      },
      { type: "h2", text: "What a better archive is worth" },
      {
        type: "p",
        text: "Adding up the categories above for a mid-size campus: $15,000 to $25,000 per year in search time, $50,000 to $150,000 every few years in strike risk, $100,000 to $300,000 per major project in avoidable contingency and change orders, and periodic compliance exposure. The expected annual cost of a poor archive is somewhere between $30,000 and $100,000 depending on construction volume and archive quality.",
      },
      {
        type: "p",
        text: "A full archive digitization and index project for a campus of 500 to 1,500 sheets typically runs $50,000 to $200,000 depending on depth of work. The payback period, based on the numbers above, is usually under three years. If a major construction project is in the pipeline, it can be under one year.",
      },
      {
        type: "p",
        text: "The argument is not that every campus should spend $200,000 on records management. The argument is that the cost of doing nothing is already being paid, just in ways that do not show up in the facilities budget as a single line item.",
      },
    ],
  },
  {
    slug: "40-year-old-utility-atlas",
    title: "What to do when your utility atlas is 40 years old",
    description:
      "An honest guide to assessing, prioritizing, and acting on a legacy utility atlas that has aged out of reliability.",
    date: "2026-04-16",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["utilities", "atlas", "legacy", "planning"],
    blocks: [
      {
        type: "p",
        text: "A utility atlas produced in 1985 was accurate in 1985. Forty years later, it represents what someone believed was in the ground four decades ago, plus or minus whatever they got wrong at the time. Some of it is still accurate. Some of it has been superseded by construction you may or may not have records for. Some of it was never right.",
      },
      {
        type: "p",
        text: "The question is not whether to trust a 40 year old atlas. The question is which parts to trust, at what level of confidence, and what to do about the parts you cannot trust.",
      },
      { type: "h2", text: "Triage before you digitize" },
      {
        type: "p",
        text: "The first thing to do is triage the atlas into confidence zones. Not every sheet is equally unreliable. The areas with high construction activity since 1985 are the low confidence areas. The areas that have not been touched, some parks, some rural sections, some industrial sites that closed, may still be close to accurate.",
      },
      {
        type: "p",
        text: "You can do this triage with aerial imagery and permit history without ever opening the atlas. Pull up a time series of satellite imagery and identify which areas show obvious construction activity after the atlas was produced. Cross reference with your construction permits and project records for the same period. The result is a rough map of where you should be most skeptical.",
      },
      { type: "h2", text: "The three categories of old drawings" },
      {
        type: "p",
        text: "When you look at an old atlas with fresh eyes, most sheets fall into one of three categories:",
      },
      {
        type: "ol",
        items: [
          "Still useful as-is. Areas without significant construction activity, well-drawn, clearly showing a simple system. These can be scanned, georeferenced, and used with appropriate confidence caveats.",
          "Useful as background but superseded. Correct for the era they represent, but you have newer drawings for work done after them. These should be in the archive and indexable, but not treated as current records. The newer construction records are the truth for the areas they cover.",
          "Unreliable and potentially dangerous. Areas with known reconstruction activity for which you do not have as-builts, areas where the original survey was known to be approximate, and areas where field evidence contradicts the atlas. These need to be flagged explicitly so that locate techs and designers know to verify before they act.",
        ],
      },
      { type: "h2", text: "Using field evidence to validate" },
      {
        type: "p",
        text: "The most reliable way to validate a legacy atlas is to compare it to field observations. GPS coordinates of visible utilities, valve boxes, cleanouts, transformer pads, and pull boxes are quick to collect and directly comparable to atlas locations. A field crew collecting 50 to 100 verification points in a day can give you a strong sense of the systematic accuracy of a given atlas section.",
      },
      {
        type: "p",
        text: "When field points match the atlas within 2 to 3 meters, the atlas is generally trustworthy for that area at planning accuracy. When they diverge by 5 to 10 meters, the atlas was either surveyed roughly or features have been relocated. When they diverge by more than 10 meters, treat the atlas as illustrative rather than locational and plan for potholing before any excavation.",
      },
      { type: "h2", text: "Deciding what to digitize" },
      {
        type: "p",
        text: "A common mistake is digitizing the entire atlas before assessing reliability. You spend significant money converting data that you then have to flag as unreliable, and the flagged data confuses people who do not read the confidence metadata.",
      },
      {
        type: "p",
        text: "A better approach: digitize for access and search across the whole archive, but only invest in accurate vectorization for the high confidence category one areas identified in triage. For category two, index and reference the newer construction records as the primary source. For category three, digitize with an explicit uncertainty flag and a note that field verification is required before use.",
      },
      { type: "h2", text: "The reconstruction problem" },
      {
        type: "p",
        text: "For areas where you have construction activity but no as-builts, you may be able to reconstruct approximate locations from other sources. Construction permits sometimes include enough detail to infer locations. Photo archives from project documentation can show trench locations. Potholing in high confidence adjacent areas can establish utility alignments that can be extrapolated.",
      },
      {
        type: "p",
        text: "This reconstruction work is expensive and produces low confidence results by definition. It is worth doing for high risk corridors, areas near planned construction, and utilities where a strike would have high consequences. It is not worth doing everywhere. Accept that some parts of your system have documentation gaps and document those gaps explicitly rather than filling them with uncertain data.",
      },
      { type: "h2", text: "What to tell your team" },
      {
        type: "p",
        text: "The practical guidance for a team using an old atlas is simple: the atlas tells you where to look and approximately what to expect. It does not tell you precisely where something is. Pothole before you dig near anything important. Mark up the atlas when field conditions differ from what was shown. Those markups feed the next round of updates.",
      },
      {
        type: "p",
        text: "An old atlas that everyone treats with appropriate skepticism and updates based on field experience gets better over time. An old atlas that everyone treats as authoritative because updating it feels overwhelming gets more dangerous over time. The choice is not between perfect records and imperfect ones. It is between records that acknowledge their limits and records that do not.",
      },
    ],
  },
  {
    slug: "preparing-drawings-for-gis-migration",
    title: "Preparing legacy drawings for a GIS migration",
    description:
      "The data preparation work that most GIS migration projects underestimate, and how to approach it without blowing your timeline.",
    date: "2026-04-17",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["GIS", "migration", "data preparation", "utilities"],
    blocks: [
      {
        type: "p",
        text: "Most GIS migrations fail at the data preparation phase. Not because the GIS platform is wrong, not because the implementation team is incompetent, but because the organization discovers three months into a 12 month project that the source data is in much worse shape than anyone estimated.",
      },
      {
        type: "p",
        text: "Data preparation is the part of a GIS migration that gets the least budget and the most surprises. This post is an attempt to help you scope it more accurately before you commit to a timeline.",
      },
      { type: "h2", text: "What data preparation actually means" },
      {
        type: "p",
        text: "People use 'data preparation' to mean different things. In the context of a utility GIS migration, it means at minimum:",
      },
      {
        type: "ul",
        items: [
          "Inventorying all source records: paper drawings, scanned PDFs, CAD files, spreadsheets, field notebooks, legacy database exports.",
          "Assessing each source for format, quality, completeness, and vintage.",
          "Defining a target data model with feature types, attributes, and topology rules.",
          "Transforming source data into the target model, which includes format conversion, attribute mapping, geometric cleanup, and connectivity enforcement.",
          "Reconciling conflicts between sources that represent the same features differently.",
          "Populating missing attributes either from other sources or through field verification.",
          "Performing QA against the target model specifications.",
        ],
      },
      {
        type: "p",
        text: "That is a lot. And every item on the list is harder than it sounds the first time.",
      },
      { type: "h2", text: "The inventory is always wrong the first time" },
      {
        type: "p",
        text: "Every organization I have worked with has underestimated what is in their records collection. Not slightly, substantially. The reasons are consistent: records are in multiple locations controlled by different people or departments, digital files are scattered across shared drives and individual workstations with no central index, and the institutional memory about where things are lives with specific individuals who were not consulted during scoping.",
      },
      {
        type: "p",
        text: "Before you schedule a migration timeline, do a proper discovery. Visit the physical archive. Talk to the people who have been there longest. Request an export of the file server. Map out what systems, departments, and projects have produced records. You will find things you did not expect, and some of them will be important.",
      },
      { type: "h2", text: "Data model conflicts eat timelines" },
      {
        type: "p",
        text: "Legacy records were created for many purposes by many people over decades. They do not conform to a unified data model. When you try to migrate them into one, you will find features that do not fit neatly into any feature type, attributes stored in formats that cannot be mapped directly, and source records that contradict each other for the same feature.",
      },
      {
        type: "p",
        text: "Handling these conflicts requires decisions. Does this pipe segment that crosses the boundary between two project areas belong to the water main feature class or the service line feature class? What happens to the 15 percent of valves that have no associated main? How do you handle three different drawings that show the same intersection with three different pipe alignments?",
      },
      {
        type: "p",
        text: "Each of these decisions takes time and sometimes requires escalation to someone who was there. Plan for it. The teams that move fastest through data model conflicts are the ones that have a designated data steward with authority to make binding decisions on ambiguous cases, not a committee that reviews every edge case.",
      },
      { type: "h2", text: "Topological cleanup is where the hours go" },
      {
        type: "p",
        text: "Utility GIS requires topologically correct data. Pipes connect to pipes. Valves sit on pipe segments. Manholes intersect sewer lines at exactly the right point. In source data that was created for drawing production rather than network analysis, these topological relationships are implied by the drawing but not encoded.",
      },
      {
        type: "p",
        text: "Converting implicit topology to explicit topology is tedious. You snap endpoints that are close but not exactly coincident. You split segments that should be interrupted at an intersection. You ensure that every network feature has the right connectivity. On a large utility network, this can add up to hundreds of hours of careful work.",
      },
      {
        type: "p",
        text: "The shortcut that works: define a tolerance for the initial conversion, run automated topology repair on everything within tolerance, and route the remainder to manual review. Most topological errors in CAD-sourced data are endpoint gaps smaller than 0.1 meters caused by drafting imprecision. Those close automatically. The real topological conflicts, features that genuinely disagree about connectivity, are much fewer and can be reviewed individually.",
      },
      { type: "h2", text: "Attribute completeness is a choice, not a fact" },
      {
        type: "p",
        text: "Your target data model will have attributes that are not present in your source records. Pipe material for lines installed before material recording was standard. Install year for features added during emergency repairs with no follow-on documentation. Condition ratings for assets that have never been inspected.",
      },
      {
        type: "p",
        text: "You have three options for each missing attribute: leave it null and accept the gap, populate it from inference based on age and regional material standards, or collect it in the field. Each option has a different cost and a different risk profile. The organizations that handle this well make an explicit decision per attribute rather than letting the data migration team default to null everywhere.",
      },
      { type: "h2", text: "The QA plan needs to be written before migration starts" },
      {
        type: "p",
        text: "QA that is designed after the migration is complete catches errors but cannot fix them efficiently. QA that is designed before migration starts defines what pass and fail look like, enables automated checking at each stage, and creates a feedback loop that improves quality as work progresses.",
      },
      {
        type: "p",
        text: "Write the QA plan for each phase before that phase starts. Define sampling rates, error thresholds, and escalation criteria. The migration team should be measuring their own accuracy, not waiting for an audit at the end.",
      },
      {
        type: "p",
        text: "The most useful QA metric for a utility GIS migration is not geometric accuracy or attribute completeness in isolation. It is network traversability: can a network trace from any point to any connected endpoint without hitting a dead end caused by a topology error? Run that check continuously. It catches problems that no individual feature check will surface.",
      },
    ],
  },
  {
    slug: "underground-utility-locating-historical-plans",
    title: "Using historical utility plans for underground locating",
    description:
      "What the drawings can tell you, what they cannot, and how to use them responsibly before you put a shovel in the ground.",
    date: "2026-04-18",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["utility locating", "underground", "as-built", "safety"],
    blocks: [
      {
        type: "p",
        text: "Historical utility plans are not locate documents. They are reference documents. The distinction matters because the consequences of treating them as locate documents and being wrong are severe: ruptured gas mains, energized cable strikes, severed fiber lines, water outages.",
      },
      {
        type: "p",
        text: "That said, historical plans are valuable in the locate process when used correctly. They tell you where to look, what utilities are likely present, and what documentation gaps you need to account for before you dig. Here is how to use them responsibly.",
      },
      { type: "h2", text: "What a historical plan can tell you" },
      {
        type: "ul",
        items: [
          "The horizontal alignment and approximate depth of utilities installed at the time of the drawing.",
          "The material, size, and installation date of documented utilities.",
          "The presence of utilities that may not be in any modern database.",
          "The structure of the utility network in an area, including branches, connections, and terminations.",
          "The location of access points: valves, manholes, cleanouts, junction boxes.",
        ],
      },
      { type: "h2", text: "What it cannot tell you" },
      {
        type: "ul",
        items: [
          "Whether any utility shown is still in service, abandoned in place, or removed.",
          "Whether utilities were actually installed as drawn versus modified in the field.",
          "The location of utilities installed after the drawing date.",
          "The current depth of utilities that may have settled, been lowered, or been covered by subsequent paving.",
          "The presence of utilities installed by parties other than the one who produced the drawing.",
        ],
      },
      {
        type: "p",
        text: "That second list is not hypothetical. On any active construction site with a decades-long history, you will find utilities not shown on any drawing. Abandoned conduit. Emergency repairs that were never submitted as as-builts. Private utilities installed by tenants. The drawings tell you about the documented system. The documented system is a subset of what is actually in the ground.",
      },
      { type: "h2", text: "Accuracy as a function of drawing age and method" },
      {
        type: "p",
        text: "Not all drawings are equally reliable as locate references. A drawing produced from GPS field survey of exposed utilities during a trench excavation is very different from a design drawing showing where the contractor intended to install something.",
      },
      {
        type: "p",
        text: "As a rough guide to horizontal accuracy expectations:",
      },
      {
        type: "ul",
        items: [
          "GPS field-surveyed as-built from the last 15 years: 0.1 to 0.5 meters. Reliable for planning, use with normal pothole verification near the work zone.",
          "CAD as-built from field measurements, 1990s to 2000s: 0.5 to 2 meters. Good for planning, verify before excavating adjacent to anything important.",
          "Drafted as-built from estimated field measurements, pre-1990s: 1 to 5 meters. Use as a guide for where to look, not where to dig. Always pothole.",
          "Design drawing, not confirmed as-built: unknown. The utility may be anywhere near the shown alignment. Treat as an indicator, not a location.",
          "Reconstructed from memory or field notes, no survey: very uncertain. Document the uncertainty explicitly.",
        ],
      },
      { type: "h2", text: "The locate process with historical plans" },
      {
        type: "p",
        text: "A sound process for using historical plans in a locate context:",
      },
      {
        type: "ol",
        items: [
          "Pull all drawings that cover the excavation area plus a 10 meter buffer.",
          "Identify utilities shown on each drawing. Note the drawing date and method for each.",
          "Compile a list of expected utilities with their approximate locations and confidence levels.",
          "Call 811. Required regardless of what your drawings show. Public utility locators have information your drawings do not, and vice versa.",
          "Compare 811 marks to drawing expectations. Discrepancies are investigation items before any digging.",
          "Pothole to verify depth and confirm alignment for any utility within 1.5 meters of the planned excavation.",
          "Note any utilities found in the field that do not match drawings. That information should go back into the archive as an update.",
        ],
      },
      { type: "h2", text: "The gap documentation habit" },
      {
        type: "p",
        text: "Every time field conditions differ from what the drawings show, you have an opportunity to improve the record. A GPS point on an exposed utility, a photo of a utility crossing that was not documented, a note that a marked utility was not found at the shown location. These observations, systematically captured, are how a utility archive gets more accurate over time.",
      },
      {
        type: "p",
        text: "The organizations with the best utility records are not the ones that did a big digitization project 10 years ago. They are the ones that have built a continuous feedback loop from field operations back into the archive. The digitization project creates the starting point. The feedback loop is what makes it valuable five years later.",
      },
      { type: "h2", text: "What to put in a pre-excavation briefing" },
      {
        type: "p",
        text: "Before any significant excavation, the briefing should include: a map showing all documented utilities in the work area with their vintage and confidence level, a list of documentation gaps and unknown areas, the 811 ticket status, the pothole plan for utilities near the work zone, and a stop work trigger, a specific condition under which the crew stops and calls before proceeding.",
      },
      {
        type: "p",
        text: "The stop work trigger is what historical plans cannot replace. Even the best records miss something. A crew that has clear authority to stop and verify when something does not match expectations is a safer crew than one operating without that authority even with excellent drawings.",
      },
    ],
  },
  {
    slug: "infrastructure-data-us-municipalities",
    title: "The state of infrastructure data in US municipalities",
    description:
      "A grounded look at where municipal utility records actually stand, what is holding progress back, and what the gap costs.",
    date: "2026-04-21",
    author: "Beckett Devoe",
    readingTime: "10 min read",
    tags: ["municipalities", "infrastructure", "GIS", "data"],
    blocks: [
      {
        type: "p",
        text: "There is a persistent gap between how people talk about infrastructure data and how it actually exists in most US municipalities. The conversation at conferences and in trade press is about GIS platforms, digital twins, AI-powered asset management, and predictive maintenance. The reality in most small to mid-size cities is a mix of partial GIS data of uncertain vintage, paper drawings in varying states of organization, and staff who know where most things are but cannot transfer that knowledge to a system.",
      },
      {
        type: "p",
        text: "This is not a failure. It is a function of how infrastructure data has been created over a century of incremental construction, by different contractors, under different standards, with different documentation requirements. Understanding where things actually stand is the first step toward improving them.",
      },
      { type: "h2", text: "What the data says" },
      {
        type: "p",
        text: "The American Society of Civil Engineers infrastructure report cards document the physical condition of US infrastructure. They are less useful for understanding the state of the records, but the pattern is the same: significant variation by municipality size, age, and resource level, with the most severe gaps in the smallest and oldest systems.",
      },
      {
        type: "p",
        text: "Industry surveys of utility GIS adoption suggest that roughly 60 to 70 percent of US water utilities have some form of GIS for their distribution system. That sounds encouraging until you look at what 'some form of GIS' means in practice. For many utilities, it means a GIS layer that was created from paper maps in the early 2000s, has not been systematically updated since, and has known accuracy issues that staff work around rather than fix.",
      },
      {
        type: "p",
        text: "The utilities with the best data are generally larger systems, systems that went through SCADA or AMI implementations that required good spatial data as a prerequisite, and systems that had a federal compliance event or an insurance audit that forced a records cleanup. The rest are managing with what they have.",
      },
      { type: "h2", text: "The three tiers of municipal utility data" },
      {
        type: "p",
        text: "From the work we do and the conversations we have with utilities across the country, I would characterize the field roughly as:",
      },
      {
        type: "ul",
        items: [
          "Tier 1 (roughly 15 to 20 percent of systems): well-maintained GIS with consistent update processes, as-built capture requirements for new construction, and some program for ongoing accuracy improvement. These systems are not perfect but they are functional and getting better.",
          "Tier 2 (roughly 40 to 50 percent): partial GIS with known gaps. The main system is in GIS at rough accuracy. Services may or may not be. Valves and hydrants are mixed. Historical records exist but are not well integrated. These systems work for day-to-day operations but struggle with capital planning and contractor coordination.",
          "Tier 3 (roughly 30 to 40 percent): predominantly paper or legacy records with minimal GIS. The institutional knowledge is primary. These systems are most vulnerable to staff turnover and most at risk from construction accidents.",
        ],
      },
      { type: "h2", text: "What is holding tier 2 and 3 systems back" },
      {
        type: "p",
        text: "Talking to utility managers and GIS coordinators in tier 2 and 3 systems, the same barriers come up consistently.",
      },
      {
        type: "p",
        text: "Staff capacity. Most small to mid-size utilities do not have a dedicated GIS analyst. The person who is supposed to maintain the GIS also does permit processing, locates, customer service, and capital project coordination. There is no time for systematic data improvement.",
      },
      {
        type: "p",
        text: "Budget uncertainty. Records improvement is almost always treated as a capital project requiring one time appropriation, not as an operational function requiring ongoing budget. This means it gets deferred in tight years and then funded in a lump sum that overwhelms the staff capacity needed to implement it.",
      },
      {
        type: "p",
        text: "Scope paralysis. The right scope for a records improvement project is genuinely hard to define without a baseline assessment. Many utilities have gotten quotes ranging from $50,000 to $500,000 for 'utility GIS improvement' without understanding why the range is so wide. The uncertainty makes it hard to get board or council approval.",
      },
      {
        type: "p",
        text: "Vendor quality variation. The market for utility data services has real variation in quality, and utilities that have been through a bad experience with a vendor that delivered unusable data are understandably reluctant to try again.",
      },
      { type: "h2", text: "What federal and state programs are doing" },
      {
        type: "p",
        text: "The Infrastructure Investment and Jobs Act includes funding for water and wastewater system improvements, and some state revolving funds have been updated to allow records improvement as an eligible use. This is meaningful but not transformative. The administrative burden of grant applications and reporting requirements disproportionately benefits larger systems with dedicated grant writers. Small systems with the worst records often cannot access the funding available to help them.",
      },
      {
        type: "p",
        text: "Several states have passed one-call law updates that effectively require utilities to have accessible, locatable records as a condition of operating. These requirements are unevenly enforced but they represent a shift in the regulatory baseline that will eventually drive more systematic records investment.",
      },
      { type: "h2", text: "The opportunity" },
      {
        type: "p",
        text: "For all the challenges, the data problem is solvable. The tools available today, for scanning, indexing, georeferencing, and extracting data from legacy drawings, are dramatically better and cheaper than they were a decade ago. A tier 3 utility with a 500 sheet paper archive can move to functional tier 2 in six months with the right scope and the right partner. That was not true in 2010.",
      },
      {
        type: "p",
        text: "The organizations making progress are the ones that start with a realistic baseline assessment, scope to the minimum useful outcome rather than the ideal outcome, and build a process for keeping records current after the initial project is done. The initial project creates a foundation. The process determines whether it was worth it.",
      },
    ],
  },
  {
    slug: "why-utility-gis-projects-stall",
    title: "Why most utility GIS projects stall at data prep",
    description:
      "A pattern-level diagnosis of the most common failure mode in utility GIS implementations, and what to do about it.",
    date: "2026-04-22",
    author: "Beckett Devoe",
    readingTime: "8 min read",
    tags: ["GIS", "utilities", "project management", "data"],
    blocks: [
      {
        type: "p",
        text: "A utility decides to implement GIS. They select a platform, get budget approval, sign contracts. Eighteen months later, the project is not done. The platform is configured. The data model is designed. But the actual utility data is still mostly in paper drawings and legacy systems, and the migration has stalled at some combination of 'we need to clean up the data first' and 'we need to verify the field data before we load it.'",
      },
      {
        type: "p",
        text: "This is not a rare outcome. It is the most common outcome. The platform is not the hard part. The data is the hard part. Here is a detailed diagnosis of why it stalls, and what the projects that actually finish have done differently.",
      },
      { type: "h2", text: "The planning gap" },
      {
        type: "p",
        text: "Most utility GIS projects are planned around platform implementation, not data preparation. The project plan has tasks for installing software, configuring schemas, and training staff. It has a line item for 'data migration' that is either underscoped or undefined. Nobody has done the work of understanding what source data exists, in what condition, and what it will take to transform it into the target model.",
      },
      {
        type: "p",
        text: "This gap has a straightforward cause: the people who know the most about data preparation are the ones who know the archive, and they are typically not involved in vendor selection or project scoping. The GIS coordinator who inherits the migration task may have never opened the flat file cabinet. The person who has been managing the paper drawings for 25 years may not be consulted until the platform is already installed.",
      },
      {
        type: "p",
        text: "The fix is a data assessment phase before platform selection. Not before implementation, before selection. Walk the archive with the person who manages it. Count the drawings. Note the formats, the condition, and the coverage gaps. Translate those observations into a rough estimate of data preparation scope. That estimate should be an input to the platform evaluation, not a discovery you make after you have already signed the contract.",
      },
      { type: "h2", text: "What a real data assessment looks like" },
      {
        type: "p",
        text: "A data assessment for a utility GIS migration covers six questions:",
      },
      {
        type: "ol",
        items: [
          "What source records exist and where are they? Paper drawings, CAD files, legacy database exports, field notebooks, contractor submittals. Not just the main archive but every location where records live.",
          "What is the condition and completeness of each source? For paper, note format, age, and damage. For digital, note file format consistency, layer naming conventions, and how much of the system is actually represented.",
          "What is the target data model? What feature types, attributes, and topology rules does the GIS need to support for the intended use cases?",
          "How much of the source data maps cleanly to the target model versus how much requires interpretation, field verification, or reconstruction?",
          "What are the coverage gaps? Are there areas where no documentation exists? Is any documentation known to be inaccurate?",
          "What is the volume? Sheet counts, estimated feature counts, estimated digitizing hours per category.",
        ],
      },
      {
        type: "p",
        text: "A thorough assessment on a mid-size utility archive takes two to four weeks and should produce a written report with the answers to all six questions plus a data preparation scope estimate. That estimate will not be exact, but it will be in the right order of magnitude. The organizations that do this before they scope a project end up with budgets that hold. The ones that skip it do not.",
      },
      { type: "h2", text: "The source data discovery problem" },
      {
        type: "p",
        text: "Even with a good assessment, the team doing the migration will discover things they did not expect. CAD files with inconsistent layer naming across projects. Paper drawings with revisions that conflict with each other. Areas with no documentation at all. Features in the legacy database that do not match what is on the drawings.",
      },
      {
        type: "p",
        text: "Each discovery adds scope. Each scope addition requires a decision: do we fix it now, defer it, or accept a lower quality import? Decisions require stakeholder alignment. Stakeholder alignment takes meetings. Meetings take time. The migration stalls.",
      },
      {
        type: "p",
        text: "The teams that move through this fastest make a categorical decision up front: we will import what we can confirm and flag the rest as unverified. That decision has to come from leadership, because it requires accepting that the GIS will go live with known gaps. Most organizations have trouble accepting that until they have stared at a stalled project for two years.",
      },
      {
        type: "p",
        text: "The mechanism for this is a simple three-tier classification on every feature being imported: confirmed, which means multiple sources agree or a field check has verified it; draft, which means imported from a single source with no verification; and unverified, which means something is known to be wrong or missing. The confirmed and draft features go live on launch day. The unverified areas are flagged on the map so that staff know to exercise caution. This approach gets the GIS into use while providing an honest picture of where the data is and is not trustworthy.",
      },
      { type: "h2", text: "The verification loop" },
      {
        type: "p",
        text: "A common stall point is the verification requirement. The data team imports draft features from the drawings. Field staff review them and find errors. The errors go back to the data team. The corrections require context that only field staff have. The field staff are also doing their regular jobs. Review cycles take weeks instead of days. The backlog grows.",
      },
      {
        type: "p",
        text: "Breaking this loop requires dedicated block time. Not a few hours a week squeezed in between locate requests and customer calls. Actual allocated time, for a defined period, for one senior field person to do nothing but review and correct draft GIS data. Two to four weeks of full allocation from one experienced person will move more data through verification than six months of part-time review. Most organizations resist this because it is visibly expensive in the short term. It is always less expensive than a multi-year stall.",
      },
      {
        type: "p",
        text: "Tooling matters here too. Give the reviewer a fast, simple interface for the review task. A web map with draft features, a toggle between the drawing and the current imagery, and a simple approve/correct/flag action on each feature. If the reviewer has to open two applications, export files, and email corrections, the review rate will be a fraction of what it would be with a purpose-built review interface.",
      },
      { type: "h2", text: "The scope escalation problem" },
      {
        type: "p",
        text: "Data preparation reveals things you did not know. That is useful. The problem is that each discovery creates pressure to fix everything before going live. Unknown services get added to the scope. Missing valves prompt a field survey. Conflicting drawing versions prompt an accuracy study. The scope grows, the timeline extends, and the organization loses confidence that the project will ever finish.",
      },
      {
        type: "p",
        text: "The counter is a strict, written distinction between launch scope and post-launch scope. Define what is required to go live: which systems, which attribute fields, what minimum accuracy. Everything else, no matter how useful, goes on the post-launch list and gets a future sprint or a future budget request. The post-launch list is not a failure. It is evidence of a project that shipped.",
      },
      {
        type: "p",
        text: "The organizations that are furthest ahead at year three are almost always the ones that launched with something imperfect and improved it steadily. The ones still trying to build the perfect dataset before going live at year three are usually still trying at year five.",
      },
      { type: "h2", text: "The vendor selection trap" },
      {
        type: "p",
        text: "Many utility GIS projects fail at data prep not because of anything the organization did wrong, but because they hired a platform implementation vendor who is excellent at platform configuration and not set up for data preparation work. The vendor installs the software, configures the schema, trains the staff, and then hands off a spec sheet for data migration. The organization then has a configured GIS with no data in it and no partner equipped to help them fill it.",
      },
      {
        type: "p",
        text: "Platform implementation and data preparation are different work requiring different skills. When you scope a GIS project, ask each vendor explicitly: who does the data preparation work, what is their process, and what have they delivered for a utility archive similar to ours in size and condition? If the answer is vague or if data preparation is treated as something the client manages separately, plan for that gap before you sign.",
      },
      { type: "h2", text: "What the successful projects have in common" },
      {
        type: "ul",
        items: [
          "They did a data assessment before platform selection. They knew what their data looked like before making any commitments.",
          "They defined a minimum viable dataset for launch and held that line. The launch dataset was not perfect. It was good enough to be useful.",
          "They had a dedicated data preparation resource whose primary job during the migration was data, not platform configuration.",
          "They used a three-tier confidence classification so that launch did not require perfect data, only honest data.",
          "They dedicated real field staff time to verification, in blocks rather than fractions.",
          "They built a feedback mechanism from field use into ongoing improvement. The GIS getting better after launch was planned for, not hoped for.",
          "Leadership accepted the gap between the launch dataset and the ideal dataset and communicated that acceptance clearly to the team.",
        ],
      },
      {
        type: "p",
        text: "The platform you choose matters less than you think. The data preparation process matters more than almost anything else. The projects that treat data preparation as an afterthought to platform implementation are the ones you will read about in the lessons-learned section of the next conference proceedings.",
      },
    ],
  },
  {
    slug: "ai-vs-manual-digitization-benchmark",
    title: "AI vs. manual digitization: a head-to-head comparison",
    description:
      "What the numbers actually look like when you run AI-assisted extraction against manual digitizing on the same set of utility drawings.",
    date: "2026-04-23",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["AI", "digitization", "benchmark", "comparison"],
    blocks: [
      {
        type: "p",
        text: "The pitch for AI-assisted digitization is compelling: faster, cheaper, scalable. The skeptical pushback is also reasonable: real drawings are messy, models fail in ways you do not expect, and a wrong pipe location is worse than no pipe location. Both things can be true at the same time.",
      },
      {
        type: "p",
        text: "This post is a structured comparison based on tests run against the same set of utility drawings using both approaches. I will give you the methodology, the numbers, a description of what the review workflow actually looks like, and an honest assessment of where each approach belongs.",
      },
      { type: "h2", text: "The test set" },
      {
        type: "p",
        text: "The comparison used 60 sheets drawn from a municipal water utility archive, stratified by drawing type and condition:",
      },
      {
        type: "ul",
        items: [
          "20 sheets: modern CAD plots from the last 15 years, clean and consistent.",
          "20 sheets: mid-era drawings from the 1980s and 1990s, a mix of hand-drafted and early CAD, variable quality.",
          "20 sheets: historical drawings from the 1950s through 1970s, hand-drafted, some with degradation.",
        ],
      },
      {
        type: "p",
        text: "Each sheet was digitized by an experienced GIS technician working manually, then processed independently by an AI extraction pipeline. Results were compared against a ground truth dataset of 200 verified GPS field points distributed across the test area. Metrics captured: feature detection rate, geometric accuracy, attribute accuracy, and time per sheet for each method.",
      },
      { type: "h2", text: "Feature detection rate" },
      {
        type: "p",
        text: "Feature detection measures what fraction of the features present in the ground truth were captured in the output. Missing features and wrong features are different failure modes. A missing pipe might prompt additional verification before excavation. A wrong pipe location might send a crew to the wrong place without triggering any warning.",
      },
      {
        type: "p",
        text: "Manual digitizing detected 97 percent of features across all sheet types. The 3 percent miss rate was concentrated on small diameter service connections on dense sheets and on features in heavily annotated areas where the technician judged the drawing too ambiguous to digitize with confidence.",
      },
      {
        type: "p",
        text: "AI extraction detected 91 percent of features on modern sheets, 84 percent on mid-era sheets, and 71 percent on historical sheets. The gap with manual widened on older material, as expected. The miss pattern was different: AI consistently missed features in degraded regions and in areas with drawing conventions not represented in its training data, while human technicians selectively missed features they chose not to interpret rather than guess.",
      },
      { type: "h2", text: "Geometric accuracy" },
      {
        type: "p",
        text: "Geometric accuracy was measured as the distance between the digitized feature centroid and the ground truth GPS point for the same feature. Results are mean error in meters:",
      },
      {
        type: "ul",
        items: [
          "Manual, modern sheets: 0.8 m",
          "AI, modern sheets: 1.1 m",
          "Manual, mid-era sheets: 1.4 m",
          "AI, mid-era sheets: 1.7 m",
          "Manual, historical sheets: 2.3 m",
          "AI, historical sheets: 2.8 m",
        ],
      },
      {
        type: "p",
        text: "Manual digitizing was more accurate across all categories. The gap was small and practically insignificant on modern sheets. On historical sheets, both approaches produce accuracy appropriate for planning work but not for precise locate applications. That reflects the inherent limitations of the source material rather than the digitization method. A hand-drafted 1960s drawing was not surveyed to sub-meter accuracy, and no digitization method can recover precision that was never there.",
      },
      { type: "h2", text: "Attribute accuracy" },
      {
        type: "p",
        text: "Attribute accuracy measured whether extracted attributes matched the ground truth for features where both the feature was detected and the attribute was legible from the drawing. Attributes tested: pipe diameter, material, and installation year.",
      },
      {
        type: "p",
        text: "Manual: 94 percent attribute accuracy across all three fields. AI: 88 percent overall, with significant variation by attribute type. Diameter extraction was 93 percent accurate, very close to manual. Material extraction was 85 percent accurate, with failures concentrated on uncommon abbreviations and material designations that were underrepresented in training data. Year extraction was 82 percent accurate, with failures on partially obscured title blocks and on handwritten date fields.",
      },
      {
        type: "p",
        text: "The material and year accuracy gap is worth taking seriously. If material is a critical attribute for your use case, build in a targeted review step for the AI material extractions even when overall confidence is high. The model's diameter confidence and its material confidence are not correlated. A feature can have a correct, high-confidence diameter and a wrong material at the same time.",
      },
      { type: "h2", text: "Time per sheet" },
      {
        type: "p",
        text: "This is where the economic comparison becomes decisive. Manual digitizing averaged 3.2 hours per sheet on modern drawings, 4.8 hours on mid-era, and 6.5 hours on historical. These times include tracing, attribute assignment, and basic topology cleanup but not full QA.",
      },
      {
        type: "p",
        text: "AI extraction averaged 12 minutes per sheet for the automated pass regardless of drawing type. Human review of the AI output averaged 45 minutes per sheet, covering: reviewing flagged low-confidence features, correcting errors found during spot QA, and manually attributing features where the model returned below-threshold confidence. Total time with the AI-assisted workflow: 57 minutes per sheet on modern drawings, 68 minutes on mid-era, and 95 minutes on historical.",
      },
      {
        type: "p",
        text: "That is a 3 to 4 times speed improvement on modern material and a 2 times improvement on historical material. Over a 1,000 sheet archive split proportionally across the three categories, the total labor difference is roughly 4,500 hours for manual versus 1,200 hours for AI-assisted. At $60 per hour fully loaded, that is $270,000 versus $72,000 in labor, before tool costs.",
      },
      { type: "h2", text: "What the AI review workflow actually looks like" },
      {
        type: "p",
        text: "The 45-minute average review time assumes a specific workflow. Understanding it matters because a poorly designed review interface will expand that number dramatically.",
      },
      {
        type: "p",
        text: "The reviewer works in a split-screen view: the original drawing on one side, the extracted GIS features overlaid on the drawing on the other. The interface highlights features by confidence tier: green for high confidence, yellow for medium, red for low. The reviewer skips green features entirely on the first pass, checks yellow features quickly, and reviews every red feature in detail.",
      },
      {
        type: "p",
        text: "For each flagged feature, the reviewer either approves it as extracted, corrects the geometry by dragging, corrects the attributes by editing a field, or deletes it as a false positive. The interface shows the source pixel region that generated each attribute, so the reviewer can see exactly where the model read the pipe size from and verify or correct it without hunting through the drawing.",
      },
      {
        type: "p",
        text: "The review rate on this interface is roughly 40 to 60 features per hour for mixed confidence output. On a sheet with 30 features where 20 are high confidence and 10 are flagged, review takes 10 to 15 minutes. On a dense sheet with 80 features and 40 flagged, review takes 40 to 60 minutes. The 45-minute average reflects a realistic mix.",
      },
      { type: "h2", text: "How confidence scores should drive QA" },
      {
        type: "p",
        text: "Confidence scores from an AI extraction model are only useful if you use them to route work. A pipeline that produces confidence scores but then treats all output equally is not using the information. The right structure: high confidence features go directly into the GIS with a 'draft' flag. Medium confidence features go to reviewer queue. Low confidence features go to expert reviewer queue. Features below a minimum threshold get held out entirely for manual digitizing.",
      },
      {
        type: "p",
        text: "The threshold values for each tier should be calibrated against your specific archive and your specific accuracy requirements. On modern, consistent CAD drawings, you can set higher thresholds because the model performs well and the review burden on true positives is low. On historical drawings, set tighter thresholds and accept higher review rates. The goal is to find the threshold that minimizes total cost, the weighted sum of review labor and error correction labor downstream.",
      },
      { type: "h2", text: "The honest bottom line" },
      {
        type: "p",
        text: "Manual digitizing produces better geometric accuracy and higher feature detection rates on every category of drawing. AI-assisted extraction is 2 to 4 times faster with accuracy that is within acceptable ranges for most planning and operations use cases.",
      },
      {
        type: "p",
        text: "The choice is not really between AI and manual as absolute approaches. It is about how to allocate human time. AI handles the bulk of the work at acceptable accuracy. Manual review handles the high-stakes features and the areas where AI underperforms. The hybrid approach outperforms either method alone on quality-adjusted throughput, which is the metric that determines whether the project finishes on budget.",
      },
      {
        type: "p",
        text: "Where manual digitizing is still the right answer: when you need maximum accuracy for a high-stakes corridor like a hospital campus or a dense urban intersection, when the source material is unusual enough that no AI model has relevant training data, and when the annotation density is high enough that AI feature attribution fails at rates that make review as slow as manual work. Those conditions exist. They are not the majority of a typical archive.",
      },
      {
        type: "p",
        text: "If you are evaluating AI digitization vendors, ask them to run their pipeline against your actual drawings and give you output with confidence scores and provenance. Then spot-check their high-confidence output by hand. How often the high-confidence features are wrong tells you more about the vendor's calibration than any benchmark they show you from their own test sets.",
      },
    ],
  },
  {
    slug: "computer-vision-1970s-utility-map",
    title: "What computer vision can and cannot extract from a 1970s utility map",
    description:
      "A technical walkthrough of what modern vision models do well and where they fail on degraded, hand-drafted utility drawings.",
    date: "2026-04-24",
    author: "Beckett Devoe",
    readingTime: "9 min read",
    tags: ["computer vision", "AI", "drawings", "technical"],
    blocks: [
      {
        type: "p",
        text: "A 1970s utility map is a specific kind of challenge. It was hand drafted by someone who was good at drafting but not thinking about machine readability. The line weights were set by pen nib size, not by semantic importance. Annotations were placed for human readability, not for spatial association algorithms. The physical medium has aged in ways that add noise the drawing's original creator never intended.",
      },
      {
        type: "p",
        text: "Modern computer vision models are capable tools. They are not magic. Here is a precise accounting of what they can and cannot do on this material, and why.",
      },
      { type: "h2", text: "What works well" },
      { type: "h3", text: "Layout detection and region classification" },
      {
        type: "p",
        text: "Finding the title block, the legend, the north arrow, and the general body of the drawing works reliably even on degraded material. These are large, high contrast regions with consistent spatial relationships. A well-trained layout model finds them on the first pass on virtually every drawing.",
      },
      {
        type: "p",
        text: "This matters because it is the first step in every downstream task. If you can reliably identify the title block, you can target your OCR on it. If you can identify the legend, you can parse the symbology. Getting region classification right on old material is not glamorous, but it is where the useful work begins.",
      },
      { type: "h3", text: "Printed text in good condition" },
      {
        type: "p",
        text: "Leroy lettering and early drafting machines produced consistent, legible text that OCR handles well when the source scan is clean. If the drawing was scanned at 400 DPI with good contrast, you can expect 95 percent or better accuracy on printed text of 10 point or larger from this era.",
      },
      { type: "h3", text: "Simple, well-separated linework" },
      {
        type: "p",
        text: "Utility mains drawn as single lines with clear separation from annotation layers are detectable by modern scene text and line detection models. On drawings where the pipe linework is in a distinct ink color or weight from annotation leaders and dimension lines, detection rates are high and false positive rates are manageable.",
      },
      { type: "h2", text: "What works with limitations" },
      { type: "h3", text: "Symbol recognition" },
      {
        type: "p",
        text: "Standard ANSI utility symbols, valve boxes, hydrant indicators, manhole circles, are recognizable by models trained on sufficient examples. The problem is that 1970s drawings used a range of drafting conventions that were not standardized across municipalities, contractors, or engineers. A valve might be shown as a butterfly, a circle, a square, or a custom symbol that existed only in one city's drawing standards.",
      },
      {
        type: "p",
        text: "Handling this requires either a model trained on the specific conventions of the archive you are processing, or a human review step for symbol classification. The former is the better long-term investment if you have consistent conventions across a large archive. The latter is correct for diverse archives where training data per convention is thin.",
      },
      { type: "h3", text: "Small text and dimension annotation" },
      {
        type: "p",
        text: "Pipe sizes and materials are often annotated in 6 to 8 point text on a dense plan. At 400 DPI, those characters are 10 to 15 pixels tall. Recognition accuracy drops significantly below 10 pixels and becomes unreliable below 8. For most 1970s plans at standard scale, this means that the smallest annotation text requires either a higher resolution scan or human transcription.",
      },
      { type: "h3", text: "Feature attribute association" },
      {
        type: "p",
        text: "Connecting a detected text label to the feature it describes requires understanding the drawing convention for how labels are positioned relative to features. On a 1970s drawing, that convention was rarely stated anywhere. It was understood by anyone who read drawings of that era. The model has to learn it from examples.",
      },
      {
        type: "p",
        text: "This works reasonably well when the association distance is short and unambiguous: a pipe size annotated directly on the centerline of the pipe it describes, for example. It fails when leaders cross each other, when multiple features are in proximity with multiple nearby labels, and when the annotation style changes across the drawing.",
      },
      { type: "h2", text: "What does not work well" },
      { type: "h3", text: "Handwriting" },
      {
        type: "p",
        text: "1970s drawings often have handwritten revision marks, site notes, and field additions. Modern handwriting recognition has improved dramatically, but it fails on the specific style of technical handwriting common in engineering drawings of this era: all caps, fast, using abbreviations specific to the discipline. Accuracy is typically in the 50 to 70 percent range on this content. Use it to locate handwritten regions and flag them for human review. Do not use it as a production attribute source.",
      },
      { type: "h3", text: "Degraded or overlapping linework" },
      {
        type: "p",
        text: "Drawings that have been stored folded accumulate crease artifacts that look like lines to a detector. Drawings with water damage or foxing have areas of high contrast noise. Drawings with pencil redlines on top of ink originals have two drawing conventions overlaid. These conditions, individually manageable, together create detection environments where false positive rates become unacceptable without careful post-processing.",
      },
      { type: "h3", text: "Multi-utility drawings" },
      {
        type: "p",
        text: "Some 1970s utility plans show multiple utility types on the same sheet with different line styles. Distinguishing a water main from a sewer force main from an electrical duct bank when they are drawn in similar weights with only a line pattern or a callout differentiating them is a hard problem. It requires a model that understands both the geometric context and the legend simultaneously. Current models handle this inconsistently and require high human review rates.",
      },
      { type: "h2", text: "A realistic production setup" },
      {
        type: "p",
        text: "For a large archive of 1970s utility drawings, a realistic production setup uses CV for what it does well: layout detection, title block extraction, printed text OCR, and primary utility line detection on clean sheets. It routes everything else to human review: small text, handwriting, dense multi-utility sheets, and degraded material. The model's role is to reduce human workload, not eliminate it. The expectation that it will eliminate it is how projects go wrong.",
      },
    ],
  },
  {
    slug: "landex-vs-manual-cad-digitization",
    title: "Landex vs. manual CAD digitization services: what to consider",
    description:
      "A straight comparison of AI-assisted digitization against traditional manual services, covering cost, accuracy, speed, and fit for different archive types.",
    date: "2026-04-25",
    author: "Beckett Devoe",
    readingTime: "7 min read",
    tags: ["Landex", "comparison", "digitization", "CAD"],
    blocks: [
      {
        type: "p",
        text: "When an organization is considering digitizing a utility archive, the two main paths are a traditional manual CAD digitization service or an AI-assisted approach. I am going to give you a direct comparison, including the cases where the traditional approach wins, because the right answer depends on your specific situation.",
      },
      { type: "h2", text: "How traditional manual services work" },
      {
        type: "p",
        text: "Traditional CAD digitization services assign trained technicians to trace source drawings manually. A technician loads a scanned or PDF drawing as a reference and redraws the features in CAD or GIS, layer by layer. Attributes are assigned from drawing annotations. The work is labor intensive, typically done offshore at lower hourly rates, and has a well-understood quality profile: accuracy depends directly on technician skill and QA rigor.",
      },
      {
        type: "p",
        text: "At scale, traditional services can process hundreds of sheets per week with adequate staffing. The main limitations are cost per sheet for high quality work, the challenge of managing consistency across large teams, and the difficulty of extracting structured attributes from complex annotation schemes.",
      },
      { type: "h2", text: "How AI-assisted digitization works" },
      {
        type: "p",
        text: "AI-assisted digitization uses computer vision and OCR models to detect features and extract text from scanned drawings. The model produces a draft extraction that a human reviewer validates, corrects, and supplements. The human does not trace from scratch. They review model output and make targeted corrections.",
      },
      {
        type: "p",
        text: "The economic case rests on the ratio between the time to review model output versus the time to produce it manually. On well-suited material, that ratio is 1:3 to 1:5. On poorly suited material, it can compress to 1:1 or worse, at which point the speed advantage disappears.",
      },
      { type: "h2", text: "Cost comparison" },
      {
        type: "p",
        text: "For a straightforward modern utility archive, roughly 1,000 sheets of consistent CAD plots with clear linework and standard symbology:",
      },
      {
        type: "ul",
        items: [
          "Traditional manual service (offshore, mid quality): $150 to $250 per sheet. $150,000 to $250,000 total.",
          "Traditional manual service (domestic, high quality): $300 to $500 per sheet. $300,000 to $500,000 total.",
          "AI-assisted with human review: $75 to $150 per sheet. $75,000 to $150,000 total.",
        ],
      },
      {
        type: "p",
        text: "For a complex historical archive with diverse drawing types, variable quality, and significant handwritten annotation:",
      },
      {
        type: "ul",
        items: [
          "Traditional manual service: $400 to $700 per sheet. $400,000 to $700,000 for 1,000 sheets.",
          "AI-assisted with human review: $200 to $400 per sheet, depending on review burden. The AI advantage shrinks on difficult material.",
        ],
      },
      { type: "h2", text: "Accuracy comparison" },
      {
        type: "p",
        text: "On modern, consistent drawings: manual and AI-assisted produce comparable geometric accuracy in the 0.5 to 1.5 meter range. The difference is in attribute completeness. A skilled manual technician catches nuance in annotations that an OCR model misses. For most use cases, the difference is not decision relevant.",
      },
      {
        type: "p",
        text: "On complex historical drawings: manual digitizing by experienced technicians produces higher accuracy and lower miss rates. The gap is real and matters for high stakes assets.",
      },
      { type: "h2", text: "Speed comparison" },
      {
        type: "p",
        text: "Traditional services: 2 to 6 weeks for initial sample and QA, then production throughput of 200 to 500 sheets per week depending on staffing. Time to complete 1,000 sheets: 4 to 8 weeks after onboarding.",
      },
      {
        type: "p",
        text: "AI-assisted: first pass extraction is near-instant. Human review bottleneck sets production throughput at 100 to 300 reviewed sheets per week. Time to complete 1,000 sheets: 4 to 10 weeks depending on review complexity. The speed advantage is in cost per sheet, not necessarily in calendar time.",
      },
      { type: "h2", text: "When to choose which" },
      {
        type: "p",
        text: "Choose traditional manual digitization when:",
      },
      {
        type: "ul",
        items: [
          "The archive is small, under 200 sheets, where setup overhead outweighs AI cost savings.",
          "The source material is consistently difficult: historical drawings with significant degradation or unusual conventions where model performance is uncertain.",
          "Maximum accuracy is required for a safety-critical asset class and budget allows premium manual work.",
          "The drawing style is rare enough that no AI service will have adequate training data for your format.",
        ],
      },
      {
        type: "p",
        text: "Choose AI-assisted digitization when:",
      },
      {
        type: "ul",
        items: [
          "The archive has more than 300 sheets and consistent enough drawing types to benefit from model efficiency.",
          "Cost efficiency is important and the accuracy requirements are planning grade rather than survey grade.",
          "The archive includes recent CAD-produced drawings that are well-suited to automated extraction.",
          "You want ongoing extraction capability for new as-built submissions, not just a one-time project.",
        ],
      },
      { type: "h2", text: "What Landex does" },
      {
        type: "p",
        text: "Landex runs an AI-assisted pipeline with human-in-the-loop review. We process everything through extraction first, route flagged features and low confidence regions to reviewers, and deliver structured GIS data with confidence metadata. We are well suited to mid-to-large archives with a mix of modern and historical material, and to organizations that want extraction capability built into their as-built submission process going forward.",
      },
      {
        type: "p",
        text: "We will also tell you when we think a traditional manual service is a better fit for your specific material. If your archive is 100 sheets of unusual pre-1950 drawings with heavy handwriting, you will get better results from a specialized manual service than from us. We would rather say that than take on a project and deliver something you cannot use.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

