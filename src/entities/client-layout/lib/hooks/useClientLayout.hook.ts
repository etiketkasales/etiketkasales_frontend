import { useEffect } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";

export const useClientLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = navigator.userAgent.includes("Android");

    dispatch(
      setNavigation({
        deviceType: isIos ? "ios" : isAndroid ? "android" : "default",
        loaded: true,
      }),
    );
  }, [dispatch]);
};
