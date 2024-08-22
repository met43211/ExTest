import { HomePage } from "@/src/page/home";
import { getUsers } from "@/src/widgets/users/api/get-users";
import { TOrderBy } from "@/src/widgets/users/model/order-by.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page as string | undefined;
  const search = searchParams?.search as string | undefined;
  const orderBy = searchParams?.orderBy as string | undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", page, search, orderBy],
    queryFn: () => getUsers(page, search, orderBy as TOrderBy),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
