import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sparkles, Users, Palette } from 'lucide-react';

const LandingPage = () => {
  console.log('LandingPage loaded');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png" alt="Lovable Clones Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-pink-600">Lovable Clones</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/features" className={navigationMenuTriggerStyle()}>Features</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about-us" className={navigationMenuTriggerStyle()}>About</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button onClick={() => navigate('/auth')} variant="outline" className="mr-2">Login</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button onClick={() => navigate('/auth')} className="bg-pink-500 hover:bg-pink-600 text-white">Sign Up</Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <ScrollArea className="flex-grow">
        <main>
          {/* Hero Section */}
          <section className="py-20 md:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518364538800-60f24f01a543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"}}>
            <div className="container mx-auto px-4 md:px-6 bg-black/30 backdrop-blur-sm py-10 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Create Your Own <span className="text-pink-400">Lovable Clone!</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Unleash your creativity and design unique digital companions. Express yourself and bring your imagination to life.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg" onClick={() => navigate('/editor')}>
                  Start Creating Now
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-pink-500 px-8 py-3 text-lg" onClick={() => navigate('/auth')}>
                  Sign Up / Login
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                Why You'll <span className="text-pink-500">Love</span> Creating Clones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 bg-pink-100 rounded-full mb-3">
                      <Palette className="h-8 w-8 text-pink-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-700">Endless Customization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      Choose from a vast library of parts, colors, and accessories to make your clone truly unique.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center text-center">
                     <div className="p-3 bg-purple-100 rounded-full mb-3">
                        <Sparkles className="h-8 w-8 text-purple-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-700">Interactive Fun</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      Bring your clones to life! Interact with them, discover their personalities, and watch them react.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 bg-indigo-100 rounded-full mb-3">
                        <Users className="h-8 w-8 text-indigo-500" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-700">Share with Friends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      Show off your creations to the world or share them with friends in a vibrant community. (Coming soon!)
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 md:py-24 bg-pink-500 text-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Clone Adventure?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
                Join thousands of creators and begin designing your first Lovable Clone today. It's free to get started!
              </p>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600 px-10 py-3 text-lg" onClick={() => navigate('/editor')}>
                Create Your First Clone
              </Button>
            </div>
          </section>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default LandingPage;