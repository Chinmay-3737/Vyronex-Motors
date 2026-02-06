import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* This ensures your content grows to push the footer down */}
      <main className="flex-grow">
        {children}
      </main>

      <footer className="footer-credit">
        <p>
          Made With 
          <span className="heartbeat-emoji">❤️</span> 
          By Chinmay Chaudhari
        </p>
      </footer>
    </div>
  );
}