import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center space-y-6 lg:max-w-xl">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="space-y-8">
        <div className="space-y-2">
          <label>Username</label>
          <Skeleton className="h-12" />
          <span className="text-sm">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </span>
        </div>
        <div className="space-y-2">
          <label>Email</label>
          <Skeleton className="h-12" />
          <span className="text-sm">
            You can manage verified email addresses in your{" "}
            <Link href="/examples/forms">email settings</Link>.
          </span>
        </div>
        <div className="space-y-2">
          <label>Bio</label>
          <Skeleton className="h-20" />
          <span className="text-sm">
            You can <span>@mention</span> other users and organizations to link
            to them.
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label>URLs</label>
            <span className="text-sm">
              Add links to your website, blog, or social media profiles.
            </span>
          </div>
          <Skeleton className="h-8" />
        </div>
      </div>
    </div>
  );
}
