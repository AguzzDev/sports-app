export const addCeroToMarketValue = (number, type) => {
  const coinType = {
    "mill.": "0000",
    "mil": "000"
  }

  const toNumber = number?.replace(/,/g, "")
  const numberF = Number(toNumber + coinType[type])
  return numberF
}