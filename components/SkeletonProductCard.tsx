import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/react';

const SkeletonProductCard = () => (
  <Card className="h-[270px] w-[310px] shadow-md">
    <CardBody className="items-center justify-center">
      <Skeleton className="h-[110px] w-[110px] rounded-lg" />
    </CardBody>
    <CardFooter className="flex flex-col items-start gap-1">
      <Skeleton className="w-1/2 rounded-md p-1 font-bold" />
      <Skeleton className="w-1/3 rounded-md p-1" />
      <Skeleton className="h-10 w-full rounded-md" />
    </CardFooter>
  </Card>
);

export default SkeletonProductCard;
