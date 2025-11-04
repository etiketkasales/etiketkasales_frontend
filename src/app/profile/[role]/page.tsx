import ProfileRolePage from "~/src/pages-components/profile/ui/role";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  params: Promise<{ role: UserRoleType }>;
}

export default async function Page({ params }: Props) {
  const pageParams = await params;
  const role = pageParams.role;
  return <ProfileRolePage userRole={role} />;
}
