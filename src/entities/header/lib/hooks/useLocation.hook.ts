import { useState } from "react";

export const useLocation = () => {
  const [currentOption, setCurrentOption] = useState<string>("");

  return { currentOption, setCurrentOption };
};
