import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <h3>Beehive 소개</h3>
      <p>고객 정보 관리와 재고 추적을 위한 통합 플랫폼</p>
      <ul className="ml-4 mt-2 list-disc">
        <li>고객 정보 등록 및 관리</li>
        <li>재고 현황 실시간 추적</li>
        <li>주문 이력 관리</li>
        <li>통합 대시보드</li>
      </ul>
    </div>
  );
}
