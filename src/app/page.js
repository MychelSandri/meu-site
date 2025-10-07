// 3Dreams Impressões - Next.js starter
// Projeto inicial em Next.js + React (padrão App Router / pages)
// Estrutura proposta (coloque dentro de uma pasta `3dreams-nextjs`):

/*
package.json (resumo)
{
  "name": "3dreams-nextjs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "swr": "1.3.0"
  }
}
*/

// =========================
// /pages/_app.js
// =========================
import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>3Dreams Impressões</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// =========================
// /pages/index.js
// =========================
import Link from 'next/link'
import Image from 'next/image'
import products from '../data/products'

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <Image src="/logo.png" alt="3Dreams" width={140} height={80} />
        </div>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/loja">Loja</Link>
          <Link href="/personalize">Personalize</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>3Dreams Impressões — Crie em 3D o seu mundo</h1>
          <p>Produtos impressos em 3D — personalizados ou em estoque. Rápido, confiável e com acabamento de qualidade.</p>
          <Link href="/personalize"><a className="cta">Peça seu item personalizado</a></Link>
        </section>

        <section className="featured">
          <h2>Mais pedidos</h2>
          <div className="grid">
            {products.slice(0,4).map(p => (
              <div key={p.id} className="card">
                <Image src={p.image} alt={p.title} width={240} height={160} />
                <h3>{p.title}</h3>
                <p className="price">R$ {p.price}</p>
                <Link href={`/loja`}><a className="btn">Comprar</a></Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} 3Dreams Impressões • WhatsApp: (46) 99909-9065 • (42) 99829-6382</p>
      </footer>
    </div>
  )
}

// =========================
// /pages/loja.js
// =========================
import products from '../data/products'
import Image from 'next/image'
import Link from 'next/link'

