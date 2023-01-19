export const leagueImg = (league:string, data:any) => {
  return league === "Bundesliga"
    ? data[0]
    : league === "Serie A"
      ? data[1]
      : league === "Premier League"
        ? data[2]
        : league === "Eredivisie"
          ? data[4]
          : league === "LaLiga"
            ? data[3]
            : league === "Ligue 1"
              ? data[5]
              : false
}