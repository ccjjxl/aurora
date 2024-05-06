import BreadCrumb from "@components/shared/breadcrumb";
import {ScrollArea} from "@components/ui/scroll-area";
import {cn} from "@lib/utils";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
  breadcrumb?: {
    title: string;
    link: string;
  }[];
  scroll?: boolean;
}
const DashboardContainer = (props: Readonly<DashboardContainerProps>) => {
  const {children, className, breadcrumb, scroll} = props;

  const content = (
    <div className={cn("flex-1 space-y-4 p-4 md:p-8 pt-6", className)}>
      {breadcrumb && <BreadCrumb items={breadcrumb} />}
      {children}
    </div>
  );

  return <>{scroll ? <ScrollArea className="h-full">{content}</ScrollArea> : content}</>;
};

export default DashboardContainer;
