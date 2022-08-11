import { entityType } from "./consts"

const getEnrichedProp = (type, item) => {
  const prop = {
    [entityType.councillors]: {
      name: `${item.firstName} ${item.lastName}`,
    },
    [entityType.affairs]: {
      date: `${item.updated}`,
    },
    [entityType.councils]: {
      name: `${item.name}`,
    },
  }

  return prop[type]
}

export const enrichWithProps = (type, data) => {
  return data.map((x) => ({
    ...x,
    ...getEnrichedProp(type, x),
  }))
}
