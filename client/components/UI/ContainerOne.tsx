import { ContainerProps } from "interface";

export const ContainerOne = ({
  children,
  className = "",
  title = "",
}: ContainerProps) => {
  return (
    <section className={`${className} bg-gray2 p-2 md:p-5 rounded-md`}>
      {title ? <h2 className="mb-5">{title}</h2> : null}
      {children}
    </section>
  );
};
