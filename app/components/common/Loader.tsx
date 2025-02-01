import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full bg-transparent  bg-opacity-20 transition-opacity h-full flex justify-center items-center">
      <Loader2 className="animate-spin text-[#f92c2c]" />
    </div>
  );
};

export default Loader;
