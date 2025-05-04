
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Code, Download, Copy, Save, Play, Trash2 } from "lucide-react";

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  created_at: string;
  updated_at: string;
}

const CodePlayground = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("<div>\n  <h1>Hello, World!</h1>\n  <p>Start coding here...</p>\n</div>");
  const [cssCode, setCssCode] = useState("body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}\n\nh1 {\n  color: #333;\n}");
  const [jsCode, setJsCode] = useState("// JavaScript code here\nconsole.log('Hello, World!');");
  const [output, setOutput] = useState("");
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);
  const [snippetTitle, setSnippetTitle] = useState("My Code Snippet");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Handle running code
  const handleRunCode = () => {
    try {
      const combinedCode = `
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
        </html>
      `;
      
      setOutput(combinedCode);
      setIsPreviewMode(true);
      
      toast({
        title: t("codeExecuted"),
        description: t("codeExecutedSuccess"),
      });
    } catch (error: any) {
      console.error("Error running code:", error);
      toast({
        title: t("codeExecutionFailed"),
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // Handle saving code snippet
  const handleSaveSnippet = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: t("loginRequired"),
          description: t("loginToSaveSnippets"),
        });
        return;
      }
      
      const codeData = {
        title: snippetTitle,
        language: activeTab,
        code: activeTab === "html" 
          ? htmlCode 
          : activeTab === "css" 
            ? cssCode 
            : jsCode,
        user_id: session.user.id,
      };
      
      if (selectedSnippet) {
        // Update existing snippet
        const { error } = await supabase
          .from("code_snippets")
          .update(codeData)
          .eq("id", selectedSnippet.id);
          
        if (error) throw error;
        
        toast({
          title: t("snippetUpdated"),
          description: t("snippetUpdatedSuccess"),
        });
      } else {
        // Create new snippet
        const { error } = await supabase
          .from("code_snippets")
          .insert(codeData);
          
        if (error) throw error;
        
        toast({
          title: t("snippetSaved"),
          description: t("snippetSavedSuccess"),
        });
      }
      
      // Refresh snippets list
      fetchSnippets();
      setSelectedSnippet(null);
      setSnippetTitle("My Code Snippet");
    } catch (error: any) {
      console.error("Error saving snippet:", error);
      toast({
        title: t("saveFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch user's snippets
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;
      
      // Get user's snippets
      const { data, error } = await supabase
        .from("code_snippets")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      setSnippets(data || []);
    } catch (error: any) {
      console.error("Error fetching snippets:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load a snippet
  const handleLoadSnippet = (snippet: CodeSnippet) => {
    setSelectedSnippet(snippet);
    setSnippetTitle(snippet.title);
    
    // Set code based on language
    if (snippet.language === "html") {
      setHtmlCode(snippet.code);
      setActiveTab("html");
    } else if (snippet.language === "css") {
      setCssCode(snippet.code);
      setActiveTab("css");
    } else if (snippet.language === "js") {
      setJsCode(snippet.code);
      setActiveTab("js");
    }
    
    toast({
      title: t("snippetLoaded"),
      description: t("snippetLoadedSuccess"),
    });
  };
  
  // Delete a snippet
  const handleDeleteSnippet = async (snippetId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("code_snippets")
        .delete()
        .eq("id", snippetId);
        
      if (error) throw error;
      
      // Refresh snippets list
      fetchSnippets();
      
      // Reset selected snippet if it was deleted
      if (selectedSnippet && selectedSnippet.id === snippetId) {
        setSelectedSnippet(null);
        setSnippetTitle("My Code Snippet");
      }
      
      toast({
        title: t("snippetDeleted"),
        description: t("snippetDeletedSuccess"),
      });
    } catch (error: any) {
      console.error("Error deleting snippet:", error);
      toast({
        title: t("deleteFailed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle copying code
  const handleCopyCode = () => {
    let codeToCopy = "";
    
    if (activeTab === "html") {
      codeToCopy = htmlCode;
    } else if (activeTab === "css") {
      codeToCopy = cssCode;
    } else if (activeTab === "js") {
      codeToCopy = jsCode;
    }
    
    navigator.clipboard.writeText(codeToCopy);
    toast({
      title: t("codeCopied"),
      description: t("codeCopiedToClipboard"),
    });
  };
  
  // Handle downloading code
  const handleDownloadCode = () => {
    let content = "";
    let filename = "";
    let mimeType = "";
    
    if (activeTab === "html") {
      content = htmlCode;
      filename = "code.html";
      mimeType = "text/html";
    } else if (activeTab === "css") {
      content = cssCode;
      filename = "styles.css";
      mimeType = "text/css";
    } else if (activeTab === "js") {
      content = jsCode;
      filename = "script.js";
      mimeType = "text/javascript";
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: t("codeDownloaded"),
      description: t("fileDownloaded"),
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Code Editor Section */}
            <div className="lg:w-2/3 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{t("codePlayground")}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCopyCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    {t("copy")}
                  </Button>
                  <Button variant="outline" onClick={handleDownloadCode}>
                    <Download className="h-4 w-4 mr-2" />
                    {t("download")}
                  </Button>
                  <Button onClick={handleRunCode}>
                    <Play className="h-4 w-4 mr-2" />
                    {t("run")}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="html">
                    <div className="border rounded-md overflow-hidden">
                      <textarea
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm bg-slate-950 text-slate-50 focus:outline-none resize-none"
                        spellCheck="false"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="css">
                    <div className="border rounded-md overflow-hidden">
                      <textarea
                        value={cssCode}
                        onChange={(e) => setCssCode(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm bg-slate-950 text-slate-50 focus:outline-none resize-none"
                        spellCheck="false"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="js">
                    <div className="border rounded-md overflow-hidden">
                      <textarea
                        value={jsCode}
                        onChange={(e) => setJsCode(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm bg-slate-950 text-slate-50 focus:outline-none resize-none"
                        spellCheck="false"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={snippetTitle}
                      onChange={(e) => setSnippetTitle(e.target.value)}
                      className="border rounded-md px-3 py-1 text-sm"
                      placeholder={t("snippetTitle")}
                    />
                  </div>
                  <Button onClick={handleSaveSnippet} disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {selectedSnippet ? t("update") : t("saveSnippet")}
                  </Button>
                </div>
              </div>
              
              {/* Output Preview */}
              {isPreviewMode && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t("preview")}</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white p-0 rounded-md overflow-hidden">
                    <iframe
                      srcDoc={output}
                      title="Code Preview"
                      className="w-full h-80 border-0"
                      sandbox="allow-scripts"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Saved Snippets Section */}
            <div className="lg:w-1/3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("savedSnippets")}</CardTitle>
                  <CardDescription>{t("clickToLoad")}</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <div className="space-y-3">
                    {snippets.length > 0 ? (
                      snippets.map((snippet) => (
                        <div
                          key={snippet.id}
                          className="border rounded-md p-3 cursor-pointer hover:bg-muted transition-colors flex justify-between items-center"
                          onClick={() => handleLoadSnippet(snippet)}
                        >
                          <div>
                            <div className="font-medium">{snippet.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Code className="h-3 w-3 mr-1" />
                              {snippet.language.toUpperCase()}
                              <span className="mx-2">•</span>
                              {new Date(snippet.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteSnippet(snippet.id, e)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Code className="h-8 w-8 mx-auto mb-2" />
                        <p>{t("noSavedSnippets")}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={fetchSnippets}
                  >
                    {t("refreshSnippets")}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t("tips")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• {t("tipSaveOften")}</li>
                    <li>• {t("tipUseBrowser")}</li>
                    <li>• {t("tipShareCode")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CodePlayground;
