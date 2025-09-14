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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@beehive/components";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleSubmit = () => {
    console.log("New product:", product);
    setProduct({ name: "", category: "", price: "", stock: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold" style={{ color: "#2C3E50" }}>
            새 상품 등록
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">상품명</Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="상품명을 입력하세요"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">카테고리</Label>
            <Select
              value={product.category}
              onValueChange={(value) => setProduct({ ...product, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="원두/커피">원두/커피</SelectItem>
                <SelectItem value="디저트">디저트</SelectItem>
                <SelectItem value="굿즈">굿즈</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">판매가</Label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              placeholder="판매가를 입력하세요"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">초기 재고</Label>
            <Input
              id="stock"
              type="number"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
              placeholder="초기 재고를 입력하세요"
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
            style={{ backgroundColor: "#FFD54F", color: "white" }}
          >
            등록하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
