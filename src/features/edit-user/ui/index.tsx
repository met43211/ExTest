import Image from "next/image";
import editIcon from "@/src/shared/assets/icons/editIcon.svg";

type Props = {
  id: string;
};

export const EditUser = ({ id }: Props) => {
  const handleEdit = () => {
    //handle edit
  };
  return (
    <button
      style={{ backgroundColor: "rgba(0, 0, 0, 0)", border: "none" }}
      onClick={handleEdit}
    >
      <Image alt={"editIcon"} src={editIcon} />
    </button>
  );
};
