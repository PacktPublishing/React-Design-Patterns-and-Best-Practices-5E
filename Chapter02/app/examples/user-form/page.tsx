import UserForm from "@/components/UserForm"

export default function UserFormPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Create User</h1>
        <p className="text-muted-foreground mb-8 text-center">Basic form submission using Server Actions</p>
        <UserForm />
      </div>
    </div>
  )
}
