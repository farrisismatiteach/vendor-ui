import { Vendors } from "@/api/types";
import { getVendors } from "@/api/vendors";
import Main from "@/components/main";
import { vendorsSort } from "@/helpers/utils";

interface HomeProps {
  initVendors: Vendors;
}

export default function Home({ initVendors }: HomeProps) {
  return (
    <Main initVendors={initVendors} />
  )
}

export async function getStaticProps() {
  let vendors: Vendors | Error;

  try {
    vendors = await getVendors<Vendors>(14);
    vendors.Items = vendorsSort(vendors.Items);
  } catch(e) {
    if (e instanceof Error) {
      vendors = { Items: [], count: 0, lastEvaluatedKey: null }
    }
    throw new Error('getVendors unexepected Error');
  }

  return {
    props: {
      initVendors: vendors
    },
    revalidate: 60,
  }
}