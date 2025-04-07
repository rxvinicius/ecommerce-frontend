import ProductForm from "@/components/forms/ProductForm";
import { PageHeader } from "@/components/shared";
import { PackagePlus } from "@/components/ui/icons";
import AdminOnly from "@/components/auth/AdminOnly";

export default function CreateProductPage() {
  return (
    <AdminOnly>
      <div className="flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-8">
          <PageHeader title="Criar Produto" icon={PackagePlus} />
          <ProductForm action="create" />
        </div>
      </div>
    </AdminOnly>
  );
}
