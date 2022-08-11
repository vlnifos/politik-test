const proxyUrl = "https://cors-anywhere.herokuapp.com/"
const url = "http://ws-old.parlament.ch/councillors?format=json"

let sortBy = 'name'

let councillors = []

/**
 * Fetch councillors data and return as json
 * @returns []
 */
const getCouncillorsData = async () => {
  try {
    const data = await fetch(proxyUrl + url)
  
    return await data.json()
  } catch (error) {
    setLoading(false)
  }
}

/**
 * Get councillors and display them
 */
const getCouncillors = async () => {
  setLoading(true)

  councillors = await getCouncillorsData()

  councillors = enrichWithName()

  setLoading(false)

  sortCouncillors()
  displayCouncillors()
}

/**
 * Enrich councillor object with full name
 * @returns {}
 */
const enrichWithName = () => {
  return councillors.map(x => ({
    ...x,
    name: `${x.firstName} ${x.lastName}`
  }))
}

/**
 * Render councillors in the document
 */
const displayCouncillors = () => {
  const list = document.getElementById('list')

  // Clear the list
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }

  const elements = councillors.map(x => {
    const el = document.createElement('li')

    const { name, id } = x

    el.innerText = `${id} | ${name}`

    return el
  })

  elements.forEach(x => list.appendChild(x))
}

/**
 * Show or hide the `loading` label
 * @param {*} loading - boolean
 */
const setLoading = (loading) => {
  let loadingElement = document.getElementById('loading')

  if (loading) {
    loadingElement.classList.remove('hidden')
  } else {
    loadingElement.classList.add('hidden')
  }
}

const sortCouncillors = () => {
  councillors.sort((a, b) => {
    if (sortBy === 'id') {
      return a.id - b.id
    } else {
      return a.name.localeCompare(b.name)
    }
  })
}

const changeSort = (some) => {
  const { value } = some

  sortBy = value
  
  sortCouncillors()
  displayCouncillors()
}