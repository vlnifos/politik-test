import React, { useEffect } from "react"
import { Button } from "../components/button/Button"
import { List } from "../components/list/list"
import { api } from "../services/api"
import { entityType, sortBy } from "../utils/consts"
import { Select } from "../components/select/Select"
import { enrichWithProps } from "../utils/utils"

export const Home = (props) => {
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    councillors: [],
  })

  const [sorting, setSorting] = React.useState({
    councillors: sortBy.councillors.id,
  })

  const getData = async (type) => {
    setLoading(true)
    try {
      const response = await api.getData(type)

      const enriched = enrichWithProps(type, response)

      const sorted = sortData({ ...data, [type]: enriched })

      setData(sorted)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const sortData = (payload) => {
    const sorted = {}

    const arr = payload || data

    for (const [key, value] of Object.entries(arr)) {
      sorted[key] = [...value].sort((a, b) => {
        if (sorting[key] === sortBy.councillors.id) {
          return a.id - b.id
        } else {
          return a[sorting[key]].localeCompare(b[sorting[key]])
        }
      })
    }

    if (payload) {
      return sorted
    } else {
      setData(sorted)
    }
  }

  const changeSort = (type, value) => {
    setSorting({
      ...sorting,
      [type]: value,
    })
  }

  useEffect(() => {
    sortData()
  }, [sorting])

  return (
    <div>
      <div>
        {/* Get councillors */}
        <Button
          onClick={() => getData(entityType.councillors)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get councillors"}
        </Button>

        {/* Sort by */}
        <span>Sort by</span>
        <Select
          options={["id", "name"]}
          onChange={(val) => changeSort("councillors", val)}
        />
      </div>

      {/* List */}
      <List items={data.councillors} />
    </div>
  )
}
