"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientUserProfile from "@/components/examples/client-user-profile"
import ServerUserProfile from "@/components/examples/server-user-profile"

export default function UserProfilePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">User Profile: Client vs Server</h1>
        <p className="text-muted-foreground mb-8">
          Compare the traditional Client Component approach with the modern Server Component pattern.
        </p>

        <Tabs defaultValue="server" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="server">Server Component</TabsTrigger>
            <TabsTrigger value="client">Client Component</TabsTrigger>
          </TabsList>

          <TabsContent value="server" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Server Component Implementation</CardTitle>
                <CardDescription>Data fetched on the server, no JavaScript sent to client</CardDescription>
              </CardHeader>
              <CardContent>
                <ServerUserProfile userId="1" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Component Implementation</CardTitle>
                <CardDescription>Traditional approach with useState and useEffect</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientUserProfile userId="1" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
