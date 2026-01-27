import { getProductById } from "~/src/entities/etiketka/lib/api/etiketka.api";

import EtiketkaPage from "~/src/pages-components/etiketka/ui";
import { IEtiketka } from "~/src/entities/etiketka/model";
import { productSkeleton } from "~/src/entities/etiketka/model/etiketka.skeleton";

export const dynamic = "force-dynamic";

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