export default function Loja(){
  return (
    <div className="container">
      <header className="header">
        <Link href="/"><a>Voltar</a></Link>
      </header>

      <main>
        <h1>Catálogo</h1>
        <div className="grid">
          {products.map(p => (
            <article key={p.id} className="card">
              <Image src={p.image} alt={p.title} width={320} height={220} />
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p className="price">R$ {p.price}</p>
              <a className="btn" href={`https://wa.me/5546${cleanPhone('46999099065')}?text=${encodeURIComponent(generateMessage(p))}`} target="_blank" rel="noreferrer">Comprar via WhatsApp</a>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

function cleanPhone(phone){
  return phone.replace(/\D/g,'')
}
function generateMessage(p){
  return `Olá, quero comprar o produto *${p.title}* (ID ${p.id}) — preço R$${p.price}. Me avise como proceder.`
}

// =========================
// /pages/personalize.js
// =========================
import { useState } from 'react'

export default function Personalize(){
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [color, setColor] = useState('Cinza')
  const [size, setSize] = useState('Médio')

  function submitToWhats(){
    const phone = '5546999099065' // default primary (46 99909-9065)
    const message = `Olá, sou ${name || 'Cliente'} e quero um item personalizado.\nProduto: ${desc}\nCor: ${color}\nTamanho: ${size}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="container">
      <header className="header"><h2>Personalize o seu</h2></header>
      <main>
        <form onSubmit={(e)=>{e.preventDefault(); submitToWhats()}} className="form">
          <label>Seu nome (opcional)
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" />
          </label>
          <label>Descreva o item desejado
            <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Ex: chaveiro em formato X" required />
          </label>
          <label>Cor
            <select value={color} onChange={e=>setColor(e.target.value)}>
              <option>Cinza</option>
              <option>Preto</option>
              <option>Branco</option>
            </select>
          </label>
          <label>Tamanho
            <select value={size} onChange={e=>setSize(e.target.value)}>
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
            </select>
          </label>

          <label>Observações (ou link para STL)
            <input placeholder="Observações ou link para arquivo STL" />
          </label>

          <button className="cta" type="submit">Enviar pedido via WhatsApp</button>
        </form>
      </main>
    </div>
  )
}

// =========================
// /pages/sobre.js
// =========================
export default function Sobre(){
  return (
    <div className="container">
      <header className="header"><h2>Sobre a 3Dreams Impressões</h2></header>
      <main>
        <p>Somos uma pequena oficina de impressão 3D especializada em peças personalizadas e produtos em estoque. Priorizamos acabamento e entrega rápida.</p>
      </main>
    </div>
  )
}

// =========================
// /pages/contato.js
// =========================
export default function Contato(){
  return (
    <div className="container">
      <header className="header"><h2>Contato</h2></header>
      <main>
        <p>WhatsApp: (46) 99909-9065 • (42) 99829-6382</p>
        <p>Instagram: <a href="https://instagram.com/3dreams_impress">@3dreams_impress</a></p>
      </main>
    </div>
  )
}

// =========================
// /data/products.js
// =========================
const products = [
  { id: 'C001', title: 'Chaveiro Bicicleta 6cm', description: 'Chaveiro 3D, leve e resistente.', price: 15, image: '/produtos/chaveiro1.jpg' },
  { id: 'M001', title: 'Miniatura Carro', description: 'Miniatura detalhada, ideal para decoração.', price: 45, image: '/produtos/mini_carro.jpg' },
  { id: 'S001', title: 'Suporte Celular', description: 'Suporte prático para mesa.', price: 35, image: '/produtos/suporte.jpg' },
  { id: 'K001', title: 'Keycap Personalizado', description: 'Keycap compatível com mecanico, personalizado.', price: 30, image: '/produtos/keycap.jpg' }
]

export default products

// =========================
// /styles/globals.css
// =========================
:root{
  --bg: #f6f6f6;
  --surface: #ffffff;
  --text: #111111;
  --muted: #6b6b6b;
  --accent: #2b2b2b; /* tons de cinza/preto */
}

*{box-sizing:border-box}
body{font-family:Inter, system-ui, Arial, sans-serif; background:var(--bg); color:var(--text); margin:0}
.container{max-width:1100px;margin:0 auto;padding:20px}
.header{display:flex;justify-content:space-between;align-items:center}
.header nav a{margin-left:16px;text-decoration:none;color:var(--accent)}
.hero{background:linear-gradient(180deg, #fff, #f3f3f3);padding:40px;border-radius:12px;margin:20px 0}
.cta{display:inline-block;margin-top:12px;padding:10px 18px;border-radius:10px;text-decoration:none;background:var(--accent);color:#fff}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.card{background:var(--surface);padding:12px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.06)}
.price{font-weight:700;color:var(--accent)}
.form label{display:block;margin-bottom:12px}
.form input,.form select{width:100%;padding:8px;margin-top:6px;border-radius:6px;border:1px solid #ddd}
footer{margin:40px 0;text-align:center;color:var(--muted)}

// =========================
// /public/logo.png
// =========================
// coloque a imagem do logo (você enviou) no arquivo /public/logo.png

// =========================
// Como publicar (passo a passo resumido)
// =========================
/*
1) Instale Node.js (v18+) e Git.
2) Crie a pasta do projeto e cole os arquivos sugeridos.
3) No terminal: npm install
4) Rodar em dev: npm run dev (abre em http://localhost:3000)
5) Para publicar: suba o projeto num repositório GitHub e conecte na Vercel (import project) — deploy automático.
6) Defina domínio personalizado na Vercel (registra o domínio em um registrador, ex: Registro.br).

Observações:
- Os botões "Comprar via WhatsApp" abrem a conversa com a 1ª linha de atendimento. Se quiser, posso adicionar um botão que abre escolha de número (46 ou 42).
- Para aceitar pagamentos on-line depois, integro Stripe / Mercado Pago via checkout ou crio links diretos por produto.
*/

// =========================
// Final notes
// =========================
// Este é um starter minimal que prioriza: baixo custo, fácil manutenção e envio de pedidos via WhatsApp.
// Se quiser, eu adapto o código para adicionar visualizador STL 3D, upload de arquivo (com backend) e carrinho persistente.











// import Image from "next/image";
//
// export default function Home() {
//   return (
//     <main style={{ fontFamily: 'Arial', padding: '40px', textAlign: 'center' }}>
//       <h1>🛍️ 3Dreams Impressões 3D</h1>
//       <p>Modelos exclusivos e personalizados impressos em 3D</p>
//
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '20px',
//         marginTop: '40px'
//       }}>
//         <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
//           <img src="/images/chaveiro-bike.jpg" alt="Chaveiro de Bicicleta" style={{ width: '100%' }} />
//           <h3>Chaveiro Bicicleta</h3>
//           <p>R$ 15,00</p>
//           <button style={{ background: '#000', color: '#fff', padding: '10px', borderRadius: '5px' }}>
//             Comprar
//           </button>
//         </div>
//
//         <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
//           <img src="/images/suporte-celular.jpg" alt="Suporte de Celular" style={{ width: '100%' }} />
//           <h3>Suporte de Celular</h3>
//           <p>R$ 25,00</p>
//           <button style={{ background: '#000', color: '#fff', padding: '10px', borderRadius: '5px' }}>
//             Comprar
//           </button>
//         </div>
//       </div>
//
//       <footer style={{ marginTop: '50px', fontSize: '14px', color: '#555' }}>
//         Contato: <b>(46) 99909-9065</b> | Instagram: <b>@3dreams.impressao3d</b>
//       </footer>
//     </main>
//   );
// }






//
// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>
//
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
