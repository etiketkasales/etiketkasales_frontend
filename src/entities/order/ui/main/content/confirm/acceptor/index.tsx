"use client";
import { useAcceptor } from "~/src/entities/order/lib/hooks/useAcceptor.hook";
import classNames from "classnames";

import classes from "./acceptor.module.scss";
import OrderContainer from "../../container";
import NewOrderInputs from "./inputs";
import Button from "~/src/shared/ui/button";
import UserCompany from "~/src/entities/user-company/ui";
import RadioButton from "~/src/shared/ui/radio-button/ui";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
}

export default function OrderAcceptor({ type }: Props) {
  const {
    canChange,
    setCanChange,
    receiver,
    onInputChange,
    chosenCompany,
    companies,
    selectCompany,
    onButtonClick,
  } = useAcceptor();

  return (
    <OrderContainer
      title="Получатель"
      className={`flex-column ${classes.container}`}
    >
      {type === "company" ? (
        <>
          {companies.length === 0 ? (
            <Button
              typeButton="yellow"
              onClick={onButtonClick}
              className={classes.button}
              href="/profile/buyer?active_section=companies"
              radius={12}
            >
              <span className="heading h7">Добавить организацию</span>
            </Button>
          ) : (
            <>
              <ul className={`flex-column ${classes.companies}`}>
                {companies.map((company) => {
                  const isActive = chosenCompany?.id === company.id;

                  return (
                    <li
                      key={company.id}
                      className={classNames(classes.companyItem, {
                        pointer: companies.length > 1,
                      })}
                      onClick={() => {
                        if (companies.length > 1) {
                          selectCompany(company.id);
                        }
                      }}
                    >
                      {companies.length > 1 && (
                        <RadioButton isActive={isActive} />
                      )}
                      <UserCompany {...company} as="div" />
                    </li>
                  );
                })}
              </ul>
              <Button
                typeButton="gray-border"
                onClick={onButtonClick}
                className={classes.button}
                href="/profile/buyer?active_section=companies"
                radius={12}
              >
                <span className="heading h7">Добавить ещё организацию</span>
              </Button>
            </>
          )}
        </>
      ) : null}
      <NewOrderInputs
        canChange={canChange}
        receiver={receiver}
        onInputChange={onInputChange}
      />
      <Button
        typeButton="gray"
        onClick={() => setCanChange(!canChange)}
        radius={12}
        className={classes.button}
      >
        <span className="text-body xl">
          {canChange ? "Сохранить" : "Изменить"}
        </span>
      </Button>
    </OrderContainer>
  );
}
