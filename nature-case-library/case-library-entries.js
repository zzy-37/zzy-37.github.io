const case_library = {
    indices: {},

    technologies: [
        'ai',
        'augmented reality',
        'biomedia',
        'biotech',
        'coding',
        'data',
        'digital fabrication',
        'fabrication',
        'sampling',
        'sensors',
        'sound',
        'virtual reality',
    ],

    nature_topics: [
        'animals',
        'environment',
        'material',
        'micro-organisms',
        'more-than-human',
        'plants',
        'resource',
        'sound',
        'multi-species',
        'synthetic biology',
        'utilization',
    ],

    flags: [
        'urban context',
        'citizen science',
    ],

    implementations: [
        'complete',
        'prototype',
        'speculative',
    ],
}

{
    let iota = 0
    case_library.indices.name = iota++
    case_library.indices.place = iota++
    case_library.indices.author = iota++
    case_library.indices.year = iota++
    case_library.indices.link = iota++
    case_library.indices.description = iota++
    case_library.indices.implementation = iota++
    case_library.indices.nature_topics = iota++
    case_library.indices.technologies = iota++
    case_library.indices.flags = iota++
    case_library.indices.other_keywords = iota++
    case_library.field_count = iota
    iota = 0
}

const case_library_field_index = field_name => [
    'name', 'place', 'author', 'year', 'link', 'description', 'implementation',
    'nature topic', 'technology', 'flag', 'keyword',
].findIndex(value => field_name === value)

const case_library_fields = {
    'technology': [
        'ai',
        'augmented reality',
        'biomedia',
        'biotech',
        'coding',
        'data',
        'digital fabrication',
        'fabrication',
        'sampling',
        'sensors',
        'sound',
        'virtual reality',
    ],

    'nature topic': [
        'animals',
        'environment',
        'material',
        'micro-organisms',
        'more-than-human',
        'plants',
        'resource',
        'sound',
        'multi-species',
        'synthetic biology',
        'utilization',
    ],

    'flag': [
        'urban context',
        'citizen science',
    ],

    'implementation': [
        'complete',
        'prototype',
        'speculative',
    ],
}

const apply_filter = (entry, field, value) =>
    (field === 'implementation' && entry[case_library_field_index(field)] === value) ||
    ((field === 'technology' || field === 'nature topic' || field === 'flag' || field === 'keyword') &&
        entry[case_library_field_index(field)].includes(value))

/*
    each entry in the case_library_entries variable is an array
    consists of these fields:
    [
        project_name,     // string
        place,            // string
        author,           // string
        year,             // string
        link,             // string
        description,      // string
        implemetation,    // string -- one of the value in case_library.implementations
        [nature_topics],  // array -- some values in case_library.nature_topics
        [technologies],   // array -- some values in case_library.technologies
        [flags],          // array -- some values in case_library.flags
        [other_keywords], // array -- some arbitrary keywords about the project
    ]
*/

