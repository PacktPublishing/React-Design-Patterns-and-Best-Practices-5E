import ProfileForm from "@/components/ProfileForm"

export default function ProfileFormPage() {
  // In a real app, get userId from session
  const userId = "demo-user-id"

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Update Profile</h1>
        <p className="text-muted-foreground mb-8 text-center">Form with loading states using useFormStatus</p>
        <ProfileForm userId={userId} />
      </div>
    </div>
  )
}
