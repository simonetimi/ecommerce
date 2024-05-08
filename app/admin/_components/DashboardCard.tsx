import { Card, CardBody, CardHeader } from '@nextui-org/card';

interface DashboardCardProps {
  title: string;
  description: string;
  content: string;
}

const DashboardCard = ({ title, description, content }: DashboardCardProps) => {
  return (
    <Card className="dark:border dark:border-gray-600/60 dark:bg-slate-700/60">
      <CardHeader className="flex flex-col items-start justify-start">
        <h2 className="text-xl">{title}</h2>
        <p className="text-sm opacity-40">{description}</p>
      </CardHeader>
      <CardBody>
        <p>{content}</p>
      </CardBody>
    </Card>
  );
};

export default DashboardCard;
