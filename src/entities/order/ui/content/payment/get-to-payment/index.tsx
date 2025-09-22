"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "~/src/shared/ui/button";

interface Props {
  forCompany: boolean;
  licenseAgreed: boolean;
}

interface ButtonI {
  title: string;
  type: "yellow" | "border-bg";
  onClick: () => void;
}

export default function OrderGetToPayment({
  forCompany,
  licenseAgreed,
}: Props) {
  const { push } = useRouter();

  const buttons: ButtonI[] = [
    {
      title: "Оплатить картой",
      type: "yellow",
      onClick: () => {},
    },
    {
      title: "Оплатить по счету",
      type: "border-bg",
      onClick: () => {
        if (!licenseAgreed) return;
        push("/order-as-company/payment/bill");
      },
    },
  ];
  return (
    <div className="flex-column gap-3">
      {forCompany ? (
        buttons.map((button, index) => {
          return (
            <Button
              typeButton={button.type}
              size="12"
              radius={12}
              onClick={button.onClick}
              key={index}
            >
              <p className="black second-family text-16 semibold">
                {button.title}
              </p>
            </Button>
          );
        })
      ) : (
        <Button typeButton={"yellow"} size="12" radius={12} onClick={() => {}}>
          <p className="black semibold text-16 second-family">
            Перейти к оплате
          </p>
        </Button>
      )}
    </div>
  );
}
