import SessionGuard from "../../components/auth/SessionGuard";
import { SignOutButton } from "../../components/auth/SignOutButton";

export default function DashboardPage() {
  return (
    <SessionGuard>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome to Dashboard 🚀</h1>
        <SignOutButton />
        {/* Add any components here */}
        <p className="mt-4 text-gray-600">This is your dashboard content.</p>
      </div>
    </SessionGuard>
  );
}
