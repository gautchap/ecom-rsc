import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function CheckoutLoader() {
  return (
    <Card className="space-y-3 my-5  rounded-3xl p-4 w-[28rem] h-52 py-16">
      <Skeleton className="w-full h-7" />
      <div className="flex">
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-7" />
      </div>
    </Card>
  );
}

export function CartLoader() {
  return (
    <div>
      <div className="border-t-2 border-b-2 py-2 flex items-center justify-between">
        <div>
          <Skeleton className="w-20 h-3 mb-1" />
          <Skeleton className="w-16 h-3" />
        </div>
        <div className="flex gap-7">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
        <Skeleton className="w-16 h-3" />
      </div>
      <div className="py-2 flex items-center justify-between">
        <div>
          <Skeleton className="w-20 h-3 mb-1" />
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-20 h-3" />
        </div>
        <div>
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-20 h-3 mb-1" />
          <Skeleton className="w-16 h-3 mb-1" />
        </div>
      </div>
    </div>
  );
}
