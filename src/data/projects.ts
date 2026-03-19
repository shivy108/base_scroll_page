export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  featured?: boolean;
  category: 'mobile' | 'blockchain' | 'web';
  accentColor: string;
  icon: 'bank' | 'rocket' | 'bot' | 'calendar';
}

export const projects: Project[] = [
  {
    id: 'schedule',
    title: 'Schedule',
    role: 'Creator & Lead Engineer',
    description: 'Multi-platform workforce scheduling app built with a shared Rust core, native iOS and Android frontends, and a serverless AWS backend. Local-first architecture with offline support.',
    tech: ['Swift', 'Kotlin', 'Rust', 'AWS', 'TCA'],
    liveUrl: '/schedule',
    featured: true,
    category: 'mobile',
    accentColor: '#6366f1',
    icon: 'calendar',
  },
  {
    id: 'coutts',
    title: 'Coutts Banking App',
    role: 'Senior iOS Engineer',
    description: 'Contributed to the native iOS banking app for Coutts, the prestigious private bank. Built secure, high-performance features serving high-net-worth clients with AI-powered financial insights.',
    tech: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'AI/ML'],
    featured: true,
    category: 'mobile',
    accentColor: '#06b6d4',
    icon: 'bank',
  },
  {
    id: 'finch',
    title: 'Finch Mobile App',
    role: 'Founding Engineer',
    description: 'Led mobile engineering from zero to launch as founding engineer. Built the cross-platform app with AI integration, real-time features, and a seamless user experience from the ground up.',
    tech: ['React Native', 'TypeScript', 'AI Integration', 'Node.js'],
    featured: true,
    category: 'mobile',
    accentColor: '#22c55e',
    icon: 'rocket',
  },
  {
    id: 'solana-bots',
    title: 'Solana Trading Bots',
    role: 'Creator & Architect',
    description: 'Designed and built high-frequency crypto trading bots on the Solana blockchain. Automated strategies with real-time market data, on-chain execution, and risk management systems.',
    tech: ['Solana', 'Rust', 'TypeScript', 'Web3.js', 'Python'],
    featured: true,
    category: 'blockchain',
    accentColor: '#9945FF',
    icon: 'bot',
  },
];
