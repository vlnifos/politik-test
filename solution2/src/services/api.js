const proxyUrl = "https://cors-anywhere.herokuapp.com/"

const urls = {
  councillors: "http://ws-old.parlament.ch/councillors?format=json",
}

export const api = {
  getBaseUrl(type) {
    return proxyUrl + urls[type]
  },

  async getData(type) {
    const url = this.getBaseUrl(type)

    const response = await fetch(url)

    return response.json()
  },
}
