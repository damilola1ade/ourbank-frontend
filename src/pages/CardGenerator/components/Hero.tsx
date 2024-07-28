import { toast } from "sonner";
import { SimpleGrid } from "@chakra-ui/react";
import {
  CreateCardForm,
  CreditCardComponent,
  Error,
  Loader,
  MobileCreditCardComponent,
} from "../../../components";
import { useDeleteCardMutation, useGetAllCardsQuery } from "@/store/cards";
import { Item } from "@/types";
import { useGetUserDetails } from "@/hooks/useGetUserDetails";

const Hero = () => {
  const { data } = useGetAllCardsQuery("");

  const [deleteCard, { isLoading, error }] = useDeleteCardMutation();

  const { user } = useGetUserDetails();

  const handleDelete = async (cardId: { body: any; cardId: string }) => {
    try {
      await deleteCard(cardId).unwrap();
      toast.success("Card deleted");
    } catch (error) {}
  };

  const limitReached = data?.cards?.length === 2;

  if (limitReached) {
    toast.info("Maximum number of cards created");
  }

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 mt-12">
      <div className="text-center">
        <h1
          className="flex-1 font-poppins font-semibold ss:text-[72px] text-[28px]
          text-white ss:leading-[100px] leading-[50px]"
        >
          Welcome, <br className="sm:block hidden" /> {""}
          <span className="text-gradient">{user?.name || ""}</span> 
        </h1>
      </div>

      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />

      {limitReached ? null : <CreateCardForm />}

      {/*Large screen credit card component*/}
      <SimpleGrid
        columns={[1, 1, 2]}
        spacing={12}
        display={{ base: "none", md: "flex" }}
      >
        {data?.cards?.map((item: Item) => (
          <CreditCardComponent
            key={item.id}
            item={item}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </SimpleGrid>

      {/*Mobile screen credit card component*/}
      <SimpleGrid
        columns={1}
        spacing={8}
        display={{ base: "grid", md: "none" }}
      >
        {data?.cards?.map((item: Item) => (
          <MobileCreditCardComponent
            key={item.id}
            item={item}
            handleDelete={() => handleDelete(item.id)}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Hero;
