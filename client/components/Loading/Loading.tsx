import { motion } from "framer-motion";

export const LoadingSidemenu = () => {
  return (
    <div className="flex flex-row xl:flex-col xl:items-center xl:h-screen">
      <div className="flex xl:flex-col space-x-4 xl:space-x-0 xl:space-y-4 mt-2 mb-3 md:mb-4 lg:mb-10 lg:mt-4 xl:mt-0">
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
            className="bg-gray3 logoSize bg-opacity-50 rounded-2xl"
          ></motion.div>
        ))}
      </div>
    </div>
  );
};
