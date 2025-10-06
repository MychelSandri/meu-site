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
