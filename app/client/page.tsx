import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    phone?: string;
  }>;
};

export default async function ClientIndexPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const phone =
    params.phone || "";

  redirect(
    `/client/solicitar?phone=${encodeURIComponent(
      phone
    )}`
  );
}