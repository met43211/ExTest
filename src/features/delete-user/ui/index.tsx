import Image from "next/image";
import deleteIcon from "@/src/shared/assets/icons/deleteIcon.svg";

type Props = {
  id: string;
};

export const DeleteUser = ({ id }: Props) => {
  const handleDelete = () => {
    //delete user
  };
  return (
    <button
      style={{ backgroundColor: "rgba(0, 0, 0, 0)", border: "none" }}
      onClick={handleDelete}
    >
      <Image alt={"deleteIcon"} src={deleteIcon} />
    </button>
  );
};
