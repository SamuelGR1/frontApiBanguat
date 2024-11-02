import TipoCambio from './components/TipoCambio';

const HomePage = () => {
  return (
    <main>
      {/* Título principal */}
      <header>
        <h1>Bienvenido a la Página de Tipo de Cambio</h1>
      </header>

      {/* Tarjeta del tipo de cambio */}
      <TipoCambio />

      {/* Pie de página */}
      <footer>
        <p>&copy; 2024 Obtenido dee BANGUAT </p>
      </footer>
    </main>
  );
};

export default HomePage;
