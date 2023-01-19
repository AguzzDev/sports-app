export const addCeroToMarketValue = (number: string, type: string) => {
  const coinType = {
    "mill.": "0000",
    mil: "000",
  } as any

  const toNumber = number?.replace(/,/g, "")
  const numberF = Number(toNumber + coinType[type])
  return numberF
}
