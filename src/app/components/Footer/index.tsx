export default function Footer() {
  return (
    <footer className="flex h-14 items-center justify-center border-t border-cyan-600">
      <h1 className="text-cyan-200">
        All Rights Reserved &copy; {new Date().getFullYear()}
      </h1>
    </footer>
  );
}
