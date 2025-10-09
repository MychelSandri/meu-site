// components/HomeHeader.tsx

import Link from 'next/link';

export const HomeHeader: React.FC = () => {
  // Estilos básicos para alinhamento horizontal (usando CSS inline para simplicidade)
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #eee',
    fontFamily: 'Arial, sans-serif' // Adicione uma fonte para teste
  };

  const menuStyle: React.CSSProperties = {
    display: 'flex',
    listStyle: 'none', // Remove os pontos da lista
    gap: '30px',
    padding: 0,
    margin: 0
  };

  return (
    <header style={headerStyle}>
      {/* Lado Esquerdo: Logo Minimalista */}
      <div style={{ fontWeight: 'bold', fontSize: '24px', letterSpacing: '2px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
          3Dreams
        </Link>
      </div>

      {/* Lado Direito: Menu de Páginas */}
      <nav>
        <ul style={menuStyle}>
          <li>
            <Link href="/produtos" style={{ textDecoration: 'none', color: '#333' }}>
              Produtos
            </Link>
          </li>
          <li>
            <Link href="/projetos" style={{ textDecoration: 'none', color: '#333' }}>
              Projetos Feitos
            </Link>
          </li>
          <li>
            <Link href="/contato" style={{ textDecoration: 'none', color: '#333' }}>
              Contato
            </Link>
          </li>
          <li>
            <Link href="/referencias" style={{ textDecoration: 'none', color: '#333' }}>
              Referências
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
