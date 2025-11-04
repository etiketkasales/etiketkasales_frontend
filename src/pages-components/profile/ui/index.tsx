"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";

export default function ProfilePage() {
  const { handleGetUser } = useGetUser();
  const { currentRole, isLoggedIn } = useAppSelector(selectUser);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  if (!isLoggedIn) redirect("/login");

  return redirect(`/profile/${currentRole}`);
}
