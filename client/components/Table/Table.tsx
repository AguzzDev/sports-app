import { TableProps } from "interface";

export const Table = ({
  title,
  headers,
  dataPerColumn,
  span,
  colSpan,
}: TableProps) => {
  const checkSpanCustom = span && colSpan;

  const colsNumber = checkSpanCustom ? headers.length + 1 : headers.length;
  const repeatColumn = `repeat(${colsNumber}, minmax(0, 1fr))`;

  const spanColStyle = (index: number) =>
    `${index + 1 === colSpan ? `col-span-${span! + 1}` : ""}`;

  return (
    <div className="border-2 border-border1">
      {title ? (
        <div className="p-2 border-b-2 border-border1">
          <h3>{title}</h3>
        </div>
      ) : null}

      <div className="p-2">
        <div
          className="grid py-1 text-center"
          style={{
            gridTemplateColumns: repeatColumn,
          }}
        >
          {headers.map((text, index) => (
            <>
              <h3
                className={`hidden sm:block ${
                  checkSpanCustom ? spanColStyle(index) : ""
                }`}
                key={index}
              >
                {text}
              </h3>

              <h3
                className={`block sm:hidden ${
                  checkSpanCustom ? spanColStyle(index) : ""
                }`}
                key={index}
              >
                {text.substring(0, 1)}
              </h3>
            </>
          ))}
        </div>

        {dataPerColumn[0].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid items-center py-4 text-center"
            style={{
              gridTemplateColumns: repeatColumn,
            }}
          >
            {dataPerColumn.map((col, colIndex) => (
              <p
                className={checkSpanCustom ? spanColStyle(colIndex) : ""}
                key={colIndex}
              >
                {col[rowIndex]}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
