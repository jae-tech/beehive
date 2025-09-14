import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
} from "@beehive/components";

interface Category {
  id: number;
  name: string;
  count: number;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "원두/커피", count: 12 },
    { id: 2, name: "디저트", count: 8 },
    { id: 3, name: "굿즈", count: 15 },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory.trim(),
          count: 0,
        },
      ]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold" style={{ color: "#2C3E50" }}>
            카테고리 관리
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-6 flex items-center space-x-2">
            <Input
              placeholder="새 카테고리 이름"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAddCategory}
              className="!rounded-button whitespace-nowrap"
              style={{ backgroundColor: "#FFD54F", color: "white" }}
            >
              추가
            </Button>
          </div>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center space-x-3">
                  <i className="fas fa-tag text-gray-400"></i>
                  <div>
                    <div className="font-medium" style={{ color: "#2C3E50" }}>
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-500">등록된 상품 {category.count}개</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="!rounded-button whitespace-nowrap">
                    <i className="fas fa-pen"></i>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="!rounded-button whitespace-nowrap"
                    style={{
                      color: "#E57373",
                      borderColor: "#E57373",
                    }}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="!rounded-button whitespace-nowrap"
            style={{ backgroundColor: "#FFD54F", color: "white" }}
          >
            완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
