
import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, BookOpen, ShoppingCart, CheckCircle, Star, Share2, Bookmark, BookCopy, Calendar, User, Tag } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface BookPurchase {
  id: string;
  book_id: string;
  user_id: string;
  purchase_date: string;
  download_count: number;
}

const BookDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [book, setBook] = useState<Book | null>(null);
  const [purchase, setPurchase] = useState<BookPurchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    const fetchBookAndPurchase = async () => {
      try {
        // Get book details
        const { data: bookData, error: bookError } = await supabase
          .from("books")
          .select("*")
          .eq("id", id)
          .single();
          
        if (bookError) throw bookError;
        setBook(bookData);
        
        // Check if user is authenticated and has purchased this book
        if (user) {
          const { data: purchaseData, error: purchaseError } = await supabase
            .from("book_purchases")
            .select("*")
            .eq("book_id", id)
            .eq("user_id", user.id)
            .maybeSingle();
            
          if (!purchaseError && purchaseData) {
            setPurchase(purchaseData);
          }
        }
        
        // Get related books with the same category
        if (bookData) {
          const { data: relatedData, error: relatedError } = await supabase
            .from("books")
            .select("*")
            .eq("category", bookData.category)
            .neq("id", bookData.id)
            .limit(4);
            
          if (!relatedError && relatedData) {
            setRelatedBooks(relatedData);
          }
        }
      } catch (error: any) {
        console.error("Error fetching book:", error.message);
        toast({
          title: t("errorFetchingBook"),
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookAndPurchase();
  }, [id, user, t, toast]);
  
  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: t("loginRequired"),
        description: t("pleaseLoginToPurchase"),
      });
      navigate("/auth");
      return;
    }
    
    if (!book) return;
    
    setPurchasing(true);
    try {
      // In a real app, you would integrate with a payment processor here
      // For now, we'll simulate a successful purchase
      
      // Create a purchase record
      const { data, error } = await supabase
        .from("book_purchases")
        .insert({
          user_id: user.id,
          book_id: book.id,
          price: book.price,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setPurchase(data);
      
      toast({
        title: t("purchaseSuccessful"),
        description: t("youNowOwnThisBook"),
      });
    } catch (error: any) {
      console.error("Error purchasing book:", error.message);
      toast({
        title: t("purchaseFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };
  
  const handleDownload = async () => {
    if (!purchase || !book) return;
    
    setDownloading(true);
    try {
      // In a real app, you would generate a download link or serve the book file
      // For now, we'll simulate a download
      
      // Update download count
      const { error } = await supabase
        .from("book_purchases")
        .update({
          download_count: (purchase.download_count || 0) + 1
        })
        .eq("id", purchase.id);
        
      if (error) throw error;
      
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t("downloadStarted"),
        description: t("enjoyYourBook"),
      });
      
      // Refresh purchase data
      const { data, error: fetchError } = await supabase
        .from("book_purchases")
        .select("*")
        .eq("id", purchase.id)
        .single();
        
      if (fetchError) throw fetchError;
      
      setPurchase(data);
    } catch (error: any) {
      console.error("Error downloading book:", error.message);
      toast({
        title: t("downloadFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share && book) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href,
      })
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("linkCopied"),
        description: t("linkCopiedToClipboard"),
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg">{t("loadingBook")}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>{t("bookNotFound")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t("bookNotFoundDescription")}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate("/books")} className="w-full">
                {t("backToBooks")}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Book Cover */}
              <div className="flex justify-center md:justify-end">
                <div className="w-72 h-96 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/50 to-gray-900/50 rounded-lg transform rotate-3"></div>
                  <img 
                    src={book.image_url || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&h=800&q=80"}
                    alt={book.title}
                    className="absolute inset-0 object-cover w-full h-full rounded-lg shadow-2xl transform -rotate-3"
                  />
                </div>
              </div>
              
              {/* Book Info */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3 bg-primary/60 hover:bg-primary">{book.category}</Badge>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">{book.title}</h1>
                  <div className="flex items-center">
                    <p className="text-gray-300 text-lg">{t("by")} <span className="font-medium text-white">{book.author}</span></p>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-300">5.0 (127 {t("reviews")})</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg">{book.description.substring(0, 200)}...</p>
                
                <div className="flex items-baseline gap-4">
                  <div className="mr-4">
                    <p className="text-sm text-gray-400">{t("price")}</p>
                    <div className="text-4xl font-bold">
                      {book.price === 0 
                        ? t("free") 
                        : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(book.price)}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {purchase ? (
                    <Button 
                      className="w-full md:w-auto gap-2 text-lg font-medium bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleDownload}
                      disabled={downloading}
                      size="lg"
                    >
                      {downloading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                      {downloading ? t("downloading") : t("download")}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full md:w-auto gap-2 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handlePurchase}
                      disabled={purchasing}
                      size="lg"
                    >
                      {purchasing ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : book.price === 0 ? (
                        <BookOpen className="h-5 w-5" />
                      ) : (
                        <ShoppingCart className="h-5 w-5" />
                      )}
                      {purchasing 
                        ? t("processing") 
                        : book.price === 0 
                          ? t("getForFree") 
                          : t("purchase")}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 text-lg font-medium border-white/20 bg-white/5 hover:bg-white/10"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                    {t("share")}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-white/20 bg-white/5 hover:bg-white/10"
                  >
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
                
                {purchase && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>{t("youOwnThisBook")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="text-3xl font-bold mb-6">{t("aboutThisBook")}</h2>
                <p>{book.description}</p>
                <p>{book.description}</p> {/* Duplicated for demo purposes - in a real app you'd have more content */}
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">{t("authorInfo")}</h2>
                <div className="flex items-start gap-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                    {book.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{book.author}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t("authorDescription")}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <BookCopy className="h-4 w-4" />
                        {t("viewAllBooks")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reviews section would go here in a real app */}
            </div>
            
            <div className="space-y-6">
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="pb-3 border-b">
                  <CardTitle>{t("bookDetails")}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("published")}</div>
                      <div className="text-gray-500">{new Date(book.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <BookCopy className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("pages")}</div>
                      <div className="text-gray-500">250</div> {/* Placeholder */}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("category")}</div>
                      <div className="text-gray-500">{book.category}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{t("language")}</div>
                      <div className="text-gray-500">English</div> {/* Placeholder */}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  {purchase ? (
                    <Button 
                      className="w-full gap-2"
                      onClick={handleDownload}
                      disabled={downloading}
                    >
                      {downloading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      {downloading ? t("downloading") : t("download")}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full gap-2"
                      onClick={handlePurchase}
                      disabled={purchasing}
                    >
                      {purchasing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : book.price === 0 ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                      {purchasing 
                        ? t("processing") 
                        : book.price === 0 
                          ? t("getForFree") 
                          : t("purchase")}
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              {/* Related Books */}
              {relatedBooks.length > 0 && (
                <Card className="border border-gray-200 dark:border-gray-800">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle>{t("relatedBooks")}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {relatedBooks.map((relatedBook) => (
                        <Link 
                          key={relatedBook.id} 
                          to={`/book/${relatedBook.id}`} 
                          className="flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        >
                          <div className="h-16 w-12 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                            <img 
                              src={relatedBook.image_url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=100&q=60"} 
                              alt={relatedBook.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium line-clamp-2">{relatedBook.title}</h4>
                            <p className="text-sm text-gray-500">{relatedBook.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
