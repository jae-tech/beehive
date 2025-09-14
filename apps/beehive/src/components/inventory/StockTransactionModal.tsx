import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Label,
} from "@beehive/components";

interface Product {
  name: string;
  stock: number;
}

interface StockTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  type: "in" | "out";
}

export const StockTransactionModal: React.FC<StockTransactionModalProps> = ({
  isOpen,
  onClose,
  product,
  type,
}) => {
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!product || !quantity) return;

    const quantityValue = type === "in" ? parseInt(quantity) : -Math.abs(parseInt(quantity));

    console.log("Stock update:", {
      productName: product.name,
      quantity: quantityValue,
      note,
      type: type === "in" ? "입고" : "출고",
    });

    setQuantity("");
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold" style={{ color: "#2C3E50" }}>
            {type === "in" ? "입고 등록" : "출고 등록"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {product && (
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <Label className="text-sm text-gray-500">상품명</Label>
                <div className="mt-1 font-medium" style={{ color: "#1A237E" }}>
                  {product.name}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">현재 재고</Label>
                <div className="mt-1 font-medium">{product.stock}개</div>
              </div>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="quantity">수량</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="수량을 입력하세요"
              min="1"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">비고</Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="비고 사항을 입력하세요"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="!rounded-button whitespace-nowrap">
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            className="!rounded-button whitespace-nowrap"
            style={{
              backgroundColor: type === "in" ? "#4CAF50" : "#E57373",
              color: "white",
            }}
          >
            {type === "in" ? "입고 등록" : "출고 등록"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
