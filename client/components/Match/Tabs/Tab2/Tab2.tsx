import { MatchInterface } from "interface";

export const Tab2: React.FC<{ data: MatchInterface["statistics"] }> = ({
  data,
}) => (
  <>
    <div className="w-3/4 mx-auto">
      {data.map(({ text, homeTeam, awayTeam }) => (
        <div key={text}>
          <div className="flex justify-between py-1 md:py-2">
            <h5>{homeTeam.quantity}</h5>
            <h4 className="text-center">{text}</h4>
            <h5>{awayTeam.quantity}</h5>
          </div>

          <div className="relative mt-2 rounded-md py-1 md:py-2 bg-gray1 overflow-hidden">
            <div
              style={{ width: `${homeTeam.percentage}%` }}
              className={`absolute inset-0 h-full bg-border1`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </>
);
