import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUpdateQueryParam = () => {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  return (newParams: Record<string, string | number>) => {
    const updatedParams = new URLSearchParams(params.toString());

    Object.keys(newParams).forEach((key) => {
      updatedParams.set(key, newParams[key].toString());
    });

    const newUrl = `${path}?${updatedParams.toString()}`;
    router.push(newUrl);
  };
};
