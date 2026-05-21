"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="main-nav"
    >
      <div className="nav-logo">SecureChat 🛡️</div>
      <div className="nav-links">
        <Link href="/login" className="nav-link">Login</Link>
        <Link href="/register" className="nav-link signup-special">Sign Up</Link>
      </div>
    </motion.nav>
  );
}
