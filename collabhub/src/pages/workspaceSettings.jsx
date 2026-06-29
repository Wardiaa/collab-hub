import { useState } from "react";
import Header from "components/navigation/Header";
import  Button  from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import  Input  from "components/ui/Input.jsx";
import { Label } from "components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Badge } from "components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Trash2, UserPlus, Building } from "lucide-react";

const INITIAL_MEMBERS = [
  { id: 1, name: "John Doe", email: "john@collabhub.com", role: "Admin", status: "Active", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
  { id: 2, name: "Sarah Smith", email: "sarah@collabhub.com", role: "Editor", status: "Active", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
  { id: 3, name: "Mike Johnson", email: "mike@collabhub.com", role: "Viewer", status: "Pending", avatar: null },
];

export default function WorkspaceSettings() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [isSaving, setIsSaving] = useState(false);

  const handleRemoveMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
    // Removed toast call
    alert("Member removed! The user has been removed from the workspace.");
  };

  const handleSaveWorkspace = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Removed toast call
      alert("Workspace updated! Workspace settings have been saved successfully.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-10 px-4 sm:px-8 max-w-5xl mx-auto">
        <Header
          title="Workspace Settings"
          description="Manage your team, roles, and general workspace configuration."
        >
          <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </Header>

        <div className="grid gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                General Information
              </CardTitle>
              <CardDescription>
                Configure the basic details of your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ws-name">Workspace Name</Label>
                  <Input id="ws-name" defaultValue="CollabHub" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ws-url">Workspace URL</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      collabhub.com/
                    </span>
                    <Input id="ws-url" defaultValue="main-workspace" className="rounded-l-none" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleSaveWorkspace} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage who has access to this workspace and their roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">{member.name}</span>
                            <span className="text-xs text-muted-foreground">{member.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={member.status === "Active" ? "default" : "secondary"}
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}