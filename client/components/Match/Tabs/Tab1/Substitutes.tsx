import { PlayerLineup, SubstitutesProps } from "interface";
import Image from "next/image";

const Item: React.FC<{ data: PlayerLineup }> = ({ data }) => (
  <>
    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-border1">
      <Image alt={`${data.name}-image`} src={data.image} layout="fill" />
    </div>
    <p className="px-2">{data.name}</p>
  </>
);

export const Substitutes: React.FC<SubstitutesProps> = ({
  homeTeam,
  awayTeam,
}) => (
  <div className="mt-4 xl:w-2/4 xl:mt-0">
    <h2>Suplentes</h2>

    <div className="grid grid-cols-2">
      <ul>
        <label className="flex font-bold mb-2">Local</label>
        {homeTeam.map((player, index) => (
          <li key={index} className="flex items-center py-1">
            <Item data={player} />
          </li>
        ))}
      </ul>
      <ul>
        <label className="flex justify-end font-bold mb-2">Visita</label>
        {awayTeam.map((player, index) => (
          <li key={index} className="flex flex-row-reverse items-center py-1">
            <Item data={player} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
