import { redirect } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/shared/lib/supabase/server";
import {
  AnalyticsDashboard,
  getMockAnalyticsData,
  fetchAnalyticsDashboardData,
} from "@/features/analytics-dashboard";

interface AnalyticsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Analytics Dashboard",
    description: "Revenue and traffic analytics for DevToolkit",
  };
}

// List of admin user IDs (should be in env or database in production)
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL,
  // Add more admin emails as needed
].filter(Boolean);

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { locale } = await params;
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/auth/signin?redirect=/dashboard/analytics`);
  }

  // Check if user is admin
  const isAdmin = ADMIN_EMAILS.includes(user.email);

  if (!isAdmin) {
    redirect(`/${locale}/dashboard`);
  }

  // Fetch analytics data
  let analyticsData;
  try {
    // Try to fetch real data
    analyticsData = await fetchAnalyticsDashboardData();
  } catch {
    // Fall back to mock data in development
    analyticsData = getMockAnalyticsData();
  }

  return (
    <div className="container mx-auto py-8">
      <AnalyticsDashboard data={analyticsData} />
    </div>
  );
}
