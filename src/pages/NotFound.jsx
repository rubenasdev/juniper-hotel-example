export default function NotFound({ go }) {
  return <section className="not-found">
    <small>404</small>
    <h1>Este caminho<br/>não leva ao Juniper.</h1>
    <p>A página que procura não existe ou mudou de endereço.</p>
    <a href="/" onClick={event => { event.preventDefault(); go('/'); }}>Voltar ao início</a>
  </section>;
}
