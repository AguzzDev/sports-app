import { FooterItemProps } from "interface";
import Link from "next/link";

const Item = ({ text, href, name }: FooterItemProps) => (
  <div>
    {text}
    <span className="font-bold px-1 gradient1">
      <Link href={href}>
        <a target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </Link>
    </span>
  </div>
);
export const Footer = () => {
  return (
    <footer className="flex justify-center py-4">
      <Item
        text="Develop by"
        href="https://agustin-ribotta.xyz/"
        name="AguzzDev"
      />
      <span className="pl-1 pr-2">|</span>
      <Item
        text="Design by"
        href="https://dribbble.com/shots/15745626-Football-Player-Page-Desktop-Version"
        name="PAHRI"
      />
    </footer>
  );
};
