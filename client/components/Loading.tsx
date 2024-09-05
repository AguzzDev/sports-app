import { motion } from "framer-motion";

export const LoadingSidemenu = () => {
  return (
    <div className="flex flex-row xl:flex-col xl:items-center h-[9rem] lg:h-[10.6rem]">
      <div className="flex xl:flex-col space-x-4 xl:space-x-0 xl:space-y-4 mt-7 mx-4">
        {Array.from({ length: 15 }, (_, i) => i).map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              repeatType: "mirror",
              repeat: Infinity,
            }}
            className="bg-gray3 w-20 h-20 bg-opacity-50 rounded-2xl"
          ></motion.div>
        ))}
      </div>
    </div>
  );
};
