import { Card, CardContent } from "@/shared/components/ui/card";
import { TextAlignStart } from "lucide-react";

export default function Communiity() {

    return(
    <div className="flex flex-col gap-5">
        <div className="text-2xl font-bold">커뮤니티</div>
        <div className="flex gap-10">
        <Card variant="blueSide" className="max-h-60">
            <CardContent  className="flex flex-col justify-start items-start gap-6" >
                <div className="flex gap-3 items-center">
                    <TextAlignStart size={16} strokeWidth={3}/>
                    <div className="font-bold">목록</div>
                </div>
                <div>

                </div>
            </CardContent>
        </Card>
        <Card variant="blueMain" className="min-h-140">
            <CardContent>

            </CardContent>
        </Card>
        </div>
    </div>
    )
}
