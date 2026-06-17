export default function Footer() {
  return (
    <footer className="py-8 mt-12 bg-[#F6F3EC] flex flex-col md:flex-row items-center justify-between px-8 md:px-24">
      <h2 className="font-serif text-2xl text-burgundy mb-4 md:mb-0">Hambalyo</h2>
      <p className="text-xs text-text-dark/50">© 2026 Hambalyo Digital Stationery. Crafted with love.</p>
      <div className="flex gap-4 mt-4 md:mt-0 text-xs text-text-dark/50">
        <a href="#" className="hover:text-burgundy">Privacy</a>
        <a href="#" className="hover:text-burgundy">Terms</a>
        <a href="#" className="hover:text-burgundy">Contact</a>
      </div>
    </footer>
  );
}
