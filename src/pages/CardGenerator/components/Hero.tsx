import { toast } from "sonner";
import {
  CreateCardForm,
  CreditCardComponent,
  Error,
  Loader,
} from "../../../components";
import { useDeleteCardMutation, useGetAllCardsQuery } from "@/store/cards";
import { Item } from "@/types";

const Hero = () => {
  const { data } = useGetAllCardsQuery("");
  const [deleteCard, { isLoading, error }] = useDeleteCardMutation();

  const handleDelete = async (cardId: string) => {
    try {
      await deleteCard(cardId).unwrap();
      toast.success("Card deleted");
    } catch (error) {}
  };

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 mt-12">
      <div className="text-center">
        <h1
          className="flex-1 font-poppins font-semibold ss:text-[72px] text-[35px]
          text-white ss:leading-[100px] leading-[50px]"
        >
          Discover the Future <br className="sm:block hidden" /> {""}
          <span className="text-gradient">of Virtual Cards</span> {""}
        </h1>
      </div>

      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />

      <CreateCardForm />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12">
        {data?.cards?.map((item: Item) => (
          <CreditCardComponent
            key={item.id}
            item={item}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
