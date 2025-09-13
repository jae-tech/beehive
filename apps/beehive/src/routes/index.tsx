import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Beehive 고객 및 재고 관리 시스템</h3>
      <p>소규모 창업자를 위한 통합 관리 솔루션입니다.</p>
    </div>
  );
}