const case_library_entries = [
    [
        "Popsicles of Pollution",
        "Taiwan",
        "Hung Yi-Chen, Guo Yi-hui and Cheng Yu-Ti",
        "2017",
        "https://www.theguardian.com/cities/gallery/2017/sep/01/popsicles-pollution-ice-lollies-taiwan-taipei-contaminated-waterways",
        "Students from New Taipei City collected samples from urban rivers, creeks and ports which they then froze in moulds and preserved in resin. 'We hope when more people see this they can change their lifestyles'.",
        "complete",
        [
            "material"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "five elements",
            "waterscape",
            "food",
            "pollution",
            "waste"
        ]
    ],
    [
        "Instructables Insect Hotel",
        "",
        "",
        "",
        "https://www.instructables.com/id/Emergent-Insect-Hotels/?utm_source=newsletter&utm_medium=email",
        "",
        "complete",
        [
            "animals"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "insect",
            "biodiversity",
            "conservation",
            "garden",
            "habitat",
            "bee",
            "spider"
        ]
    ],
    [
        "Pure Imagination",
        "Shanghai",
        "J Travis Russet",
        "2017",
        "http://archive.fabacademy.org/fabacademy2017/fablabshangai/students/190/final-project.html",
        "Fab Academy final project / (moss harvesting energy)",
        "prototype",
        [
            "material",
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [
            "citizen science"
        ],
        [
            "moss",
            "cell"
        ]
    ],
    [
        "Faito",
        "Madrid",
        "Pilar Caballero",
        "2018",
        "http://fab.academany.org/2018/labs/farmlabalgarve/students/pilar-caballero/FinalProject.html",
        "Fab Academy final project / (a diy kite that monitors air quality)",
        "prototype",
        [
            "environment"
        ],
        [
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [
            "citizen science"
        ],
        [
            "pollution",
            "air"
        ]
    ],
    [
        "Dirty Playground",
        "Rotterdam",
        "Manuel Steitzã€Coltrane McDowell and Serina Tarkhanian",
        "2021",
        "https://www.designacademy.nl/p/about-dae/news/dae-team-wins-bio-design-challenge-prize",
        "annual Bio Design Challenge awarded project /It's about Rewilding and bringing ecological succession back in the city, connection\r\n between multi-generational people and soil ground & gamification labour\r\n connected to nature.",
        "prototype",
        [],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "soil",
            "ecosystem",
            "rewild",
            "symbiosis"
        ]
    ],
    [
        "in love with the world",
        "tate modern",
        "anicka yi",
        "2021",
        "https://www.designboom.com/art/anicka-yi-tate-modern-hyundai-motor-london-floating-machines-aerobes-10-11-2021/",
        "an exhibition in tate modern / anicka yi transforms tate modern into a fragrant ecosystem of floating machines to\r\n propose a new type of industrial vision and speculates on the possibility of\r\n machines evolving into independent life forms. The machine can interact with\r\n environment & human beings as nature creatures.",
        "speculative",
        [
            "more-than-human",
            "multi-species"
        ],
        [
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "air",
            "mimicry"
        ]
    ],
    [
        "PAPILIO",
        "berlin",
        "tobias trÃ¼benabacher",
        "2021",
        "https://www.designboom.com/design/papilio-wind-powered-street-light-tobias-trubenabacher-05-17-2021/",
        "graduation project at the university of the arts in berlin",
        "complete",
        [],
        [
            "fabrication",
            "sensors"
        ],
        [
            "urban context"
        ],
        [
            "footprint",
            "wind",
            "light"
        ]
    ],
    [
        "IKARUS",
        "berlin",
        "tobias trÃ¼benabacher",
        "2021",
        "http://tobiastruebenbacher.com/ux-portfolio/ikarus/",
        "Personal project",
        "complete",
        [],
        [
            "digital fabrication",
            "fabrication"
        ],
        [],
        [
            "light",
            "bionic"
        ]
    ],
    [
        "circular artwork",
        "Ohio",
        "John Sabraw",
        "2019/2017",
        "https://www.johnsabraw.com/studio",
        "",
        "complete",
        [],
        [
            "fabrication",
            "sampling"
        ],
        [],
        [
            "waterscape",
            "pollution",
            "paintings",
            "pigment",
            "color",
            "landscape"
        ]
    ],
    [
        "inkware(nature pigment creator)",
        "Wellington, New Zealand",
        "Tahlia Conrad-Hinga",
        "2021",
        "https://www.behance.net/gallery/120247317/Inkware-Natural-Pigment-Creator",
        "",
        "complete",
        [
            "material",
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "pigment",
            "color"
        ]
    ],
    [
        "Daily Petri Dish",
        "San Francisco",
        "Klari Reis",
        "2013~2021",
        "https://honestlywtf.com/art/daily-petri-dish/",
        "art within the confines of plexiglass petri dishes",
        "complete",
        [
            "material"
        ],
        [
            "data",
            "fabrication"
        ],
        [],
        [
            "paintings",
            "pigment",
            "color"
        ]
    ],
    [
        "#CarbonFeed",
        "Initial installation at the University of Virginia",
        "Jon Bellona and John Park",
        "2014",
        "https://carbonfeed.org/",
        "data visualization",
        "speculative",
        [
            "sound"
        ],
        [
            "coding",
            "data",
            "digital fabrication",
            "fabrication",
            "sensors",
            "sound"
        ],
        [],
        [
            "footprint",
            "social media",
            "virtuality",
            "carbon"
        ]
    ],
    [
        "inaho",
        "uk",
        "Tangent",
        "2013",
        "https://www.designboom.com/design/inaho-interactive-robotic-light-lexus-design-award-2013/",
        "installation",
        "complete",
        [
            "more-than-human"
        ],
        [
            "coding",
            "data",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "light",
            "landscape",
            "Bionic",
            "temperature",
            "ant",
            "sea",
            "moon",
            "biorhythm",
            "cloud",
            "desert",
            "degrading",
            "climate change",
            "co2",
            "regenerate",
            "deep sea",
            "grass",
            "root",
            "bacteria",
            "hygenine",
            "weather",
            "agriculture"
        ]
    ],
    [
        "communifeet",
        "japan",
        "Taku",
        "2014",
        "https://www.designboom.com/project/communifeet/",
        "concept",
        "prototype",
        [
            "more-than-human"
        ],
        [
            "coding",
            "data",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "five elements"
        ]
    ],
    [
        "airpiano",
        "data 404",
        "omer yosha",
        "",
        "https://www.designboom.com/technology/omer-yosha-airpiano-at-dmy-berlin-design-festival-09/",
        "",
        "complete",
        [
            "sound",
            "utilization"
        ],
        [
            "coding",
            "data",
            "digital fabrication",
            "fabrication",
            "sensors",
            "sound"
        ],
        [],
        [
            "air"
        ]
    ],
    [
        "arduino ant farm",
        "",
        "adam franchino",
        "",
        "https://www.designboom.com/art/adam-franchino-arduino-ant-farm/",
        "",
        "speculative",
        [
            "animals",
            "sound"
        ],
        [
            "coding",
            "data",
            "fabrication",
            "sensors",
            "sound"
        ],
        [],
        [
            "waterscape",
            "insect"
        ]
    ],
    [
        "wind-responsive color lights",
        "",
        "GwaGwa",
        "",
        "https://www.designboom.com/art/gwagwa-colors-of-the-windway-japanese-waterfront-wind-responsive-color-lights-12-02-2014/",
        "",
        "complete",
        [
            "utilization"
        ],
        [
            "data",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [
            "urban context"
        ],
        [
            "waterscape",
            "food",
            "wind",
            "light"
        ]
    ],
    [
        "man made moon",
        "UK",
        "Sam Jacob",
        "2012",
        "https://www.dezeen.com/2012/11/17/man-made-moon-by-sam-jacob/",
        "concept art",
        "complete",
        [],
        [
            "data",
            "digital fabrication",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "pollution",
            "waste"
        ]
    ],
    [
        "human-cloud",
        "",
        "Filips StaÅ†islavskis",
        "2021",
        "https://www.dezeen.com/2021/10/21/human-cloud-project-filips-stanislavskis-geoengineering/",
        "Eindhoven graduation project",
        "speculative",
        [],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "insect",
            "air"
        ]
    ],
    [
        "tumbleweed desert",
        "israel",
        "Shlomi Mir",
        "",
        "https://www.designboom.com/project/tumbleweed-desert/",
        "",
        "prototype",
        [],
        [
            "data",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "biodiversity",
            "conservation",
            "rewild",
            "wind"
        ]
    ],
    [
        "Natural Capital",
        "Milan, Italy",
        "Carlo Ratti in collaboration with ENI",
        "2021",
        "https://www.dezeen.com/2021/09/15/carlo-ratti-associati-partners-oil-company-milan-design-week-2021/",
        "installation for milan design week 2021",
        "complete",
        [
            "plants",
            "multi-species"
        ],
        [
            "data",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "garden",
            "habitat",
            "air",
            "carbon"
        ]
    ],
    [
        "Data Sonification Archive",
        "Northeastern University, College of Arts, Media & Design",
        "Lenzi S., Ciuccarelli P., Liu H., Hua Y.",
        "2020",
        "https://sonification.design/",
        "web-repository of projects related to data sonification world",
        "complete",
        [
            "environment",
            "resource",
            "sound"
        ],
        [
            "data",
            "sampling",
            "sensors",
            "sound"
        ],
        [],
        []
    ],
    [
        "The book of life",
        "Moleskine Foundation",
        "Lupi Giorgia",
        "2022",
        "http://giorgialupi.com/moleskine-foundation",
        "artistic book created for Moleskine Foundation",
        "complete",
        [],
        [
            "fabrication"
        ],
        [],
        [
            "bee"
        ]
    ],
    [
        "The deep sea",
        "",
        "Agarwal Neal",
        "2022",
        "https://neal.fun/deep-sea/",
        "interactive website",
        "complete",
        [
            "multi-species"
        ],
        [
            "data",
            "digital fabrication"
        ],
        [],
        [
            "food",
            "spider"
        ]
    ],
    [
        "Interwoven",
        "Amsterdam",
        "Diana Scherer",
        "since2016",
        "https://dianascherer.nl",
        "Diana Scherer trains the roots of plants to grow in intricate structures, creating a 3D textile. When the roots are fully grown, she removes them from the soil and cuts off the plant stems. The pieces produced are not yet suitable to be worn, but hint at a potential, more sustainable future in which we grow our own fashion in the ground.",
        "complete",
        [
            "resource",
            "multi-species",
            "utilization"
        ],
        [
            "biomedia",
            "coding",
            "digital fabrication",
            "fabrication"
        ],
        [],
        [
            "moss",
            "cell"
        ]
    ],
    [
        "PlantFiction",
        "London",
        "Torika",
        "2011",
        "http://troika.uk.com/wp-content/uploads/2015/07/catalogue-3.pdf",
        "The title, 'Plant Fiction' layers facts, fiction, myth, history, radical thinking and researches our present-day relation- ship with nature and culture, green and the city. Five sce- narios, each formed around a fictitious plant species are placed on location in a London of the near-future. Each kind is utilized to improve a familiar man-made condi- tion. In these near-future scenarios Troika imagined plants that would self-decompose in gain of biofuels, plants that excrete unique pigments to be implemented in security devices, creepers that can sense air-borne viruses and plants that reclaim gold from electronic circuits found in landfills, thus evoking prospective scenarios while uncover- ing our often short-sighted and utilitarian view on nature and mankind's relationship to it.\nPlant Fiction was purchased for the permanent col- lections of he Art Institute of Chicago and the Israel Museum, Jerusalem.",
        "speculative",
        [
            "resource",
            "multi-species"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "pollution",
            "biodiversity"
        ]
    ],
    [
        "The syntheic kindom: A Natural History of the Synthetic Future",
        "London",
        "Alexandar Daisy Ginsberg",
        "2009",
        "https://www.daisyginsberg.com/work/synthetic-kingdom",
        "The speculative future of synthetic biology",
        "speculative",
        [
            "multi-species",
            "synthetic biology"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "biodiversity"
        ]
    ],
    [
        "E.chromi",
        "London",
        "Alexandar Daisy Ginsberg, James King, 2009 Cambridge iGem team",
        "2009",
        "https://www.daisyginsberg.com/work/echromi-living-colour-from-bacteria",
        "The Scatalog imagines using it for cheap, personalised disease monitoring. Engineered bacteria, ingested in yoghurt, would colonise our gut, keeping watch for the chemical markers of diseases. If disease is detected, the bacteria produce an easy-to-read warning by colouring your poo. The Scatalog was made as a tool for critical discourse in synthetic biology and was first presented at iGEM in 2009.",
        "speculative",
        [
            "micro-organisms",
            "resource",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "waste",
            "air",
            "soil",
            "pigment",
            "color"
        ]
    ],
    [
        "The Supertask",
        "UK",
        "Alexandar Daisy Ginsberg, Sascha Pohflepp",
        "2011",
        "https://www.daisyginsberg.com/work/the-supertask",
        "Daily weather forecasts are the product of sophisticated, yet reductionist models of the climate, and result in a representation of reality: a number in degrees. Using mechanical climate control, we materialised the deviation between model and reality by simulating the temperature for that time and place, as predicted 24 hours earlier. The visitor could experience the computational model inside, and by stepping outside, feel any deviation from reality.",
        "complete",
        [
            "environment"
        ],
        [
            "fabrication",
            "sensors"
        ],
        [],
        [
            "five elements",
            "ecosystem"
        ]
    ],
    [
        "Growth Assembly",
        "London",
        "Alexandar Daisy Ginsberg, Sascha Pohflepp",
        "2009",
        "https://www.daisyginsberg.com/work/growth-assembly",
        "Synthetic biology enabled us to harness our natural environment for the production of things. Coded into the DNA of a plant, product parts grow within the supporting system of the plant's structure. When fully developed, they are stripped like a walnut from its shell or corn from its husk, ready for assembly.\nShops evolved into factory farms, with licensed products grown where sold. Large items take time to grow and are more expensive while small ones are more affordable. The postal service delivers lightweight seed-packets for domestic manufacturers.",
        "speculative",
        [
            "plants",
            "resource",
            "multi-species",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "rewild"
        ]
    ],
    [
        "Seasons of the Void",
        "Paris",
        "Alexandar Daisy Ginsberg, Sascha Pohflepp, Andrew Stellitano",
        "2013",
        "https://www.daisyginsberg.com/work/seasons-of-the-void",
        "Seasons of the Void imagines delicious fruits that are grown from redesigned yeast, gorging on electricity instead of sunlight. As the ship flies away from the Sun, electrosynthesis replaces photosynthesis. Here, farming would rely less on Earth's seasons than on magnetic fields thrown out by solar storms.",
        "speculative",
        [
            "multi-species",
            "synthetic biology"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "food",
            "outerspace",
            "electrosynthesis"
        ]
    ],
    [
        "Designing for the Sixth Extinction",
        "",
        "Alexandar Daisy Ginsberg",
        "2013-2015",
        "https://www.daisyginsberg.com/work/designing-for-the-sixth-extinction",
        "In this version of the future, novel companion species are designed by synthetic biologists to support endangered natural species and ecosystems. Financed by corporate biodiversity offset schemes, these patented species are released into the wild. They compensate for biodiversity lost due to monoculture farming of biomass for biofuel and chemical production. For a thriving bioeconomy, the preservation of natural biodiversity is worthwhile not just for sentimental reasons, it is also a valuable DNA library for future biological designs.\nModeled on fungus, bacteria, invertebrates and mammals, the fictional designed species are ecological machines that fill the void left by vanished organisms, or offer novel protection against more harmful invasive species, diseases and pollution.",
        "speculative",
        [
            "synthetic biology"
        ],
        [
            "biomedia",
            "biotech",
            "coding",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "biodiversity",
            "conservation",
            "rewild",
            "preservation",
            "extinction"
        ]
    ],
    [
        "Pollinator Pathmaker",
        "London",
        "Alexandar Daisy Ginsberg",
        "2021",
        "https://pollinator.art",
        "Simply follow the steps in the algorithmic toolbox to select your garden conditions and play with how the algorithm solves the problem of empathy. The algorithm choose and arrange from a curated palette of locally appropriate plants. Every garden it generates is different, but each is computed to support the maximum pollinator species possible.",
        "complete",
        [
            "plants"
        ],
        [
            "ai",
            "data"
        ],
        [
            "urban context",
            "citizen science"
        ],
        [
            "insect",
            "biodiversity",
            "garden",
            "customization",
            "pollinator",
            "flower"
        ]
    ],
    [
        "The Wilding of Mars",
        "UK",
        "Alexandar Daisy Ginsberg",
        "2019",
        "https://www.daisyginsberg.com/work/the-wilding-of-mars",
        "The Wilding of Mars simulates the growth of a planetary wilderness, seeded with Earth life forms -- plants, not human.",
        "complete",
        [
            "more-than-human",
            "plants"
        ],
        [
            "coding",
            "digital fabrication"
        ],
        [],
        [
            "colonisation",
            "planet",
            "indigenous life",
            "invasive species"
        ]
    ],
    [
        "The Substitute",
        "UK",
        "Alexandar Daisy Ginsberg",
        "2019",
        "https://www.daisyginsberg.com/work/the-substitute",
        "A northern white rhino is digitally brought back to life, informed by developments in the human creation of artificial intelligence (AI). Based on research from AI lab DeepMind, the rhino performs as an artificial agent, an autonomous entity that learns from its environment. A life-size projection, 5m wide, shows the artificial rhino roaming in a virtual world, becoming more â€œrealâ€ as it comprehends the limits of the space. As the artificial rhino habituates to its space, its form and sound toggle from pixelation to lifelikeâ€”reminding the viewer that this living, breathing rhino, coming to life without its natural context, is entirely artificial.",
        "complete",
        [
            "environment",
            "multi-species"
        ],
        [
            "ai",
            "digital fabrication",
            "virtual reality"
        ],
        [],
        [
            "habitat",
            "extinction",
            "rhino"
        ]
    ],
    [
        "Resurrecting the sublime",
        "UK",
        "Alexandar Daisy Ginsberg",
        "2019",
        "https://www.daisyginsberg.com/work/resurrecting-the-sublime",
        "Using genetic engineering to resurrect the smell of extinct flowersâ€”so that humans may again experience something we have destroyedâ€”is awesome and perhaps terrifying. This dizzying feeling evokes the sublime, an â€œexpression of the unknowableâ€, an aesthetic",
        "complete",
        [
            "plants",
            "multi-species"
        ],
        [
            "biotech",
            "digital fabrication",
            "sampling"
        ],
        [],
        [
            "extinction",
            "flower",
            "synthetic biology tech",
            "smell"
        ]
    ],
    [
        "Machine Auguries",
        "UK",
        "Alexandar Daisy Ginsberg",
        "2019",
        "https://www.daisyginsberg.com/work/machine-auguries",
        "In the installation, a natural dawn chorus is taken over by artificial birds, their calls generated using machine learning. Solo recordings of chiffchaffs, great tits, redstarts, robins, thrushes, and entire dawn choruses were used to train two neural networks, pitted against each other to sing (a Generative Adversarial Network, or GAN). Reflecting on how birds develop their song from each other, a call and response of real and artificial birds spatialise the evolution of a new language. Samples taken from each stage in the GAN's training revealing the artificial birds' growing lifelikeness.",
        "complete",
        [
            "sound",
            "multi-species"
        ],
        [
            "biotech",
            "digital fabrication",
            "sampling"
        ],
        [
            "urban context"
        ],
        [
            "synthetic biology tech",
            "bird"
        ]
    ],
    [
        "Outside/Inside",
        "",
        "Gaurav Wali",
        "2021",
        "https://www.gauravmkwali.com/outside-inside",
        "An unsusal holder of inventory made of pine needles",
        "complete",
        [
            "material",
            "plants",
            "utilization"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "pine"
        ]
    ],
    [
        "Augmented Grounds",
        "QuÃ©bec, Canada",
        "Soomeen Hahm (SoomeenHahm Design Ltd / SCI-Arc)\nYumi Lee (Seoul National University)\nJaeHeon Jung (KOH SX Studio Inc.)\nHanjun Kim (SoomeenHahm Design Ltd)",
        "2021",
        "https://dataidedesign.com/augmented-grounds-introducing-smart-construction-technology-using-augmented-reality/",
        "Using AR to build landscape",
        "complete",
        [],
        [
            "augmented reality",
            "digital fabrication"
        ],
        [
            "urban context"
        ],
        [
            "garden",
            "landscape"
        ]
    ],
    [
        "Rewild Clock",
        "Chester, England",
        "Jack Hardiker",
        "2022",
        "https://www.deeside.com/chesters-eastgate-clock-rewilded-using-augmented-reality/",
        "Using AR to show a rewilded urban scene",
        "complete",
        [
            "plants"
        ],
        [
            "augmented reality"
        ],
        [
            "urban context"
        ],
        [
            "rewild",
            "landscape"
        ]
    ],
    [
        "Tree Equity Score",
        "",
        "-",
        "-",
        "https://www.treeequityscore.org",
        "Collecting, analysing and disseminating data of urban tree distribution to build a tool to create Tree equity across USA",
        "complete",
        [
            "environment",
            "resource"
        ],
        [
            "data"
        ],
        [
            "urban context"
        ],
        [
            "tree equity",
            "tree",
            "natural benefit"
        ]
    ],
    [
        "Cultivating Frequencies",
        "California, USA",
        "Colin Honigman, ACCD faculty et al",
        "2014",
        "https://colinhonigman.com/Cultivating-Frequencies",
        "Cultivating Frequencies transforms a garden into an interactive and generative musical installation by analyzing data from the garden and translating them into musical components.",
        "complete",
        [
            "environment",
            "plants",
            "sound",
            "multi-species"
        ],
        [
            "coding",
            "data",
            "digital fabrication",
            "fabrication"
        ],
        [],
        [
            "five elements",
            "waste",
            "garden",
            "soil",
            "ecosystem",
            "symbiosis",
            "bionic",
            "interaction"
        ]
    ],
    [
        "Regional AlgaeFarm",
        "Simrishamn, Sweden",
        "Ecologic Studio",
        "2011",
        "https://www.ecologicstudio.com/projects/reg-algaefarm",
        "-the actual algae garden, the algae can be cultivated by the visitors by blowing co2 in the photo-bioreactor bags, observe the diverse colours as well as the different ecologies of micro or macro algae with magnifying lenses and finally interact via LED responsive memory system.- the regional co-action plan is presented via a map on the floor below the garden as well as a Touristic Map of the region presenting the master plan as well as the different type of algae and topographic region which is possible to find at the moment on the local landscape and the proposed prototype that could be develop from these resources.",
        "prototype",
        [
            "micro-organisms",
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "coding",
            "fabrication"
        ],
        [],
        [
            "waterscape",
            "food",
            "habitat",
            "rewild",
            "algae"
        ]
    ],
    [
        "Airbubble",
        "Warsaw, Poland",
        "Ecologic Studio",
        "2021",
        "https://www.ecologicstudio.com/projects/airbubble-playground-and-exhibition",
        "biotechnological playground to integrate air-purifying micro-algae.",
        "complete",
        [
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "pollution",
            "habitat",
            "air",
            "interaction",
            "algae",
            "playground(kids)"
        ]
    ],
    [
        "Deep Green | Urbansphere",
        "",
        "Ecologic Studio",
        "2021",
        "https://www.ecologicstudio.com/projects/deep-green-urbansphere-venice",
        "This project showcases ecoLogicStudio's recent work on the future of green urban planning, combining artificial intelligence with big data analysis. It also features a unique insight in the infrastructural logics of the Venetian canal system with a speculative AI video simulation, illustrating the accelerated evolution of the Venetian urban fabric over the course of the next 250 years.",
        "prototype",
        [
            "micro-organisms",
            "utilization"
        ],
        [
            "ai",
            "biomedia",
            "data"
        ],
        [
            "urban context"
        ],
        [
            "landscape",
            "urban planning",
            "slime mould"
        ]
    ],
    [
        "Otrivin Air Lab",
        "Lodon",
        "Ecologic Studio",
        "2022",
        "https://www.ecologicstudio.com/projects/otrivin-air-lab",
        "AIRlab is an urban laboratory for converting air pollution into products that help protect our breathing.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "resource",
            "multi-species",
            "utilization"
        ],
        [
            "biomedia",
            "coding",
            "data",
            "digital fabrication",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "food",
            "air",
            "rewild",
            "carbon",
            "algae",
            "circular economy",
            "fertilizer"
        ]
    ],
    [
        "GAN-Physarum / Deep Green",
        "Lodon",
        "Ecologic Studio",
        "2021/2022",
        "https://www.ecologicstudio.com/projects/gan-physarum-la-derive-numerique",
        "A trained machine learning algorithm that behaves like a living Slime Mould and depicts the future of a bio-digital autonomous Paris.\n/\nDeepGreen is a long-term project developed by ecoLogicStudio with UNDP (United Nations Development Programme) combining AI and big data analysis. The project aims at designing systemic cities that use their size and collective energy to offer refuge for both humans and displaced wildlife, that promote the emergence of positive microclimate, that replenish depleted water sources and that restore degraded terrains, pushing back on processes such as desertification, land erosion and contamination.",
        "prototype",
        [
            "micro-organisms",
            "utilization"
        ],
        [
            "ai",
            "biomedia",
            "biotech",
            "coding",
            "data",
            "sampling",
            "sensors"
        ],
        [
            "urban context"
        ],
        [
            "landscape",
            "urban planning",
            "slime mould",
            "machine learning"
        ]
    ],
    [
        "Rhapsody for an Expanded Biotechnological Apparatus",
        "NY, USA",
        "Laura Splan",
        "2022",
        "https://www.laurasplan.com/rhapsody-for-an-expanded-biotechnological-apparatus",
        "It is a tactile sound installation located in the elevator of the Tang Teaching Museum that connects hidden artifacts of science to familiar domains of the everyday. The installation reenvisions the elevator as a biological cell and its visitors as proteins as they are prompted to engage with a haptic textiles sculpture while listening to a sonic tour of a biotech laboratory.",
        "complete",
        [
            "more-than-human",
            "sound"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "cell"
        ]
    ],
    [
        "Joining Bottles",
        "London",
        "Micaella Pedros",
        "???",
        "https://www.micaellapedros.com/joiningbottles",
        "Joining Bottles is an experimental wood-joining technique using shrunk plastic bottles. \n\nBy heat, a simple plastic bottle is transformed into a wood bonding material offering a meaningful and accessible way to build functional structures.",
        "complete",
        [
            "material",
            "resource",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "waste",
            "plastic"
        ]
    ],
    [
        "OLFi",
        "Sweden",
        "CORNELIA HULLING, YANYI LU, ALEXANDER WIDUA",
        "2021",
        "https://www.biodesignchallenge.org/umea-institute-of-design-2021",
        "OLFi uses the sense of smell to remind users when their smart devices are present. Devices would emit a smell depending on its specific activity.",
        "speculative",
        [
            "micro-organisms",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "air",
            "smell"
        ]
    ],
    [
        "picNYC",
        "USA",
        "haiko cornelissen architecten",
        "2011",
        "https://www.designboom.com/design/haiko-cornelissen-architecten-picnyc/",
        " the grass surface of the furniture allows the urban resident to easily conduct an outdoor-feeling meal indoors. the surreal piece may be altered with the addition of small vegetables or herbs to fit the needs of the table owner as the shape and function of the work is informed by the recently popular cultural movement of urban farming.",
        "speculative",
        [
            "material",
            "plants",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "moss",
            "soil"
        ]
    ],
    [
        "Ecomorphs",
        "???",
        "Luxi Rong and Jianan Shi",
        "2022",
        "http://www.interactivearchitecture.org/lab-projects/ecomorphs",
        "Ecomorphs is an outdoor interactive installation made up of soft robots that are sensitive to their surrounding environment. The team modified 3D printer mechanisms to solder sheets of TPU sheets together into bespoke shapes that define the appearance and embodied performance of the soft robots. The installation utilises a variety of integrated sensing approaches that regulate air pressure inside the robot, detect human gestures, human visual attention, and observers movement around the work. This data is combined to choreograph the motion of the robots mysteriously living deep in a dark forest.",
        "prototype",
        [
            "more-than-human",
            "multi-species"
        ],
        [
            "coding",
            "digital fabrication",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "forest"
        ]
    ],
    [
        "Vital Morphons",
        "???",
        "Tung and Lynn Nie",
        "2020",
        "http://www.interactivearchitecture.org/lab-projects/vital-morphons",
        "the team questioned what a post-anthropocentric technology might look like, replacing robotics with the material Chitosan to create a kinetic and responsive installation.",
        "prototype",
        [
            "material",
            "more-than-human",
            "multi-species"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication",
            "sensors"
        ],
        [],
        []
    ],
    [
        "Networking Nature Lecture",
        "Venice",
        "Studio Mobile",
        "2012",
        "http://cargocollective.com/Studiomobile/Networking-Nature",
        "The ecosystem Networking Nature lives off seawater. Within a glass tank filled with salt water, some solar stills extract fresh water by exploiting the heat produced by small lamps. Seawater evaporates and the steam condenses into fresh water, which is collected in tanks and then supplied. However, water is not produced in isolated systems under central control. The new model provides for a large ecological infrastructure as well as small local production units connected to a network able to integrate the production of fresh water and to supply it where needed. It's a Smart Water Network controlled by sensors that read the local lack of water and, through an Arduino board, activate the pumps providing the water where there is a peak of demand. The Smart Water Network will be a layer of the ecological network as well as the Smart Power Grid and the communications network. This strategy not only gives response to the preservation of the environment, but it is also a radically new model that ensures free and democratic access to the resources to everybody.",
        "speculative",
        [
            "resource",
            "utilization"
        ],
        [
            "fabrication",
            "sensors"
        ],
        [
            "urban context"
        ],
        [
            "food",
            "moss",
            "ecosystem",
            "preservation",
            "urban farming",
            "installation"
        ]
    ],
    [
        "Jelly Barge",
        "???",
        "Studiomobile",
        "2015",
        "http://cargocollective.com/Studiomobile/Jellyfish-Barge-Expo-2015",
        "Jellyfish Barge is the floating modular greenhouse for urban agriculture that generates its own fresh water and energy, using only solar power. It is an affordable, transportable and replicable solution to grow food within the cities. The strength of its design lies in the concept of combining a food production facility with a vital public space, providing both areas for economic activities and for social interaction. Its multifunctional attitude allows citizens to enjoy a weekly marketplace, allows farmers who manage the structure to rely on a profitable business, and creates resilience and social innovation for the community. All these values augment the attraction, relevance and value of the installation area, acting as the engine of regeneration at a larger scale. Thus, Jellyfish Barge is also a business opportunity for the stakeholders of the building industry. Their involvement is strategic to set the process in motion and guarantees the economic sustainability of the project, in a way that combine the private gains of the market activity with benefits for the local community.",
        "prototype",
        [
            "resource",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "food",
            "rewild",
            "outerspace",
            "electrosynthesis",
            "city",
            "module",
            "public space",
            "identity",
            "sexuality",
            "panda",
            "politics",
            "ecology",
            "global warming",
            "drawing",
            "documentation",
            "rock",
            "stone",
            "sclupture",
            "art work",
            "aesthetic",
            "kombucha",
            "kelp",
            "fungi"
        ]
    ],
    [
        "A Dash of  Water/Walthamstow Marshes",
        "UK",
        "Queer Botany",
        "2022/2021",
        "https://www.queerbotany.com/projects",
        "educate people about diverse sextuality/identity with knowledge of botany, reconnecting people with natue.",
        "complete",
        [
            "plants",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "bee",
            "preservation",
            "extinction",
            "flower",
            "tree"
        ]
    ],
    [
        "The Panda Shop",
        "Dutch",
        "Astrid Birkedal",
        "2020",
        "https://www.designacademy.nl/p/study-at-dae/graduation-show/graduation-projects/astrid-birkedal",
        "visitors to the installation are confronted with a customer-like buying experience, in which they are encouraged to donate to one of China's giant pandas currently housed in international zoos. The buying process is experienced in six increasingly complicated stages, layering the hard 'sales pitch' of commerce over a revelatory exhibition narrative that exposes the realities of Panda Diplomacy.",
        "complete",
        [
            "animals",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "preservation",
            "extinction",
            "customization",
            "pollinator"
        ]
    ],
    [
        "Speculative Communications",
        "Mexico City",
        "Innterspecifics",
        "-",
        "http://interspecifics.cc/comunicacionesespeculativas/",
        "A machine that can observe and learn from a microorganism and uses the data arising from its behavioural patterns as a source of composition for an audio-visual score. This project is focused on the creation of an artificial intelligence that has the ability to identify repeated coordinated actions inside biological cultures.",
        "complete",
        [
            "micro-organisms",
            "sound"
        ],
        [
            "ai",
            "biomedia",
            "data",
            "sound"
        ],
        [],
        []
    ],
    [
        "iOracle",
        "-",
        "Mileece",
        "2018",
        "https://www.mileece.is/ioracle",
        "How do you create a language between human and plants?",
        "complete",
        [
            "plants",
            "sound"
        ],
        [
            "ai",
            "biomedia",
            "data",
            "sound"
        ],
        [],
        [
            "waste",
            "flower"
        ]
    ],
    [
        "Pips Plant Parlour",
        "-",
        "Mileece",
        "2018",
        "https://www.mileece.is/pipsplantparlour",
        "participants create unique quadrophonic organic electronic music in an immersive, luminal ,  bio-acoustic bath, all generated from their energetic interaction with plants;\na way to tune into nature, right from the center of the busy metropolis",
        "complete",
        [
            "plants",
            "sound"
        ],
        [
            "ai",
            "coding",
            "digital fabrication",
            "sensors",
            "sound"
        ],
        [
            "urban context"
        ],
        [
            "waste",
            "flower"
        ]
    ],
    [
        "Orbia",
        "",
        "Mileece",
        "2018",
        "https://www.mileece.is/orbia",
        "These innovative structures fuse biophilic urban living systems with state-of-the-art interactive immersive audio, imagery and kinetics, integrating functional ecologies within dense urban environments.  When not hosting immersive media content and events for AR, VR and XR, Orbia unites communities with remote ecologies to reignite our connection to nature and one another.",
        "complete",
        [
            "plants",
            "sound"
        ],
        [
            "ai",
            "coding",
            "digital fabrication",
            "sensors",
            "sound"
        ],
        [
            "urban context"
        ],
        [
            "waste",
            "flower"
        ]
    ],
    [
        "Mystery Bird",
        "UK",
        "Jack Hardiker",
        "2020",
        "https://jackhardiker.com/Mystery-Bird-AR",
        "Mystery Bird was born in Manchester, before taking flight around the world using Augmented Reality (AR). The project began in the wake of strict social distancing measures. Many of us experienced a renewed interest in our natural surroundings - discerning birdsong again at a time when the world was quietly held at a temporary standstill. Inspired by this, Quays Culture commissioned a group of four artists to create Mystery Bird, an experimental, travelling installation that involves projection, sound and AR.",
        "complete",
        [
            "environment",
            "sound"
        ],
        [
            "augmented reality",
            "digital fabrication",
            "sound"
        ],
        [
            "urban context"
        ],
        [
            "bird"
        ]
    ],
    [
        "A Vision for the Green Heart of Holland",
        "Holland",
        "The Harrison Studio",
        "1984",
        "https://theharrisonstudio.net/a-vision-for-the-green-heart-of-holland",
        " the Green Heart is now facing encroachment from without and development from within. Its value in 1994-5 was being debated, its identity questioned, its very existence threatened.\nIn responding to this situation the Harrison Studio constructed a series of images-part ceramic tile, part map, part drawing, part video and part discourse. They proposed a new vision for the Green Heart and the Randstad of Holland. In the proposal new boundary conditions emerged that would clarify the roles of the urban, the ecological and the farming communities which altogether comprise a major part of the landscape of Holland.",
        "complete",
        [],
        [
            "data",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "biodiversity",
            "habitat",
            "symbiosis",
            "landscape",
            "preservation",
            "urban planning"
        ]
    ],
    [
        "Greenhouse Britain",
        "UK",
        "The Harrison Studio",
        "2007-2009",
        "https://theharrisonstudio.net/greenhouse-britain-2007-2009",
        "The installation addresses Global Warming from an artist's perspective. The work proposes an alternative narrative about how people might withdraw as waters rise, what new forms of settlement might look life, and what content or properties a new landscape might have in response to the Global Warming phenomenon. It also demonstrates how a city might be defended.",
        "speculative",
        [
            "environment"
        ],
        [
            "data",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "waterscape",
            "food",
            "colonisation"
        ]
    ],
    [
        "Root System Drawings Archive",
        "Holland",
        "Wageningen University",
        "-",
        "https://images.wur.nl/digital/collection/coll13/search",
        "",
        "complete",
        [
            "plants",
            "resource",
            "multi-species"
        ],
        [
            "data"
        ],
        [],
        [
            "biodiversity",
            "moss",
            "cell",
            "planet",
            "indigenous life",
            "tree"
        ]
    ],
    [
        "Deep Time Walk APP",
        "-",
        "-",
        "-",
        "https://www.deeptimewalk.org",
        "Deep Time Walk is a transformative journey through 4.6bn years of Earth history via a 4.6km guided walk. It is an invitation to view the world differently, encouraging positive action and advocacy for a regenerative Earth.\nWe provide tools and resources to empower a global community of changemakers and volunteer facilitators. Our vision is to empower an ensemble of geographically specific and culturally nuanced Deep Time Walks, providing an intercultural story-telling platform that helps bring about a diverse, flourishing ecological civilisation.",
        "complete",
        [
            "environment"
        ],
        [
            "data"
        ],
        [],
        [
            "garden",
            "landscape",
            "planet",
            "invasive species",
            "rhino"
        ]
    ],
    [
        "Biota Beats",
        "USA",
        "EMW Street Bio",
        "-",
        "http://biotabeats.org/index.html",
        "A microbial record player, translating bacteria to sound",
        "complete",
        [
            "micro-organisms",
            "sound"
        ],
        [
            "biomedia",
            "biotech",
            "coding",
            "data",
            "digital fabrication",
            "fabrication",
            "sensors",
            "sound"
        ],
        [],
        [
            "air"
        ]
    ],
    [
        "Kombucha Sculptures",
        "-",
        "anicka yi",
        "2015",
        "https://www.anickayistudio.biz/artworks/middle-earth-medical",
        "-",
        "complete",
        [
            "material",
            "micro-organisms"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "synthetic biology tech",
            "smell",
            "bird",
            "pine"
        ]
    ],
    [
        "Kelp Sculptures",
        "",
        "anicka yi",
        "2019",
        "https://www.anickayistudio.biz/artworks/biologizing-the-machine-tentacular-trouble",
        "",
        "complete",
        [
            "material",
            "plants"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "light",
            "synthetic biology tech",
            "smell",
            "bird",
            "tree equity"
        ]
    ],
    [
        "Fruiting Bodies",
        "",
        "anicka yi",
        "2021",
        "https://www.anickayistudio.biz/artworks/all-islands-are-connected-underwater",
        "",
        "complete",
        [
            "material",
            "micro-organisms",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "flower",
            "synthetic biology tech",
            "smell",
            "bird"
        ]
    ],
    [
        "Anemone Panels",
        "",
        "anicka yi",
        "2019",
        "https://www.anickayistudio.biz/artworks/i-just-want-to-be-able-to-sleep-at-night",
        "",
        "complete",
        [
            "material",
            "micro-organisms",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "air",
            "synthetic biology tech",
            "smell",
            "bird",
            "tree"
        ]
    ],
    [
        "Tempura Fried Flowers",
        "",
        "anicka yi",
        "2011-",
        "https://www.anickayistudio.biz/artworks/the-year-1905",
        "",
        "complete",
        [
            "material",
            "plants"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "color",
            "flower",
            "synthetic biology tech",
            "smell",
            "bird"
        ]
    ],
    [
        "Bacteria Lightbox",
        "",
        "anicka yi",
        "",
        "https://www.anickayistudio.biz/artworks/death-grasp",
        "",
        "complete",
        [
            "material",
            "micro-organisms"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "air",
            "light",
            "pigment",
            "color",
            "synthetic biology tech",
            "smell",
            "bird",
            "tree"
        ]
    ],
    [
        "Chicken Skins",
        "",
        "anicka yi",
        "",
        "https://www.anickayistudio.biz/artworks/fish-toffee",
        "",
        "complete",
        [
            "material",
            "plants",
            "multi-species"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "color",
            "flower",
            "synthetic biology tech",
            "smell",
            "bird"
        ]
    ],
    [
        "Nests",
        "",
        "anicka yi",
        "",
        "https://www.anickayistudio.biz/artworks/escape-from-the-shade-1",
        "",
        "complete",
        [
            "material",
            "multi-species"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "bee",
            "light",
            "color",
            "pollinator",
            "synthetic biology tech",
            "smell",
            "bird",
            "beehive"
        ]
    ],
    [
        "Bacteria Cultures",
        "",
        "anicka yi",
        "2015",
        "https://www.anickayistudio.biz/artworks/grabbing-at-newer-vegetables",
        "",
        "complete",
        [
            "material",
            "micro-organisms"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "air",
            "light",
            "pigment",
            "color",
            "synthetic biology tech",
            "smell",
            "bird",
            "tree"
        ]
    ],
    [
        "Plants Play",
        "Italy",
        "Edo (CEO) & Kika",
        "",
        "https://plantsplay.com",
        "Plants Play is a wearable device that allows you to listen to the Music generated by Plants and Trees. Through two electrodes settled on the leaves, Plants Play converts electrical plant variations into musical notes, and send them by bluetooth on your smartphone.",
        "complete",
        [
            "plants",
            "sound",
            "multi-species"
        ],
        [
            "coding",
            "data",
            "fabrication",
            "sensors",
            "sound"
        ],
        [
            "citizen science"
        ],
        [
            "waste",
            "tree"
        ]
    ],
    [
        "Human Nature Paintings",
        "",
        "Susan Cohen Thompson",
        "",
        "https://thompsonartstudio.com/human-nature-paintings/",
        "",
        "complete",
        [
            "material",
            "more-than-human",
            "plants"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "paintings",
            "color",
            "tree"
        ]
    ],
    [
        "Adventures with a laser scanner",
        "",
        "Mathias Disney",
        "",
        "http://disneytls.blogspot.com\nhttp://disneytls.blogspot.com/2016/09/face-time.html",
        "Scanning Trees",
        "complete",
        [
            "environment"
        ],
        [
            "coding",
            "digital fabrication",
            "sampling",
            "sensors"
        ],
        [],
        [
            "biodiversity",
            "garden",
            "habitat",
            "air",
            "landscape",
            "tree",
            "forest",
            "tropical forest"
        ]
    ],
    [
        "Amazon FACE",
        "Brazil",
        "Brazilian Government",
        "",
        "https://amazonface.inpa.gov.br/en/program.php",
        "The central feature of the program is a field experiment of unprecedented scope that will expose an old-growth Amazon forest to the CO2 concentration of the future in an research station near Manaus, Brazil using Free-Air CO2 Enrichment (FACE) technology.",
        "complete",
        [
            "environment"
        ],
        [
            "coding",
            "data",
            "fabrication",
            "sampling",
            "sensors"
        ],
        [],
        [
            "biodiversity",
            "garden",
            "habitat",
            "air",
            "landscape",
            "tree",
            "forest",
            "tropical forest"
        ]
    ],
    [
        "GUARDIAN PLATFORM, AudioMoth, Arbimon, Companion,  Uploader",
        "",
        "Rainforest Connection",
        "",
        "https://rfcx.org",
        "Rainforest Connection (RFCx) builds and deploys scalable, open acoustic monitoring systems that can halt illegal logging and poaching, and can enable biodiversity measurement and monitoring.",
        "complete",
        [
            "animals",
            "sound"
        ],
        [
            "ai",
            "data",
            "fabrication",
            "sensors"
        ],
        [
            "citizen science"
        ],
        [
            "biodiversity",
            "conservation",
            "preservation",
            "forest",
            "tropical forest",
            "illegal loggoing",
            "poaching",
            "threat detection",
            "biodiversity monitoring"
        ]
    ],
    [
        "Protecting Snow Leopards with Technology",
        "China",
        "Tech4all, HUAWEI",
        "",
        "https://www.huawei.com/en/tech4all/stories/snow-leopard",
        "The MindSpore AI framework is boosting the accuracy and efficiency of analyzing infrared image data to improve conservation of the snow leopard in China's Qinghai-Tibet Plateau",
        "complete",
        [
            "animals"
        ],
        [
            "ai",
            "data",
            "sensors"
        ],
        [],
        [
            "conservation",
            "preservation",
            "extinction",
            "leopard"
        ]
    ],
    [
        "Saving Norway's Endangered Atlantic Salmon",
        "Norway",
        "Tech4all, HUAWEI",
        "2021",
        "https://www.huawei.com/en/tech4all/stories/saving-the-atlantic-salmon-in-norway",
        "Artificial intelligence are protecting the wild Atlantic salmon from being overwhelmed by its invasive Pacific cousin",
        "complete",
        [
            "animals",
            "multi-species"
        ],
        [
            "ai",
            "digital fabrication",
            "sensors"
        ],
        [],
        [
            "waterscape",
            "food",
            "conservation",
            "ecosystem",
            "preservation",
            "salmon",
            "invasive multi-species"
        ]
    ],
    [
        "Creating A Tech Safety Net Because My Neighbors Are Elephants",
        "China",
        "Tech4all, HUAWEI",
        "2019",
        "https://www.huawei.com/en/tech4all/stories/asian-elephants",
        "Deploying China's first connected Asian Elephant protection, monitoring, and warning system",
        "complete",
        [
            "multi-species"
        ],
        [
            "ai",
            "data",
            "sensors"
        ],
        [],
        [
            "conservation",
            "preservation",
            "extinction",
            "elephant"
        ]
    ],
    [
        "Smart Whale Sounds",
        "Ireland",
        "Tech4all, HUAWEI",
        "2021",
        "https://www.huawei.com/en/tech4all/stories/sound-of-whales",
        "Smart technology deployed off the Irish south coast can mean the difference between life & death for aquatic mammals",
        "complete",
        [
            "animals",
            "environment",
            "sound",
            "multi-species"
        ],
        [
            "ai",
            "data",
            "sensors",
            "sound"
        ],
        [],
        [
            "waterscape",
            "food",
            "pollution",
            "conservation",
            "preservation",
            "extinction",
            "machine learning",
            "whale",
            "dolphin"
        ]
    ],
    [
        "Calling Tree",
        "UK",
        "Rosemary Lee & Simon Whitehead",
        "2014-",
        "https://www.artsadmin.co.uk/project/calling-tree/",
        "Located in and around a mature tree in a significant site, and working with a team of aerialists, singers and performers they have created a durational performance made up of cycles of songs, movement and messages.",
        "complete",
        [
            "more-than-human",
            "sound"
        ],
        [
            "fabrication",
            "sound"
        ],
        [
            "urban context"
        ],
        [
            "symbiosis",
            "tree",
            "community"
        ]
    ],
    [
        "Inca Whistling Vessels",
        "Peru",
        "",
        "",
        "https://www.youtube.com/watch?v=d_BvHJXIAQs",
        "",
        "complete",
        [
            "animals",
            "material",
            "sound",
            "multi-species"
        ],
        [
            "fabrication",
            "sound"
        ],
        [
            "citizen science"
        ],
        []
    ],
    [
        "Algaculture",
        "UK",
        "Michael Burton & Michiko Nitta",
        "2010",
        "https://www.burtonnitta.co.uk/Algaculture.html",
        "Algaculture designs a new symbiotic relationship between humans and algae. It proposes a future where humans will be enhanced with algae living inside new bodily organs, allowing us to be semi-photosynthetic. Almost enabling us to become plant-like by gaining food from light. As such, we will be symbionts (meaning that both entities entirely depend on each other for survival), entering into a mutually beneficial relationship with the algae.",
        "speculative",
        [
            "more-than-human",
            "resource",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "food",
            "habitat",
            "symbiosis",
            "algae"
        ]
    ],
    [
        "The Algae Opera",
        "UK",
        "Michael Burton & Michiko Nitta",
        "2012",
        "https://www.burtonnitta.co.uk/AlgaeOpera.html",
        "The algae, which are a photosynthetic plant-like organism, feeds on the carbon dioxide in the singer's breath. As an important future food source, the singer's algae can also be eaten. Alongside listening to her music, the audience can also taste her song.",
        "speculative",
        [
            "more-than-human",
            "resource",
            "sound",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "food",
            "habitat",
            "symbiosis",
            "algae"
        ]
    ],
    [
        "Instruments of the Afterlife",
        "UK",
        "Michael Burton & Michiko Nitta",
        "2015",
        "https://www.burtonnitta.co.uk/InstrumentsOfTheAfterlife.html",
        "Instruments are created to transform contamination into valuable materials, by employing plants and engineered bacteria.\n\nInstead of mining material from geological sources and using fossil fuels, that lead to environmental harm, could future generations use the contamination and pollution we leave behind to build their future world? Can they build balanced relationships with the natural world to be a no-waste civilisation?",
        "speculative",
        [
            "material",
            "micro-organisms",
            "plants",
            "utilization"
        ],
        [
            "biotech",
            "fabrication"
        ],
        [],
        [
            "pollution",
            "waste",
            "air",
            "synthetic biology tech"
        ]
    ],
    [
        "Shadow Biosphere",
        "UK",
        "Michael Burton & Michiko Nitta",
        "2011",
        "https://www.burtonnitta.co.uk/shadowbiosphere.html",
        "Man-made biodiversity to recover Earth's lost species.\nClimate change, a human population of 9 billion, the effects of deforestation and rising oceans will drive species to extinction. Scientists say three species of organisms become extinct every hour due to environmental pressures created by humans. Biodiversity is not just a green issue. It is vital as a life support system and we simply cannot exist without rich biodiversity. If we don't act now, we will loose organisms which might become a solution to unforeseen disasters and diseases.",
        "speculative",
        [
            "multi-species",
            "synthetic biology"
        ],
        [
            "biotech",
            "fabrication"
        ],
        [],
        [
            "biodiversity",
            "bee",
            "extinction"
        ]
    ],
    [
        "Altered Ways of Being",
        "UK",
        "Michael Burton & Michiko Nitta",
        "2013",
        "https://www.burtonnitta.co.uk/AlteredWaysofBeing.html",
        "See with the skin, smell with suckers, change colour for social interactions and sense the world with a brain distributed across the body.\n\nThese abilities possessed by an octopus shape a mind that is possibly one of the most different non-human forms of intelligence to our own. Altered Ways of Being takes inspiration from the octopus to reveal links between our own human body and mind.",
        "speculative",
        [
            "animals",
            "more-than-human",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "light",
            "bionic",
            "color",
            "smell",
            "octopus"
        ]
    ],
    [
        "Driade: the voice of nature",
        "Italy",
        "Alessia Pinna, Clarissa Cuoccio, Heitor Lobo Campos, Innocenzo De Risola, Mika Lessmann",
        "2022",
        "https://www.design.polimi.it/fileadmin/user_upload/eventi/2022/img_2022/Thackara/G02_cover.pdf",
        "sensor, data, coding, fabrication, sound",
        "prototype",
        [
            "sound"
        ],
        [
            "coding",
            "fabrication",
            "sensors",
            "sound"
        ],
        [
            "urban context"
        ],
        [
            "waste",
            "tree"
        ]
    ],
    [
        "Micro detective",
        "Italy",
        "Julian de Freitas, Leo Olivier Ocando, Max Park, Joshua Seckerdieck.",
        "2022",
        "https://www.design.polimi.it/it/lista-eventi/dettaglio-eventi?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=492&cHash=f7f48ac17cfe39c1a5a09f64986116be",
        "Simple DIY construction of a makeshift microscope encourages urbanites to collect and observe microbial samples. An app records the microscope sessions, with AI included in to recognize and classify the observed species. Finally, translation of microscopic data allows diving into the microbial sample in an immersive VR experience.",
        "prototype",
        [
            "micro-organisms",
            "multi-species"
        ],
        [
            "ai",
            "coding",
            "fabrication",
            "sampling",
            "sensors",
            "virtual reality"
        ],
        [
            "urban context",
            "citizen science"
        ],
        [
            "biodiversity"
        ]
    ],
    [
        "Bird Hospitality service in the Bovisa Campus",
        "Italy",
        "Isabelle Erdmann, Jisoo Kim, Joseph Varanese, Jing Zhang, Siddhant Bothra.",
        "2022",
        "https://www.design.polimi.it/it/lista-eventi/dettaglio-eventi?tx_news_pi1%5Baction%5D=detail&tx_news_pi1%5Bcontroller%5D=News&tx_news_pi1%5Bnews%5D=492&cHash=f7f48ac17cfe39c1a5a09f64986116be",
        "The project explores the design of connected micro-environments for birds that are placed on the empty balconies of district 9 of Milan, citizens can become volunteers by hosting the birds 'suite cabins', which allows being a member of a specific digital community that brings together the passion of bird lovers and the ecologist expertise. These product-service solutions aim to increase and restore biodiversity in the locality and find new relations between human-animal interactions.",
        "prototype",
        [
            "animals",
            "environment"
        ],
        [
            "fabrication",
            "sensors"
        ],
        [
            "urban context",
            "citizen science"
        ],
        [
            "habitat",
            "bird"
        ]
    ],
    [
        "Sweet City",
        "Costa Rica",
        "Curridabat",
        "",
        "https://www.theguardian.com/environment/2020/apr/29/sweet-city-the-costa-rica-suburb-that-gave-citizenship-to-bees-plants-and-trees-aoe",
        "Sweet City is just one of a number of biocorridors around the country that allow the genetic spread of species to maintain their strength.",
        "complete",
        [
            "plants"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "habitat",
            "ecosystem",
            "pollinator",
            "indigenous life",
            "urban planning",
            "citizenship",
            "green infrastructure"
        ]
    ],
    [
        "Botanical chalking",
        "Europe",
        "-",
        "2001-",
        "http://sauvagesdemarue.mnhn.fr/index.html\nhttps://morethanweeds.co.uk\nhttps://www.brut.media/fr/nature/toulouse-ce-botaniste-trace-a-la-craie-le-nom-des-plantes-sauvages-f1bbaded-03d9-4f27-9f66-f7bbea25df31\nhttps://www.tela-botanica.org",
        "Several projects, including: chalking names of different plants in urban area, citizen science projects collaborating with citizens to record species in cities",
        "complete",
        [
            "plants",
            "multi-species"
        ],
        [
            "data",
            "fabrication",
            "sampling"
        ],
        [
            "urban context",
            "citizen science"
        ],
        [
            "biodiversity",
            "photography"
        ]
    ],
    [
        "Symbiosis",
        "USA",
        "STOWE HAMMARBURG, DANIEL KIM, YOOYOUNG KO, ZACHARY SCHWEMLER & JESSICA SHEN",
        "2016",
        "https://www.biodesignchallenge.org/cmu",
        "A bioengineered plant that releases caffeine into the air during the day and melatonin at night, Symbiosis is a critique of the way modern technology has influenced our sleep patterns.",
        "prototype",
        [
            "environment",
            "plants"
        ],
        [
            "biotech",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "waste",
            "symbiosis",
            "synthetic biology tech",
            "sleep"
        ]
    ],
    [
        "Kelsun",
        "USA",
        "Tessa Callaghan, Aaron Nesser, Aleks Gosiewski",
        "2016",
        "https://www.keellabs.com",
        "Kelsunâ„¢ is a seaweed-based yarn with a significantly lower environmental footprint than legacy fibers",
        "complete",
        [
            "material",
            "resource",
            "utilization"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "footprint",
            "tree equity",
            "fabrics"
        ]
    ],
    [
        "Starter Culture",
        "USA",
        "GAGE BRANDA, SARAH WHELTON, JAKE O'HAGAN, EMMA WHITLOCK",
        "2016",
        "https://www.biodesignchallenge.org/mica2016",
        "A biomaterials starter kit designed to introduce makers to the expansive world of biomaterials, the contents of the Starter Culture kit, which include bioplastics, mycelium and silk proteins, can be propagated and shared among makers",
        "prototype",
        [
            "material",
            "micro-organisms"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [],
        [
            "mycellium",
            "silk"
        ]
    ],
    [
        "Mutua",
        "USA",
        "MUN YI CHENG, CALEB FISHER, FANGYUAN HU, BRENDAN HO, RYAN ODOM, ANTHONY STOFFELLA & XIANGTIA SUN",
        "2016",
        "https://www.biodesignchallenge.org/sci-arc",
        "A panel inside homes on which organisms like lichen or slime mold grow and behave as biosensors and living art, Mutua offers a fresh, living concept for interior design.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "pigment",
            "color",
            "slime mould"
        ]
    ],
    [
        "Growing Buildings",
        "USA",
        "-",
        "2016",
        "https://www.biodesignchallenge.org/sci-arc",
        "Pairing drones with living organisms, Growing Buildings seeks to heal urban infrastructure with bacteria and slime mold that produce organic sealants. ",
        "prototype",
        [
            "material",
            "micro-organisms",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "air",
            "slime mould",
            "construction repair"
        ]
    ],
    [
        "MyoTomato",
        "USA",
        "LEMAN AKPINAR, VIKTOREA BENOIS, SEBASTIAN COCIOBA, ANDREW CZIRAKI, DAVID HANLON, MARGUERITE LI, BO LIU, STEPH MANTIS, KIRIN PINO, SHANNON POLLAK, GINA PROENZA, TARAH RHODA, VICTOR TABOADA, DARYA WARNER, JOHN WELLS",
        "2016",
        "https://www.biodesignchallenge.org/sva2016",
        "Plants are often deficient in the amounts of protein necessary to sustain the human diet because they are composed mainly of water and starches. To supplement nutrition, MyoTomato proposes bioengineering edible plants to produce myoglobin, a protein normally found in meat. As part of their lab work, the team inserted a DNA sequence naturally found in beef products into a tomato's genome using agrobacteria.",
        "speculative",
        [
            "animals",
            "plants",
            "resource",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [],
        [
            "food",
            "rewild",
            "synthetic biology tech",
            "tomato"
        ]
    ],
    [
        "Tumo",
        "USA",
        "-",
        "2016",
        "https://www.biodesignchallenge.org/sva2016",
        "While tumors in animals may be benign or malignant, in plants they may have alternative functions. Bioengineering tumors into plants can rapidly expand the plant's size and therefore possibilities for increased food production. The resulting biomass may not only edible but far more nutritious. Tumo would produce an accelerated crop rich in vitamins, nutrients, and proteins that has a crisp texture and familiar flavors.",
        "speculative",
        [
            "animals",
            "plants",
            "resource",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "food",
            "rewild"
        ]
    ],
    [
        "Stabilimentum",
        "USA",
        "MÃ“NICA BUTLER, REBECCA VAN SCIVER, JIWON WOO",
        "2016",
        "https://www.biodesignchallenge.org/schools/upenn",
        "Latin for support, Stabilimentum is a couture mask that filters air using live spiders and the electrostatic properties of their silk. Inspired by the symbiotic relationship between humans and the microbiome, the fashion accessory creates a symbiosis between human and arachnid.",
        "speculative",
        [
            "animals",
            "micro-organisms",
            "resource",
            "multi-species",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "pollution",
            "spider",
            "air",
            "symbiosis",
            "silk",
            "eletrostatic"
        ]
    ],
    [
        "Probiome",
        "USA",
        "REBECCA HALLAC, VINCENT SNAGG",
        "2016",
        "https://www.biodesignchallenge.org/schools/upenn",
        "This smart bracelet automatically sprays surfaces with customized probiotics, containing Staphylococcus epidermidis, a bacterial strain that protects the skin from pathogens. The team developed a functional version that pairs with a computer keyboard to prevent MRSA infection in hospitals.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "resource",
            "synthetic biology",
            "utilization"
        ],
        [
            "fabrication",
            "sensors"
        ],
        [],
        [
            "air",
            "soil",
            "symbiosis",
            "skin"
        ]
    ],
    [
        "Life/Light\n",
        "USA",
        "JACOB SULLIVAN, VERONIKA VOLKOVA, RYAN WERTZ, & LOREN BENALLY",
        "2017",
        "https://www.biodesignchallenge.org/arizona-state-university",
        "Life/Light is an integrated system that blurs the boundary between living nature and artifacts. The system provides evening light, energy, and greywater treatment for a human habitat using bioluminescent algae.",
        "prototype",
        [
            "micro-organisms",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "light",
            "algae",
            "lighting structure"
        ]
    ],
    [
        "Parturient",
        "USA",
        "LOVISA MINKIEWICZ, JEROEN VAN KEMPEN, & JASMIJN VAN DER WEIDE",
        "2017",
        "https://www.biodesignchallenge.org/artez-institute-of-the-arts",
        "Par-tu-ri-ent imagines a future where pregnancy is one of several ways to carry a child to term. The project considers the social consequences of new reproductive technologies.",
        "speculative",
        [],
        [
            "fabrication",
            "sensors"
        ],
        [],
        [
            "bee",
            "fiction"
        ]
    ],
    [
        "Quantworm Mine",
        "UK",
        "LIV BARGMAN AND NINA CUTLER",
        "2017",
        "https://www.biodesignchallenge.org/central-saint-martins",
        "Quantworm Industries is a nanotech wormery housed on former coal mining sites in South Wales that utilizes the earthworm's natural ability to bio-remediate contaminated soil and bio-synthesize nanoparticles called quantum dots (QDs) from heavy metals.",
        "speculative",
        [
            "animals",
            "material",
            "resource",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "pollution",
            "soil",
            "worm",
            "quantum dot"
        ]
    ],
    [
        "Pink Chicken Project",
        "UK",
        "NONHUMAN NONSENSE\nLEO FIDJELAND & LINNEA VÃ…GLUND",
        "2017",
        "https://pinkchickenproject.com",
        "Human actions have altered the Earth so profoundly that we have entered a new geological epoch - the Anthropocene. The project suggests genetically modifying a chicken with pink bones and feathers using a gene from the insect cochineal to produce a pigment that will be fossilized when combined with the calcium of the bone. By changing the color of chickens to pink, this project rejects the current violence inflicted upon the non-human world and poses questions of the impact and power of synthetic biology.",
        "speculative",
        [
            "animals",
            "more-than-human",
            "multi-species",
            "synthetic biology"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [],
        [
            "pigment",
            "color",
            "extinction",
            "synthetic biology tech",
            "anthroprocene",
            "more-than-human",
            "chicken",
            "decolonisation",
            "legend",
            "mythology",
            "coonection",
            "sculpture",
            "storytelling",
            "kinship",
            "mosquito",
            "plant",
            "post-anthroprocentrism",
            "planter",
            "transformation",
            "fabric",
            "alcohol",
            "political agenda",
            "parenthood",
            "architecture",
            "de-human-centric"
        ]
    ],
    [
        "PLANETARY PERSONHOOD",
        "Berlin",
        "NONHUMAN NONSENSE",
        "",
        "https://planetarypersonhood.com",
        "As NASA, SpaceX, and others, now attempt to bring earthlings to Mars, Planetary Personhood is an opportunity to free ourselves from the conceptual baggage of earthly traditions and systems. Seeking to move away from the dualistic divide between living beings and inanimate matter, the project invites us to a new way of relating to a planetary whole, and to the myriad of nonhuman forces and actants that surround us.",
        "speculative",
        [
            "more-than-human",
            "utilization"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "landscape",
            "outerspace",
            "planet",
            "invasive species",
            "beehive"
        ]
    ],
    [
        "Tale of a tree human",
        "Ã–stra VÃ¤tterbranterna, Sweden",
        "NONHUMAN NONSENSE",
        "",
        "https://nonhuman-nonsense.com/tale-of-a-tree-human",
        "This work is an exploration of how legends and mythology can create long-term family ties to the land and nonhuman beings built on compassion. The tree human Vide is given form in a semi-permanent public sculpture, and was born out of a dialogue with biologists and residents of the UNESCO Biosphere Reserve Ã–stra VÃ¤tterbranterna, as part of the project Nature Takes Over by Ã–sterÃ¤ngens Konsthall.",
        "complete",
        [
            "more-than-human"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "tree",
            "forest",
            "tropical forest",
            "illegal loggoing",
            "poaching",
            "threat detection",
            "biodiversity monitoring"
        ]
    ],
    [
        "Mosquito Translator",
        "",
        "NONHUMAN NONSENSE",
        "",
        "https://nonhuman-nonsense.com/mosquito-translator",
        "The work consists of an installation, where the audience is presented with a glass chamber full of mosquitos. The chamber has multiple openings/doors, where humans can voluntarily put their hand and arm inside the chamber to meet/feed the mosquitos. Sitting on top of the chamber is the â€œtranslator machineâ€, a device that creates the bridge between mosquitoes and humans, while also being an entity in itself.",
        "speculative",
        [
            "animals",
            "more-than-human"
        ],
        [
            "biomedia",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "food",
            "insect",
            "leopard",
            "salmon",
            "anthroprocene"
        ]
    ],
    [
        "Audible Flora",
        "",
        "NONHUMAN NONSENSE",
        "",
        "https://nonhuman-nonsense.com/audible-flora",
        "A group of DIY biohackers design a new sensor plant that detects pollution levels and indicates the result in sound to elevate the worsening environmental condition to their fellow citizen. When the plants are put in a beneficial surrounding, they â€œsingâ€ beautifully. When put in a heavily polluted place, they \"scream\" a disturbing noise.Initially, the environment improves as people respond to the emotional cues of the plants. However, having found a new niche in which to prosper, the plants eventually mutate and are spread without control, rendering polluted areas uninhabitable by noise. It's as if nature suddenly has the power to express itself, claiming rights to exist.",
        "speculative",
        [
            "environment",
            "plants",
            "sound",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "biotech",
            "coding",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "pollution",
            "invasive multi-species"
        ]
    ],
    [
        "Human Beeings",
        "",
        "NONHUMAN NONSENSE",
        "",
        "https://nonhuman-nonsense.com/human-beeings",
        "In the face of bee extinction, an alluring plant, that tap into human desires and needs, has started appearing around outdoor gyms. The passing humans drink the plant nectar to replenish their strength. Some pollen sticks in their shirt, and as they drink from the next plant, the vital cross breeding occurs.",
        "speculative",
        [
            "multi-species",
            "synthetic biology"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [],
        [
            "food",
            "bee",
            "ecosystem",
            "pollinator",
            "flower",
            "synthetic biology tech",
            "invasive multi-species",
            "photography"
        ]
    ],
    [
        "Turn to stone\nBecome stones\nTHE \nANTI-ANTHROPOCENTRIC VENDING MACHINE",
        "",
        "NONHUMAN NONSENSE",
        "",
        "https://nonhuman-nonsense.com/turn-to-stone\nhttps://nonhuman-nonsense.com/becoming-stone\nhttps://nonhuman-nonsense.com/the-antianthropocentric-vending-machine",
        "Human, non-human, boundaries, ineffable.\nA vending machine sells \"cures for anthropocentrism\". To obtain the cure you must sacrifice the shiny capsule you just received, breaking it open to reveal a stone that you can eat. The stone is accompanied by a short message, claiming that when you eat this stone, you will never look at stones the same way again. Claiming that stones are not dead, and that you should think about what they want. Thinking about the world differently changes the world. Eating the stone, you become the stone - existence/consciousness is not something exceptionally human.",
        "speculative",
        [
            "more-than-human"
        ],
        [
            "fabrication"
        ],
        [],
        [
            "food",
            "symbiosis",
            "landscape",
            "invasive species",
            "rhino",
            "elephant",
            "more-than-human"
        ]
    ],
    [
        "Celestial Colony",
        "USA",
        "JONATHAN RANKIN, HUGH PATTON, JONATHAN VISGAITIS, GERALD HOPPER, & JULIEN REMI NGUYEN",
        "2017",
        "https://www.biodesignchallenge.org/kent-state-university",
        "Celestial Colony is a water filter that treats wastewater by pumping it through \"algae facets\" in a geodesic dome, which filters out nutrients from the water and carbon dioxide from the air. Once the algae has collected the nutrients, it can be used as fertilizer to grow plants within the dome, while the treated water can be reused as greywater or further filtered into potable water.",
        "prototype",
        [
            "plants",
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "digital fabrication"
        ],
        [],
        [
            "waterscape",
            "waste",
            "habitat",
            "algae",
            "fertilizer"
        ]
    ],
    [
        "POM",
        "UK",
        "GREG ORROM SWAN, LOUIS ALDERSON-BYTHELL, TASHIA TUCKER, & SAM ROOTS",
        "2017",
        "https://www.biodesignchallenge.org/royal-college-of-art",
        "POM lures flies using a controlled release of pheromones from a remote-controlled node, which clusters them around the flowers needing pollination. Nodes distributed throughout the farm enable this 'cloud of flies' to be shepherded from one region to another, covering all the blossoms that might be in flower at that point. POM ensures both efficient pollination and fruit harvests in the future.",
        "prototype",
        [
            "animals",
            "multi-species"
        ],
        [
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "bee",
            "pollinator",
            "flower",
            "beehive"
        ]
    ],
    [
        "Mycotopia",
        "UK",
        "NAOMI ASHWORTH, BIANCA RUSSO, CAROLYN TAM, LARASATI GUNYUU, & THOMAS JAMES",
        "2017",
        "https://www.biodesignchallenge.org/royal-college-of-art",
        "Inspired by the interconnected networks of fungi in soil and plant interaction within these networks, Mycotopia is a mycelial planter system designed to recreate these networks within urban and domestic settings.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "multi-species",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "rewild",
            "symbiosis",
            "tree",
            "whale",
            "mycellium"
        ]
    ],
    [
        "RootKnit",
        "Colombia",
        "PAULA ANDREA MOLINA OSORIO, NICOLE SENZ GIUSTI, & DANIEL SHAMBO RODRIGUEZ",
        "2017",
        "https://www.biodesignchallenge.org/universidad-de-los-andes",
        "RootKnit is a shapeshifting surface connected to plants. Using multiple sensors, RootKnit can react to the plants' conditions and then translate that data into surface movements and shapes. This creates a new way of communicating, understanding, and connecting to plants and the environment.",
        "prototype",
        [
            "plants"
        ],
        [
            "data",
            "sensors"
        ],
        [],
        [
            "waste",
            "dolphin",
            "community"
        ]
    ],
    [
        "RXN Wristband",
        "USA",
        "JENNY FILIPETTI, ANDREW HENDERSON, STEPHEN LEWIS, & ALEX SWANSON",
        "2017",
        "https://www.ember.bio/#coming-soon",
        "RXN Wristband glows when a user's blood alcohol content is over the legal limit to drive. It can be grown sustainably and biomanufactured at scale. Designers utilize the wearable as a platform for building and adding biosensors for new metrics.",
        "prototype",
        [
            "material",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "octopus"
        ]
    ],
    [
        "UK 2029: Post-Natural Artefacts from the United Kingdom of England and Wales",
        "Edinbrugh, UK",
        "EVA AUER, SEAN GREAVES, & JOSEPH REVANS",
        "2017",
        "https://biodesign.eca.ed.ac.uk/ukew-2029/\nhttps://cargocollective.com/UK2029/Wildflower-Protest",
        "UKEW 2029 explores how the socio-political landscape of the United Kingdom could interact with advances in biotechnology. A collection of physical artifacts, photographs, and text bring to life a possible future in which biotech is ubiquitous.\nThe project is presented as three fictional case studies which explore how communities existing today could navigate this future and utilise biotechnologies unique capabilities to pursue their goals. (Security and Protection - Dispersed Maker Communities; Biohacked Buildings - London; Wildflower Protests - Sheffield)",
        "speculative",
        [
            "micro-organisms",
            "plants",
            "resource",
            "multi-species",
            "synthetic biology",
            "utilization"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [
            "urban context",
            "citizen science"
        ],
        [
            "flower",
            "tree",
            "community",
            "citizenship",
            "photography"
        ]
    ],
    [
        "Cybele",
        "Edinbrugh, UK",
        "MAIA LYALL, CIRCLE LU, MUHAMAD IQBAL, & PANAYIOTIS PAVLIDES",
        "2017",
        "https://biodesign.eca.ed.ac.uk/cybele-an-artificial-asexual-womb/\nhttp://cybelebdc.wordpress.com",
        "Cybele, an interchangeable asexual incubator, envisions an artificial womb as a new mode of reproduction where families take equal part in growing a fetus. With Cybele, parents are able to create and incubate their children on shift without sexual interaction or restrictions of gender. Learn more about",
        "speculative",
        [],
        [
            "biotech",
            "fabrication"
        ],
        [],
        [
            "bee",
            "symbiosis",
            "green infrastructure"
        ]
    ],
    [
        "Microbial Architecture",
        "Edinbrugh, UK",
        "RUOBING HAO & XINWEI DU",
        "2017",
        "https://biodesign.eca.ed.ac.uk/nature-authority-bio-architecture-designed-by-microorganisms/",
        "Microbial Architecture imagines what a building would look like from the eyes of microorganisms. It envisioning a world where the real authority comes from nature, which challenges the value of human-centric dominance.",
        "prototype",
        [
            "environment",
            "micro-organisms",
            "more-than-human"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [],
        [
            "landscape",
            "flower",
            "photography",
            "sleep"
        ]
    ],
    [
        "Fairyland: sensory bio-ecosystem for air pollution",
        "Edinbrugh, UK",
        "CORENTIN MOLLIER, SHAN LU, SHANNEN TIONIWAR, ZAZHONG WANG",
        "2017",
        "https://biodesign.eca.ed.ac.uk/pollutants-sensory-bio-ecosystem/",
        "an ecosystem that detects air pollution and enhances childrens' relationship to nature",
        "prototype",
        [
            "animals",
            "plants",
            "multi-species"
        ],
        [
            "biomedia",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "pollution",
            "insect",
            "air",
            "ecosystem",
            "algae",
            "children"
        ]
    ],
    [
        "Sharebiota - Interspecies Communication through Microbiota",
        "Edinbrugh, UK",
        "ALEJANDRA GRANDON, KIRSTY MILLAR, & YUXI LIU",
        "2017",
        "https://biodesign.eca.ed.ac.uk/sharebiota-interspecies-communication-through-microbiota/",
        "Sharebiota expands on recent discoveries that humans and their pets share beneficial strains of bacteria leading to healthier immune systems. It is a public installation that integrates collection, production, and distribution of dog microbiota.",
        "speculative",
        [
            "animals",
            "micro-organisms",
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication",
            "sensors"
        ],
        [],
        [
            "air",
            "symbiosis",
            "dog"
        ]
    ],
    [
        "Olfact-Sensory Communication Through Olfactory Genius",
        "Edinbrugh, UK",
        "KAREN CAMPA, KATIE DOBBERSTEIN, FABIEN FLOREK, & CORINNA HARTINGER",
        "2017",
        "https://biodesign.eca.ed.ac.uk/olfact-sensory-communication-through-olfactory-genius/",
        "Olfact encapsulates genetically engineered bacteria in a piece of jewelry to allow the wearer to capture a scent photograph/moment in time.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "more-than-human",
            "utilization"
        ],
        [
            "biotech"
        ],
        [],
        [
            "air",
            "smell",
            "jewlery",
            "smell/olfactory information",
            "social relationship"
        ]
    ],
    [
        "Fabiont",
        "NewYork, USA",
        "POOJA PATEL, YOUBIN LEE, PRATIK JAIN",
        "2018",
        "https://fabiont.carrd.co",
        "Fabiont aims to create a probiotic fabric to enhance the skin microbiome and reestablish the beneficial microbes it contains. The fabric incorporates probiotics in silk fibroins extracted from raw silk. The garment acts as an additional â€œskinâ€ layer that augments the naturally given skin microbiome, a paradigm shift in both the fashion and skincare industries.",
        "prototype",
        [
            "material",
            "micro-organisms",
            "utilization"
        ],
        [
            "biomedia",
            "biotech"
        ],
        [],
        [
            "air",
            "symbiosis",
            "skin"
        ]
    ],
    [
        "Beyond 100%",
        "USA",
        "TUNG LIN, JAE KYONG CHEONG, SIHO CHANG",
        "2018",
        "https://www.biodesignchallenge.org/parsons-2018",
        "Beyond 100% imagines a microchip that can genetically modify a human=s capacity to acquire, manage, and share nutrition. The chip endows the user with the ability to receive nutrition from new food sources.",
        "speculative",
        [
            "animals",
            "multi-species",
            "synthetic biology"
        ],
        [
            "biomedia",
            "biotech"
        ],
        [],
        [
            "food"
        ]
    ],
    [
        "Sorbit Diaper",
        "USA",
        "SERGIO GONZALEZ, JOLEE NIEBERDING-SWANBERG, ANNIE WANG, JULIE XU",
        "2018",
        "https://juliexu.wixsite.com/portfolio/sorbit\nhttps://www.biodesignchallenge.org/uc-davis",
        "Disposable diaper waste contributes to 3.4 million tons of landfill waste annually and are typically made of fossil-fuel derived plastics. Sorbit is a fully biodegradable diaper made out of bacterial cellulose grown from citrus agricultural waste. The material is soft, water-repellant on the outside, and absorbent on the inside.",
        "prototype",
        [
            "material"
        ],
        [
            "biomedia"
        ],
        [],
        [
            "waste",
            "conservation",
            "diaper"
        ]
    ],
    [
        "Pressure Dependent Bioluminescence",
        "Edinburgh, UK",
        "WANYING ZHANG, YI HE, ROBIN BISHOP, GEDIZ ELIF KOCAOGLAN",
        "2018",
        "https://biodesign.eca.ed.ac.uk/pressure-dependent-bioluminescence/",
        "This project focused on the idea of using bioluminescence in a number of different settings. By designing a cutting-edge biologically advanced cell-free system, we are able to make use of pressure activated bioluminescence. We make use of the 'PURE' cell-free assembly kit to manufacture the constituent parts of the luminescent system. The system has a variety of different applications and uses in our day-to-day lives.",
        "prototype",
        [
            "material"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [],
        [
            "children",
            "bioluminescence"
        ]
    ],
    [
        "Nurture",
        "Edinburgh, UK",
        "MARK WILLIAMS, TARA WIGHT, YINGRUI MA, SAFA AJJAN",
        "2018",
        "https://biodesign.eca.ed.ac.uk/edible-architecture-growing-meals-at-home/",
        "The state of global food production is changing rapidly. The Nurture team is attempting to envision how the state of our food may look in 10 - 20 years time and discovering the problems we may face.\n\nNurture takes a new approach to eating and food preparation. Currently we are building a modular unit to contain our hydroponic and Spirulina growth systems, and we are also creating recipes for how people would be able to cook with this new ingredient, which we are putting in a cook book.",
        "speculative",
        [
            "resource",
            "utilization"
        ],
        [
            "biomedia",
            "biotech",
            "fabrication"
        ],
        [
            "urban context"
        ],
        [
            "food",
            "rewild",
            "algae",
            "home-grow"
        ]
    ]
];