import ProfileRolePage from "~/src/pages-components/profile/ui/role";

import { UserRoleType } from "~/src/features/user/model";

export { profileMetadata as metadata } from "~/src/shared/config/metadata/profile.metadata";

interface Props {
  params: Promise<{ role: UserRoleType | "seller-pending" }>;
}

export default async function Page({ params }: Props) {
  const pageParams = await params;
  const role = pageParams.role;
  return <ProfileRolePage paramsRole={role} />;
}
