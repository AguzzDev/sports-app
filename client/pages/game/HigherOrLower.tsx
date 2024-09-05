import { HigherGame } from "components/Games/HigherGame";
import { Layout } from "components/Layout";
import { TopMenu } from "components/Menu/TopMenu";

const HigherOrLower = () => {
  return (
    <Layout title="Higher Or Lower">
      <TopMenu title="Higher Or Lower" />

      <div className="grid place-content-center h-5/6">
        <div className="border-2 border-gray2 p-5 rounded-bl-[5%] rounded-tr-[5%] mt-10 xl:mt-0 w-[80vw] lg:w-[40vw] mx-auto">
          <HigherGame />
        </div>
      </div>
    </Layout>
  );
};

export default HigherOrLower;
