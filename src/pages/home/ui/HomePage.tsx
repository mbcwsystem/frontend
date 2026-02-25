import { ScheduleList, UserCalendar, UserProfile } from '@/features/home';
import PayOverview from '@/features/home/ui/PayOverview';
import PageLogo from '@/shared/components/ui/PageLogo';
import { CommunityCard } from '@/widgets/home';
import ContentsCard from '@/widgets/ui/ContentsCard';

const HomePage = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  console.log(year, month);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-5">
      <PageLogo color="purple" />
      <div className="flex flex-col gap-6 lg:flex-row">
        <ContentsCard
          className="w-full lg:w-80 lg:shrink-0"
          profile={<UserProfile />}
          title="정경준"
        >
          {/* TODOS : features 컴포넌트 생성 후 추가 */}
          <UserCalendar />
          <ScheduleList />
        </ContentsCard>
        <div className="w-full flex flex-col gap-6">
          <ContentsCard title="이번달 급여" className="w-full bg-mega-secondary text-white">
            <PayOverview />
          </ContentsCard>
          <CommunityCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
