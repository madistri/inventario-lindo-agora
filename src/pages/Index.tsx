import { useState } from "react";
import { Package, TrendingUp, AlertTriangle, DollarSign, Search } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { ProductCard } from "@/components/ProductCard";
import { AddProductDialog } from "@/components/AddProductDialog";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Notebook Dell Inspiron",
      sku: "NB-001",
      category: "Eletrônicos",
      quantity: 15,
      minQuantity: 10,
      price: 2500.0,
    },
    {
      id: 2,
      name: "Mouse Logitech MX",
      sku: "MS-002",
      category: "Periféricos",
      quantity: 45,
      minQuantity: 20,
      price: 150.0,
    },
    {
      id: 3,
      name: "Teclado Mecânico RGB",
      sku: "KB-003",
      category: "Periféricos",
      quantity: 8,
      minQuantity: 15,
      price: 350.0,
    },
    {
      id: 4,
      name: "Monitor LG 27''",
      sku: "MN-004",
      category: "Eletrônicos",
      quantity: 22,
      minQuantity: 10,
      price: 1200.0,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.quantity <= p.minQuantity).length;
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StockFlow</h1>
                <p className="text-sm text-muted-foreground">Sistema de Controle de Estoque</p>
              </div>
            </div>
            <AddProductDialog onAddProduct={handleAddProduct} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <StatsCard
            title="Total de Produtos"
            value={totalProducts}
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Valor em Estoque"
            value={`R$ ${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Estoque Baixo"
            value={lowStockProducts}
            icon={AlertTriangle}
            className="border-l-4 border-l-warning"
          />
          <StatsCard title="Movimentações Hoje" value="24" icon={TrendingUp} />
        </div>

        {/* Search and Filter */}
        <div className="mb-6 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos por nome, SKU ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 shadow-md"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Produtos ({filteredProducts.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou adicione um novo produto
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
