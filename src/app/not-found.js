'use client'
export default function NotFound() {
    return (
      <div className="not-found">
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <a href="/" className="back-home">Volver al inicio</a>
  
        <style jsx>{`
          .not-found {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }
          h1 {
            font-size: 3rem;
            color: #002442;
          }
          p {
            font-size: 1.2rem;
            margin: 10px 0;
          }
          .back-home {
            background-color: #002442;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
            font-size: 1rem;
          }
          .back-home:hover {
            background-color: #004466;
          }
        `}</style>
      </div>
    );
  }
  