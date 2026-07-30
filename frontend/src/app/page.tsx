"use client";

import Link from"next/link";
import { motion } from"framer-motion";
import { ArrowRight, Code2, Disc, Sparkles, BarChart3, Fingerprint, Layout, Smartphone } from"lucide-react";
import { Button } from"@/components/ui/Button";

export default function LandingPage() {
 return (
 <div className="min-h-screen bg-gray-50 text-gray-900 font-sans transition-colors duration-300">
 
 {/* Navbar */}
 <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
 <div className="container mx-auto px-6 h-16 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <Disc className="h-6 w-6 text-blue-600" />
 <span className="font-bold text-xl tracking-tight">MusicIQ</span>
 </div>
 <div className="flex items-center gap-4">
 <Link href="https://github.com/ANUPAM4545/MusicIQ" target="_blank" className="text-gray-500 hover:text-gray-900 transition-colors">
 <Code2 className="h-5 w-5" />
 </Link>
 <Link href="/login">
 <Button variant="ghost">Log in</Button>
 </Link>
 <Link href="/register">
 <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
 Get Started
 </Button>
 </Link>
 </div>
 </div>
 </header>

 {/* Hero Section */}
 <section className="relative overflow-hidden pt-24 pb-32">
 <div className="container mx-auto px-6 text-center max-w-4xl">
 <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
 >
 Your Music Library,<br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
 Intelligently Curated.
 </span>
 </motion.h1>
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
 >
 An intelligent full-stack music platform featuring JWT authentication, real-time analytics, AI-powered insights, and a clean modern architecture.
 </motion.p>
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="flex flex-col sm:flex-row items-center justify-center gap-4"
 >
 <Link href="/login">
 <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-14 text-lg w-full sm:w-auto">
 Live Demo <ArrowRight className="ml-2 h-5 w-5" />
 </Button>
 </Link>
 <Link href="https://github.com/ANUPAM4545/MusicIQ" target="_blank">
 <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto">
 <Code2 className="mr-2 h-5 w-5" /> View on GitHub
 </Button>
 </Link>
 </motion.div>
 </div>
 </section>

 {/* Dashboard Screenshot Showcase */}
 <section className="py-12 bg-white border-y">
 <div className="container mx-auto px-6">
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 className="rounded-2xl overflow-hidden border shadow-2xl mx-auto max-w-5xl"
 >
 <img src="/screenshots/dashboard.png" alt="MusicIQ Dashboard" className="w-full h-auto object-cover" />
 </motion.div>
 </div>
 </section>

 {/* Features Grid */}
 <section className="py-24 container mx-auto px-6">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
 <p className="text-gray-600 max-w-2xl mx-auto">
 Built with a strong emphasis on Clean Architecture, domain-driven design, and modern React patterns.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
 {[
 { icon: Fingerprint, title:"Secure Authentication", desc:"Stateless JWT architecture with BCrypt hashing and strict ownership validation." },
 { icon: Layout, title:"Responsive Library", desc:"Curate a personal collection with custom ratings and notes in a mobile-first UI." },
 { icon: BarChart3, title:"Real-time Analytics", desc:"Visualize collection health, genre distributions, and rating statistics dynamically." },
 { icon: Sparkles, title:"AI Insights", desc:"Rule-based recommendation engine offering personalized listening feedback." },
 { icon: Disc, title:"Lightning Fast Search", desc:"Instantaneous album discovery leveraging iTunes API integrations." },
 { icon: Smartphone, title:"Clean Architecture", desc:"Strict separation of concerns on both backend (Spring Boot) and frontend (Next.js)." }
 ].map((feature, i) => (
 <motion.div 
 key={i}
 whileHover={{ y: -5 }}
 className="bg-white p-8 rounded-2xl border shadow-sm"
 >
 <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
 <feature.icon className="h-6 w-6" />
 </div>
 <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
 <p className="text-gray-600">{feature.desc}</p>
 </motion.div>
 ))}
 </div>
 </section>

 {/* Tech Stack */}
 <section className="py-24 bg-white border-t">
 <div className="container mx-auto px-6 max-w-5xl">
 <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {[
 { title:"Frontend", items: ["React 18","Next.js App Router","TypeScript","Tailwind CSS"] },
 { title:"Backend", items: ["Java 21","Spring Boot 3","Spring Security","MapStruct"] },
 { title:"State & Data", items: ["React Query","Axios","PostgreSQL","Spring Data JPA"] },
 { title:"Infrastructure", items: ["Docker","Docker Compose","GitHub Actions","JWT Auth"] }
 ].map((stack, i) => (
 <div key={i} className="bg-gray-50 p-6 rounded-xl border">
 <h3 className="font-semibold text-lg mb-4 text-blue-600">{stack.title}</h3>
 <ul className="space-y-2 text-gray-600">
 {stack.items.map((item, j) => (
 <li key={j} className="flex items-center gap-2">
 <div className="h-1.5 w-1.5 bg-gray-300 rounded-full" /> {item}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Footer */}
 <footer className="border-t bg-gray-50 py-12">
 <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
 <div className="flex items-center gap-2 mb-4 md:mb-0">
 <Disc className="h-5 w-5 text-gray-400" />
 <span className="font-semibold text-gray-600">MusicIQ v1.0.0</span>
 </div>
 <div className="flex gap-6 text-sm text-gray-500">
 <Link href="https://github.com/ANUPAM4545/MusicIQ" className="hover:text-gray-900">GitHub</Link>
 <Link href="#" className="hover:text-gray-900">LinkedIn</Link>
 <span className="text-gray-300">|</span>
 <span>MIT License</span>
 </div>
 </div>
 </footer>
 </div>
 );
}
