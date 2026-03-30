import { VideoPlayer, VideoPlayerContent, VideoPlayerControlBar, VideoPlayerMuteButton, VideoPlayerPlayButton, VideoPlayerSeekBackwardButton, VideoPlayerSeekForwardButton, VideoPlayerTimeDisplay, VideoPlayerTimeRange, VideoPlayerVolumeRange } from "@/components/kibo-ui/video-player";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconDownload, IconRepeat } from "@tabler/icons-react";
import Link from "next/link";

export default function CompressionResult() {
    return (
        <div className="flex flex-col h-full w-full justify-center items-center gap-4">
            <div className="gap-6 flex justify-center max-h-10/12 max-w-10/12">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-bala">
                            Your video is ready!
                        </h1>
                        <Label className="font-normal text-muted-foreground">
                            <p>Your video was compressed from <b>17.0MB</b> to <b>2.0MB</b>.</p>
                        </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant={"default"} size={"lg"}> <IconDownload /> Download it now</Button>
                        <Button variant={"outline"} size={"lg"} render={<Link href={"/"}><IconRepeat /> Compress another video</Link>} />
                    </div>
                </div>
                <AspectRatio ratio={16 / 9} className="max-w-8/12">
                    <VideoPlayer className="overflow-hidden rounded-lg">
                        <VideoPlayerContent
                            crossOrigin=""
                            muted
                            preload="auto"
                            slot="media"
                            src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
                        />
                        <VideoPlayerControlBar>
                            <VideoPlayerPlayButton />
                            <VideoPlayerSeekBackwardButton />
                            <VideoPlayerSeekForwardButton />
                            <VideoPlayerTimeRange />
                            <VideoPlayerTimeDisplay showDuration />
                            <VideoPlayerMuteButton />
                            <VideoPlayerVolumeRange />
                        </VideoPlayerControlBar>
                    </VideoPlayer>
                </AspectRatio>


            </div>
        </div>
    )
}