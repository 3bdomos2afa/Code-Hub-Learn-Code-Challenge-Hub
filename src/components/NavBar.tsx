
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LogOut, Settings, BookOpen, Award, Home, BookMarked, Code, Terminal, Braces } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isRtl = currentLanguage === "ar";
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { label: t("home"), href: "/", icon: Home },
    { label: t("challenges"), href: "/challenges", icon: Terminal },
    { label: t("courses"), href: "/courses", icon: Code },
    { label: t("books"), href: "/books", icon: BookMarked },
    { label: t("codePlayground"), href: "/code-playground", icon: Terminal },
    { label: t("leaderboard"), href: "/leaderboard", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to="/" className="mr-4 flex items-center">
          <Braces className={`h-6 w-6 mr-2 text-primary ${isRtl ? 'ml-2 mr-0 rtl-flip' : 'mr-2'}`} />
          <span className="font-mono text-xl font-bold">
            <span className="text-primary">Code</span>
            <span>Hub</span>
          </span>
        </Link>

        {!isMobile && (
          <nav className={`mx-6 flex items-center space-x-4 lg:space-x-6 font-mono ${isRtl ? 'space-x-reverse' : ''}`}>
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1"
              >
                <item.icon className="h-4 w-4" />
                <span className={isRtl ? 'mr-1' : 'ml-1'}>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {!isMobile && (
            <>
              <ThemeToggle />
              <LanguageToggle />
            </>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
                  <Avatar className="h-9 w-9 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg" alt={user.email || "User"} />
                    <AvatarFallback className="bg-secondary text-primary">
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-mono leading-none text-primary">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("signOut")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              {t("login")}
            </Button>
          )}

          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={isRtl ? "left" : "right"} className="w-[80%] sm:w-[380px]">
                <nav className="flex flex-col gap-4 mt-8 font-mono">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="flex items-center gap-2 text-lg font-medium py-2 hover:text-primary group"
                      onClick={() => setOpen(false)}
                    >
                      <div className="bg-accent p-2 rounded-md group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <ThemeToggle />
                      <LanguageToggle />
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
