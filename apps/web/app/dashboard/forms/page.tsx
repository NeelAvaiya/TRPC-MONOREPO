import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import { LoginForm } from "~/components/login-form"
import { SignupForm } from "~/components/signup-form"
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export default function FormsPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div>
                <h1 className="text-3xl font-bold">Forms</h1>
                <p className="text-muted-foreground mt-2">
                  Collection of form examples and templates
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Login Form</CardTitle>
                    <CardDescription>
                      Sign in with your email and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sign Up Form</CardTitle>
                    <CardDescription>
                      Create a new account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SignupForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
