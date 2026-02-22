"use client";
import classNames from "classnames";
import { useChangeAvatar } from "~/src/entities/profile-section/lib/hooks";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./company-avatar.module.scss";
import CompanyProfileAvatarNoImage from "./no-image";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import Button from "~/src/shared/ui/button";
import FileInput from "~/src/shared/ui/inputs/file";

interface Props {
  initCompanyAvatar: string | null;
}

export default function CompanyProfileAvatar({ initCompanyAvatar }: Props) {
  const { loadingData } = useAppSelector(selectUser);
  const { inputRef, onFileLoad, fileLoading } = useChangeAvatar();

  return (
    <>
      <Button
        typeButton="ghost"
        justifyCenter={false}
        needActiveScale={false}
        className={classNames(
          "grid-column gap-4 align-center left-element",
          classes.button,
          fileLoading || (loadingData && classes.loading),
        )}
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
        disabled={loadingData || fileLoading}
      >
        {initCompanyAvatar ? (
          <ImageWrapper
            src={initCompanyAvatar}
            width={80}
            height={80}
            alt=""
            className={classes.image}
          />
        ) : (
          <CompanyProfileAvatarNoImage />
        )}
        <span className="text-body l text-neutral-600 underline-front">
          Изменить аватар
        </span>
      </Button>
      <FileInput
        ref={inputRef}
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (!file) return;
          onFileLoad(file);
        }}
        name="profile-avatar"
      />
    </>
  );
}
