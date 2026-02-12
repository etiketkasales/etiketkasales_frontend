import classes from "./profile.module.scss";
import ProfileAside from "./aside";
import ProfileContent from "./content";
import { IProfile, UserRoleType } from "~/src/features/user/model";
import { ProfileActionType } from "~/src/entities/profile-section/model";

interface Props {
  userRole: UserRoleType | "seller-pending";
  activeSection: ProfileActionType | null;
  onItemClick: (s: string) => void;
  setModalActive: (type: ProfileActionType) => void;
  loaded: boolean;
  userInfo: IProfile;
}

export default function ProfileSection({
  userRole,
  activeSection,
  onItemClick,
  setModalActive,
  loaded,
  userInfo,
}: Props) {
  return (
    <div className={`flex-row ${classes.container}`}>
      <ProfileAside
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={setModalActive}
      />
      <ProfileContent
        activeSection={activeSection}
        loaded={loaded}
        userInfo={userInfo}
      />
    </div>
  );
}
