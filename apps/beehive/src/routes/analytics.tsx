import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@beehive/components";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <Layout initialMenu="analytics">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
            판매 분석
          </h1>
          <p className="mt-2 text-gray-600">사업 성과를 분석하고 인사이트를 얻으세요</p>
        </div>

        {/* Coming Soon */}
        <div className="flex min-h-[400px] items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "#FFD54F20" }}
              >
                <i className="fas fa-chart-line text-2xl" style={{ color: "#FFD54F" }}></i>
              </div>
              <CardTitle className="text-xl" style={{ color: "#2C3E50" }}>
                준비 중입니다
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                판매 분석 기능은 현재 개발 중입니다.
                <br />곧 다양한 분석 차트와 리포트를 제공할 예정입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
