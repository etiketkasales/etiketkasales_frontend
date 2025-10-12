import { getProductById } from "~/src/entities/etiketka/lib/api/etiketka.api";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";
import { productSkeleton } from "~/src/entities/etiketka/model/etiketka.skeleton";
import EtiketkaPage from "~/src/pages-components/etiketka/ui";

interface IParams {
  slug: string;
  id: string;
}

export default async function Page({ params }: { params: Promise<IParams> }) {
  const { id } = await params;
  let initEtiketka: IEtiketka = productSkeleton;
  try {
    const res = await getProductById(Number(id));
    initEtiketka = res;
  } catch (err) {
    console.error(err);
  }

  return <EtiketkaPage initProductInfo={initEtiketka} />;
}
