"use client";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./header-user.module.scss";
import Icon from "~/public/header/logged-person.svg";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import Container from "~/src/shared/ui/container/ui";

export default function HeaderUser() {
  const { userInfo } = useAppSelector(selectUser);
  return (
    <LinkContainer
      link="/profile"
      className={`flex-row gap-6px align-center ${classes.container}`}
    >
      {userInfo.avatar ? (
        <ImageWrapper
          src={userInfo.avatar}
          width={24}
          height={24}
          className={classes.image}
          alt=""
        />
      ) : (
        <Container bgColor={"yellow-200"} className={classes.noAvatar}>
          <Icon />
        </Container>
      )}
      <p className={`text-body l text-neutral-700 ${classes.text}`}>
        {userInfo.name || `User ${userInfo.id}`}
      </p>
    </LinkContainer>
  );
}
