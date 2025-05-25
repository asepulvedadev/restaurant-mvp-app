// src/app/dashboard/profile/page.tsx
import ProfileForm from "@/components/dashboard/ProfileForm";

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Perfil de usuario</h2>
      <ProfileForm />
    </div>
  );
}
