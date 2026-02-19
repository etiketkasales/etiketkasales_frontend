"use client";
import { useLoginFinalStage } from "../lib/hooks";

import LoginWrapper from "~/src/features/login/ui/wrapper";
import LoginFinalStageInput from "./input";
import LoginFinalStageCheckbox from "./checkbox";
import Button from "~/src/shared/ui/button";
import { loginFinalStageInputs } from "../model";

// Этот компонент отдельно от остального логина, потому что у него совсем другая логика
export default function LoginFinalStage() {
  const {
    userInfo,
    onInputChange,
    onSave,
    loading,
    error,
    agreementAccepted,
    setAgreementAccepted,
  } = useLoginFinalStage();

  return (
    <LoginWrapper title={"Завершение"}>
      <div className="flex-column gap-2">
        {loginFinalStageInputs.map((item, index) => (
          <LoginFinalStageInput
            key={`${index}-${item.field}`}
            {...item}
            userInfo={userInfo}
            onChange={onInputChange}
            error={error}
            loading={loading}
          />
        ))}
      </div>
      <LoginFinalStageCheckbox
        checked={agreementAccepted}
        onChange={(c) => setAgreementAccepted(c)}
        error={error}
      />
      <Button
        typeButton="yellow"
        onClick={onSave}
        size="12"
        radius={12}
        disabled={error !== null || loading}
      >
        <span className="heading h7">Зарегистрироваться</span>
      </Button>
    </LoginWrapper>
  );
}
