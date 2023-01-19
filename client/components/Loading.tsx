export const Loading = () => {
  return (
    // <section className="grid place-content-center h-screen">
    //   <div className="loading-animation w-52 h-52">
       
    //   </div>
    // </section>
    <></>
  )
}

export const LoadingSidemenu = ({ path }: { path: string }) => {
  return (
    <>
      {path === "/" || path.includes("game") ? (
        <div className="py-2 p-1 mx-auto">
          <div className="bg-gray3 bg-opacity-50 w-20 h-14 rounded-xl"></div>
        </div>
      ) : (
        <div className="flex flex-row xl:flex-col xl:items-center">
          <div className="mx-auto py-2 pr-2 xl:pr-0">
            <div className="bg-gray3 bg-opacity-50 w-20 h-14 rounded-xl"></div>
          </div>

          <div className="flex xl:flex-col space-x-4 xl:space-x-0 xl:space-y-4 mt-5 mx-auto">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="bg-gray3 w-16 h-16 bg-opacity-50 rounded-2xl"
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
