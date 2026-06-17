import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center justify-center border-b border-burgundy/10">
      <h1 className="font-serif text-5xl md:text-6xl text-burgundy mb-2 tracking-tight">Hambalyo</h1>
      <p className="text-sm text-text-dark/70 tracking-widest uppercase font-medium mb-6">Leave a message for the happy couple</p>
      
      <nav className="flex items-center gap-8 text-sm font-medium">
        <Link href="#" className="text-burgundy border-b-2 border-burgundy pb-1">Gallery</Link>
        <Link href="#" className="text-text-dark/70 hover:text-burgundy transition-colors">Story</Link>
        <Link href="#" className="text-text-dark/70 hover:text-burgundy transition-colors">Registry</Link>
      </nav>
    </header>
  );
}
