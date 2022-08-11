import React, { useEffect } from "react"
import { Button } from "../components/button/Button"
import { List } from "../components/list/list"
import { api } from "../services/api"
import { entityType, sortBy } from "../utils/consts"
import { Select } from "../components/select/Select"
import { enrichWithProps } from "../utils/utils"
import classes from "./Home.module.scss"

export const Home = (props) => {
  const [loading, setLoading] = React.useState({
    councillors: false,
    affairs: false,
    councils: false,
  })
  const [data, setData] = React.useState({
    councillors: [],
    affairs: [],
    councils: [],
  })

  const [sorting, setSorting] = React.useState({
    councillors: sortBy.councillors.id,
    affairs: sortBy.affairs.date,
    councils: sortBy.councils.name,
  })

  const changeLoading = (type, value) => {
    setLoading({
      ...loading,
      [type]: value,
    })
  }

  const getData = async (type) => {
    changeLoading(type, true)

    try {
      const response = await api.getData(type)

      const enriched = enrichWithProps(type, response)

      const sorted = sortData({ ...data, [type]: enriched })
      console.log("getData", sorted)

      setData(sorted)
    } catch (error) {
    } finally {
      changeLoading(type, false)
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
    <div className={classes.container}>
      <div className={classes.sort}>
        {/* Sort by */}
        <span>Sort councillors by</span>
        <Select
          options={["id", "name"]}
          onChange={(val) => changeSort("councillors", val)}
        />
      </div>

      <div className={classes.lists}>
        {/* Councillors */}
        <div>
          {/* Get councillors */}
          <Button
            onClick={() => getData(entityType.councillors)}
            loading={loading.councillors}
          >
            Get councillors
          </Button>

          {/* List */}
          <List items={data.councillors} titleProp="name" title="Councillors" />
        </div>

        {/* Affairs */}
        <div>
          {/* Get affairs */}
          <Button
            onClick={() => getData(entityType.affairs)}
            loading={loading.affairs}
          >
            Get affairs
          </Button>

          {/* List */}
          <List items={data.affairs} titleProp="shortId" title="Affairs" />
        </div>

        {/* Councils */}
        <div>
          {/* Get councils */}
          <Button
            onClick={() => getData(entityType.councils)}
            loading={loading.councils}
          >
            Get councils
          </Button>

          {/* List */}
          <List items={data.councils} titleProp="name" title="Councils" />
        </div>
      </div>
    </div>
  )
}
