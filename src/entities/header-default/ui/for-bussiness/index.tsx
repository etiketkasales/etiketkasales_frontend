import Button from "~/src/shared/ui/button";

export default function HeaderForBussiness() {
  return (
    <Button
      as={"a"}
      href="/for-bussiness"
      typeButton="blue"
      size="4-12"
      radius={8}
    >
      <span className="heading h7 text-blue-100 bold">Для бизнеса</span>
    </Button>
  );
}
