const columns = [
    "Project Name", "Place", "Author", "Year", "Link", "Description",
    "Urban Context", "Citizen Science", "Nature Topic", "Technology", "Implementation", "Tag",
]

let iota = 0
const i_project_name = iota++
const i_place = iota++
const i_author = iota++
const i_year = iota++
const i_link = iota++
const i_description = iota++
const i_urban_context = iota++
const i_citizen_science = iota++
const i_nature_topic = iota++
const i_technology = iota++
const i_implimentation = iota++
const i_tag = iota++

const nature_topic_categories = [
    "animals",
    "environment",
    "material",
    "micro-organisms",
    "more-than-human",
    "plants",
    "resource",
    "sound",
    "multi-species",
    "synthetic biology",
    "utilization"
]

const technology_categories = [
    "AI",
    "augmented reality",
    "biomedia",
    "biotech",
    "coding",
    "data",
    "digital fabrication",
    "fabrication",
    "sampling",
    "sensors",
    "sound",
    "virtual reality"
]

const implementation_categories = [
    "complete",
    "prototype",
    "speculative"
]

const bitset_match_value = (bitset, categories, value) => {
    for (let i = 0;
        bitset && i < categories.length;
        bitset >>= 1, ++i) {
        if (bitset & 1 && categories[i] === value)
            return true
    }
    return false
}

const apply_filter = (entry, category, value = '') =>
    (category === columns[i_urban_context] && entry[i_urban_context]) ||
    (category === columns[i_citizen_science] && entry[i_citizen_science]) ||
    (category === columns[i_nature_topic] &&
        bitset_match_value(entry[i_nature_topic], nature_topic_categories, value)) ||
    (category === columns[i_technology] &&
        bitset_match_value(entry[i_technology], technology_categories, value)) ||
    (category === columns[i_implimentation] &&
        bitset_match_value(entry[i_implimentation], implementation_categories, value)) ||
    (category === columns[i_tag] && entry[i_tag].includes(value))

const filtered_count = (category, value) => entries.filter(entry => apply_filter(entry, category, value)).length
