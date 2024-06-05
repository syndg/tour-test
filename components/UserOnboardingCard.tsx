import OnboardingProfileForm from "./form/OnboardingProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function UserOnboardingCard() {
  return (
    <Card className="w-full max-w-md rounded-lg shadow-lg dark:bg-gray-800">
      <CardHeader className="space-y-1 border-b px-6 py-5">
        <CardTitle>Add to profile</CardTitle>
        <CardDescription>Add your username and full name.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <OnboardingProfileForm />
      </CardContent>
    </Card>
  );
}
