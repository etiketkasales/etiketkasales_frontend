import ProfileContentContainer from "../container";

export default function ProfileContentFallback() {
  return (
    <ProfileContentContainer
      title="Что-то пошло не так :("
      className="flex-column gap-5"
    >
      <h6 className="heading h7 text-neutral-800">
        Попробуйте перезагрузить страницу
      </h6>
    </ProfileContentContainer>
  );
}
