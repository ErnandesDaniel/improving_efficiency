import CrmLayout from '@/modules/crm/components/layout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CrmLayout>{children}</CrmLayout>;
}
