import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/settings/profile-form";

export default async function SettingsProfilePage() {
  return (
    <div className="flex flex-col justify-center space-y-6 lg:max-w-xl">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
