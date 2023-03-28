import { Vendors } from "@/api/types";
import { getVendors } from "@/api/vendors";
import Main from "@/components/main";
import { vendorsSort } from "@/helpers/utils";
import Head from "next/head";

interface HomeProps {
  initVendors: Vendors;
}

export default function Home({ initVendors }: HomeProps) {
  return (
    <>
    <Head>
      <title>Vendors</title>
      <meta name="description" content="serving up food trucks" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main initVendors={initVendors} />
    </>
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