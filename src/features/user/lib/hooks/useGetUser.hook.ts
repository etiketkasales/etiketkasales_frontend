import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { getUser } from "~/src/features/user/lib/api/user.api";

export const useGetUser = () => {
  const dispatch = useAppDispatch();

  const handleGetUser = async (user_id: string) => {
    try {
      const response = await getUser(user_id);
      if (response && response.id) {
        dispatch(setUser(response));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    handleGetUser,
  };
};
