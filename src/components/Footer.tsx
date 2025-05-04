
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { Code, BookOpen, Award, Github, Twitter, Linkedin, Braces, Terminal, Server, BookCopy } from "lucide-react";

export function Footer() {
  const { t, currentLanguage } = useLanguage();
  const isRtl = currentLanguage === "ar";
  
  return (
    <footer className="bg-[#0f172a] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-xl font-bold font-mono">
              <Braces className="h-6 w-6 mr-2 text-emerald-400" />
              <span className="text-emerald-400">Code</span>
              <span>Hub</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              {t('footerDescription')}
            </p>
            <div className="mt-4 flex space-x-4 rtl:space-x-reverse">
              <div className="h-8 w-8 bg-slate-800 rounded-md flex items-center justify-center hover:bg-emerald-400 hover:text-slate-900 transition-colors cursor-pointer">
                <Github size={18} />
              </div>
              <div className="h-8 w-8 bg-slate-800 rounded-md flex items-center justify-center hover:bg-emerald-400 hover:text-slate-900 transition-colors cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="h-8 w-8 bg-slate-800 rounded-md flex items-center justify-center hover:bg-emerald-400 hover:text-slate-900 transition-colors cursor-pointer">
                <Linkedin size={18} />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              {t('learn')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('courses')}
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  <BookCopy size={14} className="mr-1" />
                  {t('books')}
                </Link>
              </li>
              <li>
                <Link to="/code-playground" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('codePlayground')}
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('resources')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center">
              <Code className="h-4 w-4 mr-2" />
              {t('compete')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/challenges" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('challenges')}
                </Link>
              </li>
              <li>
                <Link to="/contests" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('contests')}
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('leaderboard')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center">
              <Server className="h-4 w-4 mr-2" />
              {t('company')}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-400 hover:text-emerald-400 font-mono flex items-center">
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 font-mono">
            <span className="text-emerald-400">&copy;</span> 2025 CodeHub. {t('allRightsReserved')}
          </p>
          <div className="mt-4 md:mt-0 bg-slate-800 rounded-lg p-1 font-mono text-xs">
            <code className="text-emerald-400">&lt;/&gt;</code>
            <span className="mx-2 text-slate-400">with</span>
            <code className="text-emerald-400">&hearts;</code>
            <span className="mx-2 text-slate-400">by</span>
            <code className="text-emerald-400">CodeHub</code>
          </div>
        </div>
      </div>
    </footer>
  );
}
