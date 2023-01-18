import { Container } from 'react-bootstrap';

import Main from './Main';

import '../styles/main.scss';

function App() {
  return (
      <main className="body">
        <Container >
          <Main/>
        </Container>
      </main>
  );
}

export default App;
