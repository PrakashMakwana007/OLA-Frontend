function Footer() {
  return (
    <footer className="w-full bg-orange-500 text-white text-center py-4 shadow-inner mt-auto">
      <p className="text-sm sm:text-base font-medium">
        &copy; {new Date().getFullYear()} LearnApp. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
