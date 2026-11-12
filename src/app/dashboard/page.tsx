import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticCard from "@/components/dashboard/StatisticCard";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";
import Announcements from "@/components/dashboard/Announcements";
import UpcomingAgenda from "@/components/dashboard/UpcomingAgenda";
import { stats } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 space-y-5">
        <DashboardHeader />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((s) => <StatisticCard key={s.label} s={s} />)}</div>
        <AttendanceCard />
        <RecentActivities />
      </div>
      <div className="min-w-0 space-y-5">
        <QuickActions />
        <Announcements />
        <UpcomingAgenda />
      </div>
    </div>
  );
}
