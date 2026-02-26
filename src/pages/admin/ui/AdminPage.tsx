import { HolidayManagement, InsuranceRateManagement, UserManagement } from '@/features/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

const tabTriggerClass =
  'flex-1 rounded-lg text-sm data-[state=active]:bg-mega-secondary data-[state=active]:text-white data-[state=active]:shadow-sm';

const AdminPage = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-5">
      <Tabs defaultValue="holiday">
        <TabsList className="w-full h-12 rounded-xl bg-white border border-mega-gray-light p-1 mb-4">
          <TabsTrigger value="holiday" className={tabTriggerClass}>
            공휴일 관리
          </TabsTrigger>
          <TabsTrigger value="users" className={tabTriggerClass}>
            직원 관리
          </TabsTrigger>
          <TabsTrigger value="insurance" className={tabTriggerClass}>
            4대 보험 요율
          </TabsTrigger>
        </TabsList>

        <div className="bg-white rounded-xl border border-mega-gray-light p-6">
          <TabsContent value="holiday" className="mt-0">
            <HolidayManagement />
          </TabsContent>
          <TabsContent value="users" className="mt-0">
            <UserManagement />
          </TabsContent>
          <TabsContent value="insurance" className="mt-0">
            <InsuranceRateManagement />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdminPage;
