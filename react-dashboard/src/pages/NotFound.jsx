import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h2>404 - Page not found</h2>
      <Link to="/">Go to overview</Link>
    </section>
  );
}
