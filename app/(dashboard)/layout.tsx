import { Sidebar } from "@/components/ui/Sidebar";
import { SidebarContainer } from "@/components/ui/SidebarContainer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh">
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <main className="flex flex-col flex-1 min-w-0">{children}</main>
    </div>
  );
}
