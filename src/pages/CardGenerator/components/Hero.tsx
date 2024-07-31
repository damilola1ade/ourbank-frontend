import { SimpleGrid } from "@chakra-ui/react";
import { useGetAllCardsQuery } from "@/store/cards";

import { useAppSelector } from "@/hooks/RTKHooks";

import {
  CreateCardForm,
  CreditCardComponent,
  Loader,
  Error,
  AlertModal,
} from "@/components";

import { Item } from "@/types";

const Hero = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useGetAllCardsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const limitReached = data?.cards?.length === 2;

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
          <span className="text-gradient">{user?.name}</span>
        </h1>
      </div>

      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />

      {limitReached ? null : <CreateCardForm />}

      <SimpleGrid display={{base: 'block', lg:'flex'}} columns={[1, 1, 2]} spacing={{ base: 4, lg: 24 }}>
        {data?.cards?.map((item: Item) => (
          <CreditCardComponent key={item.id} item={item} />
        ))}
      </SimpleGrid>

      {data?.cards?.length > 0 && <AlertModal />}
    </div>
  );
};

export default Hero;
