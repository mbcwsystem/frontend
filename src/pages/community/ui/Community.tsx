import { Card, CardContent } from "@/shared/components/ui/card";
import { TextAlignStart } from "lucide-react";

export default function Communiity() {

    return(
    <div className="flex flex-col gap-5 w-full">
        <div className="text-2xl font-bold">커뮤니티</div>
        <div className="flex gap-10">
        <Card variant="blueSide" >
            <CardContent>
                <div className="flex gap-3 items-center">
                    <TextAlignStart size={16} strokeWidth={3}/>
                    <div>목록</div>
                </div>
                
            </CardContent>
        </Card>
        <Card variant="blueMain" >
            <CardContent>

            </CardContent>
        </Card>
        </div>
    </div>
    )
}
