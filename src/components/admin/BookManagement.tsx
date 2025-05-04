
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";

// Mock book data
const mockBooks = [
  {
    id: 1,
    title: "Python Crash Course",
    author: "Ahmed Mohamed",
    purchased: 2450,
    price: 29.99,
    status: "published",
    createdAt: "2023-01-15",
    category: "programming",
  },
  {
    id: 2,
    title: "React for Beginners",
    author: "Fatima Ali",
    purchased: 1820,
    price: 0,
    status: "published",
    createdAt: "2023-02-20",
    category: "web",
  },
  {
    id: 3,
    title: "Algorithms and Data Structures",
    author: "Omar Hassan",
    purchased: 1580,
    price: 34.99,
    status: "published",
    createdAt: "2023-03-10",
    category: "programming",
  },
  {
    id: 4,
    title: "Introduction to Machine Learning",
    author: "Laila Kareem",
    purchased: 1340,
    price: 39.99,
    status: "draft",
    createdAt: "2023-04-05",
    category: "ai",
  },
  {
    id: 5,
    title: "JavaScript: The Good Parts",
    author: "Youssef Ibrahim",
    purchased: 2120,
    price: 0,
    status: "published",
    createdAt: "2023-05-15",
    category: "web",
  },
  {
    id: 6,
    title: "Flutter Development Guide",
    author: "Amina Khalid",
    purchased: 960,
    price: 24.99,
    status: "published",
    createdAt: "2023-06-22",
    category: "mobile",
  },
];

const BookManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState("all");
  
  const filterBooks = () => {
    let filtered = [...mockBooks];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by tab
    if (tabValue === "free") {
      filtered = filtered.filter(book => book.price === 0);
    } else if (tabValue === "paid") {
      filtered = filtered.filter(book => book.price > 0);
    } else if (tabValue === "draft") {
      filtered = filtered.filter(book => book.status === "draft");
    }
    
    return filtered;
  };
  
  const filteredBooks = filterBooks();
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold">{t('bookManagement')}</h2>
        <div className="mt-4 sm:mt-0 flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 rtl:left-auto rtl:right-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder={t('searchBooks')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 rtl:pl-2 rtl:pr-8 w-full sm:w-64"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-1 rtl:mr-0 rtl:ml-1" />
            {t('addBook')}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setTabValue}>
        <TabsList>
          <TabsTrigger value="all">{t('allBooks')}</TabsTrigger>
          <TabsTrigger value="free">{t('freeBooks')}</TabsTrigger>
          <TabsTrigger value="paid">{t('paidBooks')}</TabsTrigger>
          <TabsTrigger value="draft">{t('drafts')}</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('book')}
                </th>
                <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('author')}
                </th>
                <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('price')}
                </th>
                <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  {t('category')}
                </th>
                <th scope="col" className="px-6 py-3 text-left rtl:text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  {t('status')}
                </th>
                <th scope="col" className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.price === 0 ? (
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {t('free')}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${book.price}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${book.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">{t('view')}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">{t('edit')}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">{t('delete')}</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
