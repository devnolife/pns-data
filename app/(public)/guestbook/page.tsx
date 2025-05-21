import { GuestbookForm } from "@/components/common/guestbook-form"
import { PageHeader } from "@/components/common/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GuestbookPage() {
  // Mock recent entries
  const recentEntries = [
    {
      id: "1",
      name: "John Doe",
      institution: "Ministry of Education",
      membership: "PKP",
      purpose: "Looking for references",
      date: "2024-05-19T10:30:00",
    },
    {
      id: "2",
      name: "Jane Smith",
      institution: "Public Service Agency",
      membership: "CPNS Latsar Participant",
      purpose: "Visiting",
      date: "2024-05-18T14:45:00",
    },
    {
      id: "3",
      name: "Robert Johnson",
      institution: "Local Government",
      membership: "Guest",
      purpose: "Others",
      purposeOther: "Research collaboration",
      date: "2024-05-17T09:15:00",
    },
  ]

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "PKP":
        return <Badge className="bg-green-100 text-green-800">PKP</Badge>
      case "PKA":
        return <Badge className="bg-purple-100 text-purple-800">PKA</Badge>
      case "PKN":
        return <Badge className="bg-orange-100 text-orange-800">PKN</Badge>
      case "CPNS Latsar Participant":
        return <Badge className="bg-blue-100 text-blue-800">CPNS Latsar</Badge>
      case "Pusjar Employee":
        return <Badge className="bg-teal-100 text-teal-800">Pusjar Employee</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Guest</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader
        heading="Digital Collection Guestbook"
        text="Please fill out our guestbook before accessing the digital collections"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Sign the Guestbook</CardTitle>
          </CardHeader>
          <CardContent>
            <GuestbookForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Recent Visitors</h2>
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{entry.name}</h3>
                      <p className="text-sm text-gray-500">{entry.institution}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {getMembershipBadge(entry.membership)}
                        <span className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString()} at{" "}
                          {new Date(entry.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Purpose:</span>{" "}
                      {entry.purpose === "Others" && entry.purposeOther
                        ? entry.purposeOther
                        : entry.purpose.replace("_", " ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
