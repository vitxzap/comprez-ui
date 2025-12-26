import { Navbar } from "@/components/navbar/navbar";
import { VideoCard } from "@/components/video/card";
import { Preview } from "@/components/video/preview/card";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex px-48 w-full h-4/6 gap-6">
        <VideoCard />
        <Preview />
      </div>
    </div>
  );
}
