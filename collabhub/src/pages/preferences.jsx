import Header from "components/navigation/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Label } from "components/ui/label";
import { Switch } from "components/ui/switch";
import  Button  from "components/ui/button";
import { Moon, Sun, Bell, Monitor } from "lucide-react";
import { useState } from "react";

export default function Preferences() {
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    // Removed toast call
    alert("Preferences saved! Your preferences have been updated successfully.");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-10 px-4 sm:px-8 max-w-3xl mx-auto">
        <Header
          title="Preferences"
          description="Customize your interface and notification settings."
        />

        <div className="grid gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how the application looks on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred interface theme.
                  </p>
                </div>
                <div className="flex items-center bg-muted p-1 rounded-full border">
                  <button
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-full transition-all ${
                      theme === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-full transition-all ${
                      theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive daily summaries and important alerts via email.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time alerts on your desktop.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly report of your workspace activity.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleSave} className="min-w-[150px]">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}