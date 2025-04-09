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
npm install
```

### 3. Configure `.env`

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
# URL da API do backend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Ou, se preferir testar com a API hospedada:

```bash
NEXT_PUBLIC_API_URL=https://ecommerce-rx-vinicius.koyeb.app
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

> ❗ Nota: me confundi durante a criação inicial do projeto e acabei organizando toda a estrutura dentro de `src/app`, o que foge das boas práticas comuns. Em um cenário real, eu reorganizaria as pastas conforme mostrado acima, mas como o tempo para o desafio era curto, optei por manter como estava para focar nas funcionalidades e na experiência do usuário.

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
