import { Banner, ProductList } from "../components/shared";

export default function Home() {
  return (
    <div className="text-center py-2">
      <Banner />

      <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-6">
        Bem-vindo(a) à Waving Store
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Sua loja online de produtos incríveis
      </p>

      <ProductList />
    </div>
  );
}
