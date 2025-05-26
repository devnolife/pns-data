"use client"

import { GuestbookForm } from "@/components/common/guestbook-form"
import { PageHeader } from "@/components/common/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/i18n"

export default function GuestbookPage() {
  // Mock recent entries
  const recentEntries = [
    {
      id: "1",
      name: "Budi Santoso",
      institution: "Kementerian Pendidikan",
      membership: "PKP",
      purpose: t("guestbook.purposes.references"),
      date: "2024-05-19T10:30:00",
    },
    {
      id: "2",
      name: "Siti Rahayu",
      institution: "Badan Pelayanan Publik",
      membership: "CPNS Latsar Participant",
      purpose: t("guestbook.purposes.visiting"),
      date: "2024-05-18T14:45:00",
    },
    {
      id: "3",
      name: "Ahmad Hidayat",
      institution: "Pemerintah Daerah",
      membership: "Guest",
      purpose: "Others",
      purposeOther: t("guestbook.purposes.research"),
      date: "2024-05-17T09:15:00",
    },
  ]

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "PKP":
        return <Badge className="bg-green-100 text-green-800">{t("guestbook.membership.PKP")}</Badge>
      case "PKA":
        return <Badge className="bg-purple-100 text-purple-800">{t("guestbook.membership.PKA")}</Badge>
      case "PKN":
        return <Badge className="bg-orange-100 text-orange-800">{t("guestbook.membership.PKN")}</Badge>
      case "CPNS Latsar Participant":
        return <Badge className="bg-blue-100 text-blue-800">{t("guestbook.membership.CPNS")}</Badge>
      case "Pusjar Employee":
        return <Badge className="bg-teal-100 text-teal-800">{t("guestbook.membership.employee")}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{t("guestbook.membership.guest")}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <PageHeader
        heading={t("guestbook.pageTitle")}
        subheading={t("guestbook.pageDescription")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("guestbook.signGuestbook")}</CardTitle>
          </CardHeader>
          <CardContent>
            <GuestbookForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{t("guestbook.recentVisitors")}</h2>
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
                          {new Date(entry.date).toLocaleDateString("id-ID")} {t("common.at")}{" "}
                          {new Date(entry.date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{t("common.purpose")}:</span>{" "}
                      {entry.purpose === "Others" && entry.purposeOther
                        ? entry.purposeOther
                        : entry.purpose}
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
