export const CATEGORIES = ['All', 'Professional', 'Academic', 'Research'];

export const PROJECTS = [
  {
    id: 'grantlibrary', title: 'Ulysses S. Grant Presidential Library', category: 'Professional', tagColor: 'terracotta',
    role: 'Urban Designer — CPLA Design+Planning',
    description: 'A campus improvement project for the presidential library at Mississippi State University, reworking the lakefront edge with a civic promenade, cannon overlooks, and night lighting that ties the library to the surrounding green.',
    ratio: '16/9', span: 'span 2', image: 'assets/img/grantlibrary/01-lake-night.jpg',
    gallery: [
      { image: 'assets/img/grantlibrary/01-lake-night.jpg', caption: '01 Lake View, Night' },
      { image: 'assets/img/grantlibrary/02-lake-day.jpg', caption: '02 Lake View, Day' },
      { image: 'assets/img/grantlibrary/03-bunker-walkway.jpg', caption: '03 Bunker Walkway View' },
      { image: 'assets/img/grantlibrary/04-cannon-overlook.jpg', caption: '04 Cannon Overlook' },
      { image: 'assets/img/grantlibrary/05-bunker-walkway-night.jpg', caption: '05 Bunker Walkway, Night' }
    ],
    lat: 33.455, lng: -88.795
  },
  {
    id: 'madelon', title: 'Hotel Madelon', category: 'Professional', tagColor: 'terracotta',
    role: 'Urban Designer — CPLA Design+Planning',
    description: 'A mixed-use hotel and cultural landmark anchoring its district, with a central courtyard and pavilion structures framing shared gathering space between the hotel wings and the street.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/madelon/01-street-view.jpg',
    gallery: [
      { image: 'assets/img/madelon/01-street-view.jpg', caption: '01 Street View' },
      { image: 'assets/img/madelon/02-pavilion-a-courtyard.jpg', caption: '02 Pavilion Concept A Courtyard' },
      { image: 'assets/img/madelon/03-pavilion-a-plans.jpg', caption: '03 Pavilion Concept A Plans' },
      { image: 'assets/img/madelon/04-pavilion-b-courtyard.jpg', caption: '04 Pavilion Concept B Courtyard' },
      { image: 'assets/img/madelon/05-pavilion-b-plans.jpg', caption: '05 Pavilion Concept B Plans' }
    ],
    lat: 32.10, lng: -90.00
  },
  {
    id: 'hardyroad', title: 'Hardy Street Transformation', category: 'Professional', tagColor: 'terracotta',
    role: 'Urban Designer — CPLA Design+Planning',
    description: 'A streetscape improvement project along Hardy Street at Mississippi State University, converting the corridor to bus, bike, and pedestrian-only access through the heart of campus with new tree canopy, lighting, and gathering nodes.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/hardyroad/01-aerial-perspective.jpg',
    gallery: [
      { image: 'assets/img/hardyroad/01-aerial-perspective.jpg', caption: '01 Aerial Perspective' },
      { image: 'assets/img/hardyroad/02-corridor-axonometric.jpg', caption: '02 Corridor Axonometric' },
      { image: 'assets/img/hardyroad/03-corridor-plan.jpg', caption: '03 Corridor Plan' },
      { image: 'assets/img/hardyroad/04-campus-aerial-existing.jpg', caption: '04 Campus Aerial, Existing' },
      { image: 'assets/img/hardyroad/05-campus-aerial-proposed.jpg', caption: '05 Campus Aerial, Proposed' }
    ],
    lat: 33.470, lng: -88.800
  },
  {
    id: 'livingfree', title: 'Living Free Ministries', category: 'Professional', tagColor: 'terracotta',
    role: 'Freelance Project Manager',
    description: 'A recovery center for men overcoming addiction, in Corinth, Mississippi, organizing housing, worship, and shared outdoor space around a central great lawn to support daily community life.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/livingfree/01-mission-board.jpg',
    gallery: [
      { image: 'assets/img/livingfree/01-mission-board.jpg', caption: '01 Mission Board' },
      { image: 'assets/img/livingfree/02-entry-site-board.jpg', caption: '02 Entry and Site Board' }
    ],
    lat: 34.95, lng: -88.55
  },
  {
    id: 'tcg', title: 'Turner Creek Gardens', category: 'Academic', tagColor: 'sage',
    role: 'Designer — Graduate Studio Proposal, Mississippi State University',
    description: 'A park and greenway proposal for Corinth, Mississippi, including trails, streetscapes, and a wetlands filtration strategy grounded in the region’s rail heritage.',
    ratio: '16/9', span: 'span 2', image: 'assets/img/tcg/01-cover.jpg',
    thesis: 'How does Corinth position itself as the regional hub for northeast Mississippi and southwest Tennessee?',
    legend: [
      { color: 'sage', label: 'Multi-Modal Greenway' },
      { color: 'ochre', label: 'Connecting Bike Path' },
      { color: 'blue', label: 'Potential Blue-way Trail' }
    ],
    gallery: [
      { image: 'assets/img/tcg/01-cover.jpg', caption: '01 Cover' },
      { image: 'assets/img/tcg/02-trails.jpg', caption: '02 Trails' },
      { image: 'assets/img/tcg/03-plan.jpg', caption: '03 Plan' },
      { image: 'assets/img/tcg/04-renders.jpg', caption: '04 Renders' }
    ],
    lat: 34.9337, lng: -88.5225
  },
  {
    id: 'tod', title: 'T.O.D.', category: 'Academic', tagColor: 'sage',
    role: 'Designer — Graduate Studio Proposal, Mississippi State University',
    description: 'A transit-oriented development proposal for a growing Mississippi corridor, reworking a rail-adjacent block into a walkable mixed-use district anchored by a public plaza and viaduct connection.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/tod/01-aerial-axonometric.jpg',
    gallery: [
      { image: 'assets/img/tod/01-aerial-axonometric.jpg', caption: '01 Aerial Axonometric' },
      { image: 'assets/img/tod/02-streetscape-axonometric.jpg', caption: '02 Streetscape Axonometric' },
      { image: 'assets/img/tod/03-plan-elevation-sketch.jpg', caption: '03 Plan and Elevation Sketch' },
      { image: 'assets/img/tod/04-building-section-studies.jpg', caption: '04 Building Section Studies' }
    ],
    lat: 32.75, lng: -89.95
  },
  {
    id: 'mscity', title: 'MS City Redevelopment', category: 'Academic', tagColor: 'sage',
    role: 'Designer — Graduate Studio Proposal, Mississippi State University',
    description: 'A redevelopment proposal for a city on the Mississippi Gulf Coast, reconnecting a historic downtown to its waterfront through a new town plaza, amphitheater, and fishing dock.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/mscity/01-site-plan.jpg',
    gallery: [
      { image: 'assets/img/mscity/01-site-plan.jpg', caption: '01 Site Plan' },
      { image: 'assets/img/mscity/02-master-plan-board.jpg', caption: '02 Master Plan Board' }
    ],
    lat: 30.3960, lng: -88.8853
  },
  {
    id: 'mckee', title: 'McKee Park', category: 'Academic', tagColor: 'sage',
    role: 'Designer — Academic Proposal, Mississippi State University',
    description: 'A park redesign proposal for Starkville, Mississippi, introducing a golf green, sports field, and pond-edge trail to an underused municipal parcel.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/mckee/01-detail-section.jpg',
    gallery: [
      { image: 'assets/img/mckee/01-detail-section.jpg', caption: '01 Detail Section' },
      { image: 'assets/img/mckee/02-site-plan.jpg', caption: '02 Site Plan' }
    ],
    lat: 33.65, lng: -89.05
  },
  {
    id: 'marina', title: 'Marina Point', category: 'Research', tagColor: 'blue',
    role: 'Researcher — Gulf Coast Community Design Studio, Mississippi State University',
    description: 'A research proposal examining marina redevelopment along the Mississippi Gulf Coast, testing structure, circulation, and resilient building systems for a mixed-use building on pilings.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/marina/01-elevated-walkway.jpg',
    gallery: [
      { image: 'assets/img/marina/01-elevated-walkway.jpg', caption: '01 Elevated walkway' },
      { image: 'assets/img/marina/02-plan-serial-section.jpg', caption: '02 Site plan & serial section' },
      { image: 'assets/img/marina/03-structure-circulation.jpg', caption: '03 Structure & circulation' },
      { image: 'assets/img/marina/04-occupancy-layers.jpg', caption: '04 Occupancy, ADA & building layers' },
      { image: 'assets/img/marina/05-elevations.jpg', caption: '05 Elevations' },
      { image: 'assets/img/marina/06-hvac-carbon.jpg', caption: '06 HVAC & embodied carbon' },
      { image: 'assets/img/marina/07-landscape-bmp.jpg', caption: '07 Landscape BMPs' }
    ],
    lat: 30.65, lng: -89.20
  },
  {
    id: 'uav', title: 'Tool We Use', category: 'Research', tagColor: 'blue',
    role: 'Author — MLA Thesis, Dept. of Landscape Architecture, Mississippi State University',
    description: 'Published research on UAV applications in landscape architecture, in MDPI, comparing UAV and photogrammetry workflows against traditional survey methods for early-stage site documentation at small firms.',
    ratio: '4/3', span: 'span 1', image: 'assets/img/uav/01-thesis-title.jpg',
    gallery: [
      { image: 'assets/img/uav/01-thesis-title.jpg', caption: '01 Thesis defense title' },
      { image: 'assets/img/uav/02-data-source-comparison.png', caption: '02 Data-source comparison' },
      { image: 'assets/img/uav/03-precision-by-source.png', caption: '03 Precision by data source' },
      { image: 'assets/img/uav/04-precision-vs-barriers.png', caption: '04 Precision vs. barriers to entry' },
      { image: 'assets/img/uav/05-barriers-by-method.png', caption: '05 Barriers to entry by method' },
      { image: 'assets/img/uav/06-imagery-comparison.jpg', caption: '06 Imagery comparison over time' }
    ],
    lat: 33.25, lng: -88.60
  },
  {
    id: 'jlr', title: 'JLR — Jackson Light Rail', category: 'Research', tagColor: 'blue',
    role: 'Designer — Academic Research Proposal, Mississippi State University',
    description: 'A transit-oriented development proposal built around a light rail line proposed for Jackson, Mississippi, imagining a station typology that connects the urban core to its surrounding neighborhoods.',
    ratio: '16/9', span: 'span 2', image: 'assets/img/jlr/01-station-facade.jpg',
    gallery: [
      { image: 'assets/img/jlr/01-station-facade.jpg', caption: '01 Station facade study' },
      { image: 'assets/img/jlr/02-transit-line-map.jpg', caption: '02 Transit line map' },
      { image: 'assets/img/jlr/03-serial-section.jpg', caption: '03 Serial section' },
      { image: 'assets/img/jlr/04-elevations.jpg', caption: '04 Elevations' },
      { image: 'assets/img/jlr/05-viaduct-connection.jpg', caption: '05 Viaduct connection' },
      { image: 'assets/img/jlr/06-building-layers.jpg', caption: '06 Building layers' }
    ],
    lat: 32.2988, lng: -90.1848
  }
];
