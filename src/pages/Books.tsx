
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Loader2, BookOpen, Search, Star } from "lucide-react";

// Book interface
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
}

const Books = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Categories for filtering
  const categories = [
    "all",
    "programming",
    "design",
    "business",
    "science",
    "fiction"
  ];
  
  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    try {
      console.log("Fetching books...");
      // Use mock data for now due to Supabase error
      const mockBooks: Book[] = [
        {
          id: "1",
          title: "JavaScript: The Good Parts",
          author: "Douglas Crockford",
          description: "This book provides an in-depth exploration of JavaScript, focusing on the good parts of the language.",
          price: 29.99,
          category: "programming",
          image_url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&h=800&q=80"
        },
        {
          id: "2",
          title: "Clean Code",
          author: "Robert C. Martin",
          description: "A handbook of agile software craftsmanship that helps developers write better code.",
          price: 0,
          category: "programming",
          image_url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&h=800&q=80"
        },
        {
          id: "3",
          title: "Design of Everyday Things",
          author: "Don Norman",
          description: "A powerful primer on how design serves as the intermediary between objects and users.",
          price: 19.95,
          category: "design",
          image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=800&q=80"
        },
        {
          id: "4",
          title: "Data Science Handbook",
          author: "Field Cady",
          description: "A comprehensive guide to the theories, techniques, and practices in data science.",
          price: 0,
          category: "science",
          image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=800&q=80"
        }
      ];
      
      setBooks(mockBooks);
      
      // Try to fetch from Supabase but use mock data if it fails
      /* const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setBooks(data || []); */
    } catch (error: any) {
      console.error("Error fetching books:", error.message);
      toast({
        title: t("errorFetchingBooks"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const filteredBooks = books
    .filter(book => 
      activeTab === "all" || book.category.toLowerCase() === activeTab
    )
    .filter(book => 
      searchQuery === "" || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Get free and paid books
  const freeBooks = filteredBooks.filter(book => book.price === 0);
  const paidBooks = filteredBooks.filter(book => book.price > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold">{t("discoverBooks")}</h1>
                <p className="text-xl max-w-2xl">{t("booksHeroDescription")}</p>
                
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    type="text"
                    placeholder={t("searchBooks")}
                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30">{t("trending")}</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">React</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">JavaScript</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Python</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">{t("designPatterns")}</Badge>
                </div>
              </div>
              
              <div className="hidden md:block relative h-64">
                <div className="absolute top-0 right-0 w-60 h-80 transform rotate-6 rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&h=800&q=80" 
                    alt="Book cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-10 left-10 w-60 h-80 transform -rotate-3 rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&h=800&q=80" 
                    alt="Book cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-60 h-80 transform rotate-12 rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=600&h=800&q=80" 
                    alt="Book cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Books Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab} value={activeTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700"
                  >
                    {t(category)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : filteredBooks.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-400" />
                  <h2 className="text-2xl font-bold mb-2">{t("noBooksFound")}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{t("tryChangingFilters")}</p>
                  <Button onClick={() => {setActiveTab("all"); setSearchQuery("");}}>
                    {t("clearFilters")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Featured Books Section */}
                  {filteredBooks.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("featuredBooks")}</h2>
                        <Link to="/books" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredBooks.slice(0, 4).map(book => (
                          <BookCardFeatured key={book.id} book={book} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Free Books Section */}
                  {freeBooks.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("freeBooks")}</h2>
                        <Link to="/books?filter=free" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {freeBooks.map(book => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Paid Books Section */}
                  {paidBooks.length > 0 && (
                    <div>
                      <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold">{t("premiumBooks")}</h2>
                        <Link to="/books?filter=paid" className="text-primary hover:underline">
                          {t("viewAll")}
                        </Link>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {paidBooks.map(book => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface BookCardProps {
  book: Book;
}

// Regular Book Card Component
const BookCard = ({ book }: BookCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={book.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&h=600&q=80"} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {book.price === 0 && (
          <Badge className="absolute top-2 right-2 bg-emerald-600">{t("free")}</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("by")} {book.author}</p>
        <p className="mt-2 text-sm line-clamp-2">{book.description}</p>
        <div className="mt-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {book.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="font-medium">
          {book.price === 0 
            ? t("free") 
            : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(book.price)}
        </div>
        <Link to={`/book/${book.id}`}>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
            {t("viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Featured Book Card Component with a different style
const BookCardFeatured = ({ book }: BookCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={book.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&h=600&q=80"} 
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{book.title}</h3>
          <p className="text-sm text-gray-200">{t("by")} {book.author}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} fill="currentColor" className="w-4 h-4 text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 text-xs text-white">5.0</span>
          </div>
        </div>
        
        {book.price === 0 ? (
          <Badge className="absolute top-2 right-2 bg-emerald-600">{t("free")}</Badge>
        ) : (
          <Badge className="absolute top-2 right-2 bg-primary">${book.price}</Badge>
        )}
      </div>
      <CardContent className="pt-4">
        <p className="text-sm line-clamp-2">{book.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/book/${book.id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            {t("viewDetails")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Books;
