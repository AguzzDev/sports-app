import { HigherGame } from "components/Games/HigherGame";
import { Layout } from "components/Layout/Layout";

const HigherOrLower = () => {
  return (
    <Layout title="Higher Or Lower">
      <section className="border-2 border-gray2 p-5 rounded-bl-[5%] rounded-tr-[5%] mt-5 w-[80vw] lg:w-[40vw] mx-auto">
        <HigherGame />
      </section>
    </Layout>
  );
};

export default HigherOrLower;
