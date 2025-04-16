# 🛍️ Ecommerce Frontend – Next.js + React Query

Este é o frontend da aplicação **Ecommerce** desenvolvida como parte do **desafio técnico da WavingTest**. A interface foi construída com **Next.js**, estilizada com **TailwindCSS** e utiliza **React Query** para gerenciamento de dados assíncronos. O projeto visa oferecer uma experiência fluida tanto para usuários finais quanto para administradores.

---

## 🚀 Deploy em Produção

> A aplicação está disponível em produção na Vercel:

🔗 **https://ecommerce-frontend-phi-nine.vercel.app**

---

## 📦 Funcionalidades Implementadas

### 👤 Área do Cliente

- Cadastro e login de usuário
- Listagem e visualização de produtos
- Página de detalhes do produto
- Carrinho de compras (com `localStorage`)
- Checkout com formulário de cartão de crédito
- Tela de sucesso com animações
- Tela "Meus pedidos"

### 🔐 Área Administrativa

- Login como ADMIN
- Listagem e gerenciamento de produtos (CRUD)
- Upload de múltiplas imagens com preview
- Listagem de pedidos com dados dos clientes

---

## 🔧 Tecnologias Utilizadas

- **Next.js 15** – Estrutura do frontend
- **React 19**
- **TailwindCSS 4** – Estilização moderna e responsiva
- **Shadcn/ui** – Componentes acessíveis e customizáveis
- **React Query** – Gerenciamento de cache e dados assíncronos
- **React Hook Form + Zod** – Validação e manipulação de formulários
- **Lucide-react** – Ícones modernos
- **Canvas-confetti** – Efeitos visuais
- **Vercel** – Deploy automatizado

---

## 💾 Gerenciamento de Sessões

Para simplificação e agilidade no desenvolvimento, utilizei o **`localStorage`** para armazenar os dados do usuário logado e gerenciar sessões no cliente.  
Embora não seja a forma mais segura de proteger rotas, foi a estratégia escolhida para **cumprir o escopo no prazo** e manter a experiência fluida.

---

## 🧪 Acesso de Teste (Produção)

### 👑 Conta ADMIN

- Email: **admin@admin.com**
- Senha: **123456**

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/rxvinicius/ecommerce-frontend.git
cd ecommerce-frontend
```

### 2. Instale as dependências

```bash
npm install --legacy-peer-deps
```

> ⚠️ **Nota técnica**: foi necessário utilizar a flag `--legacy-peer-deps` devido à dependência `react-credit-cards@0.8.3`, que ainda não oferece suporte ao React 19.
> Essa abordagem **NÃO** é recomendada para produção, mas neste desafio técnico ela não causa problemas de funcionamento e foi adotada para manter a compatibilidade e o foco nas funcionalidades.

> 📌 Futuramente, irei substituir essa biblioteca por uma alternativa compatível como `react-credit-cards-2`, garantindo maior aderência às boas práticas.

### 3. Configure `.env`

Renomeie o arquivo `.env.example` para `.env`:

```bash
mv .env.example .env
```

No arquivo .env, defina a URL da API que deseja utilizar:

```env
NEXT_PUBLIC_API_URL=https://ecommerce-rx-vinicius.koyeb.app
# Ou, para ambiente local:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Rode o projeto

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 📁 Estrutura do Projeto

```bash
src/
├── app/                   # Páginas e rotas com App Router
├── components/            # Componentes reutilizáveis
├── hooks/                 # Hooks customizados
├── api/                   # Serviços e chamadas HTTP
├── lib/                   # Helpers e validações
├── constants/             # Chaves e nomes padrão
├── utils/                 # Utilitários (cartStorage, etc)
└── types/                 # Tipagens globais
```

## ⚠️ Observações Técnicas

- Sessões e carrinho são armazenados via localStorage
- As permissões de rota são validadas no client-side
- Ainda não foram implementados testes unitários por falta de tempo, mas a estrutura está preparada para isso

## 🙋‍♂️ Desenvolvido por

Vinicius Rodrigues Xavier

## 💬 Contato

Fique à vontade para entrar em contato:

- ✉️ vinicius-rodrigues2000@hotmail.com
- 📞 (14) 99848-1539
