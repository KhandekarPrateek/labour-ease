// src/app/example/page.js
import ThemeToggle from '../components/ThemeToggle';

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1>Labour Ease</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-lg">
            <h2 className="mb-4">Welcome to Labour Ease</h2>
            <p className="text-muted-foreground mb-4">
              This is an example of how to use your new styling system.
            </p>
            <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md">
              Get Started
            </button>
          </div>
          
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Dark mode support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Consistent color system</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Accessible components</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}