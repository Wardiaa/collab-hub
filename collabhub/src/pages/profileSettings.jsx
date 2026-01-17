import Header from "components/navigation/Header";
import  Button  from "components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
} from "components/ui/card";
import  Input  from "components/ui/input";
import { Label } from "components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Camera } from "lucide-react";
import { useState } from "react";

export default function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false);

  // Mock user data for pure frontend demo
  const [user, setUser] = useState({
    name: "Alex Morgan",
    username: "alexmorgan",
    email: "alex.morgan@collabhub.com",
    role: "Product Manager"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false);
      // Removed toast call
      alert("Profile updated! Your profile information has been saved successfully.");
    }, 2000); // Reduced from 8000ms to 2000ms
  };

  const handleChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-10 px-4 sm:px-8 max-w-4xl mx-auto">
        <Header
          title="Profile Settings"
          description="Manage your personal account settings and preferences."
        />

        <div className="grid gap-8">
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20" />
            <div className="px-8 pb-8">
              <div className="relative -mt-16 mb-6">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop" />
                  <AvatarFallback className="text-2xl">AM</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute bottom-0 right-0 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Doe"
                      className="bg-background/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={user.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      placeholder="johndoe"
                      className="bg-background/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={user.role}
                      className="bg-muted"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Your role is managed by your workspace administrator.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="john@example.com"
                      className="bg-background/50"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="min-w-[120px]">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}