/**
 * src/app/page.tsx
 */
import {HomePageView} from "@/app/_home/homePageView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePageView />
    </main>
  );
}
