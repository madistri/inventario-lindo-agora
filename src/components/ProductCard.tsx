import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Package, AlertCircle } from "lucide-react";

interface ProductCardProps {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
}

export const ProductCard = ({ name, sku, category, quantity, minQuantity, price }: ProductCardProps) => {
  const isLowStock = quantity <= minQuantity;
  const stockPercentage = (quantity / (minQuantity * 3)) * 100;

  return (
    <Card className="p-5 gradient-card shadow-elegant hover:shadow-xl transition-smooth group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">SKU: {sku}</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Quantidade</span>
          <div className="flex items-center gap-2">
            {isLowStock && <AlertCircle className="w-4 h-4 text-warning" />}
            <span className={`font-semibold ${isLowStock ? "text-warning" : "text-foreground"}`}>
              {quantity} un
            </span>
          </div>
        </div>

        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isLowStock ? "bg-warning" : "bg-success"
            }`}
            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">Valor Unit.</span>
          <span className="font-semibold text-primary">
            R$ {price.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};
