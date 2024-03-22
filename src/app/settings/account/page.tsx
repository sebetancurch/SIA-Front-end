import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/app/settings/account/account-form";

export default function SettingsAccountPage() {
  return (
    <div className="flex flex-col justify-center space-y-6 lg:max-w-xl">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
