import { useUpdateQueryParam } from "@/src/shared/lib/hooks/use-update-query-params";
import { Button } from "@/src/shared/ui/buttons/button/button";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import { useSearchParams } from "next/navigation";
import arrowIcon from "@/src/shared/assets/icons/arrowIcon.svg";
import Image from "next/image";

type Props = {
  pages: number;
};

export const Pagination = ({ pages }: Props) => {
  const params = useSearchParams();
  const buttons = Array.from({ length: pages }, (_, i) => i + 1).slice(1, -1);
  const currentPage = Number(params.get("page")) || 1;

  const updateParams = useUpdateQueryParam();

  const handleChangePage = (page: number) => {
    updateParams({ page });
  };

  const increment = () => {
    if (currentPage < pages) {
      handleChangePage(currentPage + 1);
    }
  };
  const decrement = () => {
    if (currentPage > 1) {
      handleChangePage(currentPage - 1);
    }
  };

  if (pages < 2) {
    return null;
  }
  return (
    <Flex justifyCenter>
      <Button isIconOnly onClick={decrement}>
        <Image
          alt={"leftArrow"}
          src={arrowIcon}
          style={{ transform: "rotate(90deg)" }}
        />
      </Button>
      <Button
        isIconOnly
        variant={currentPage === 1 ? "primary" : undefined}
        onClick={() => handleChangePage(1)}
      >
        1
      </Button>
      {currentPage > 3 && "...."}
      {buttons.map((button) => {
        if (
          (button - currentPage <= 2 && button - currentPage >= 0) ||
          currentPage - button === 1
        )
          return (
            <Button
              variant={currentPage === button ? "primary" : undefined}
              isIconOnly
              key={button}
              onClick={() => handleChangePage(button)}
            >
              {button}
            </Button>
          );
      })}
      {pages - currentPage > 3 && "...."}
      <Button
        isIconOnly
        variant={currentPage === pages ? "primary" : undefined}
        onClick={() => handleChangePage(pages)}
      >
        {pages}
      </Button>
      <Button isIconOnly onClick={increment}>
        <Image
          alt={"rightArrow"}
          src={arrowIcon}
          style={{ transform: "rotate(-90deg)" }}
        />
      </Button>
    </Flex>
  );
};
