import Header from "components/navigation/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import  Button from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import  Input  from "components/ui/Input.jsx";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { Mail, MessageCircle, FileText } from "lucide-react";
import { useState } from "react";

export default function HelpSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      // Removed toast call
      alert("Message sent! We've received your message and will get back to you shortly.");
      e.target.reset();
    }, 1500);
  };

  const faqs = [
    {
      question: "How do I change my password?",
      answer: "You can change your password in the Profile Settings page. Click on your avatar in the top right, select 'Profile Settings', and look for the security section."
    },
    {
      question: "Can I invite people outside my organization?",
      answer: "Yes, you can invite external guests to specific projects. Go to Workspace Settings > Members and click 'Invite Member'."
    },
    {
      question: "Where can I find my billing invoices?",
      answer: "Billing information is only available to Workspace Admins. If you are an admin, check the Billing tab in Workspace Settings."
    },
    {
      question: "How do I delete my account?",
      answer: "Account deletion requires contacting our support team directly for security verification. Please use the contact form below."
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-10 px-4 sm:px-8 max-w-6xl mx-auto">
        <Header
          title="Help & Support"
          description="Find answers to common questions or contact our team."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="bg-primary/5 border-primary/20 shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>
                    Chat with our support team in real-time.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Start Chat</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20 shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email Support
                  </CardTitle>
                  <CardDescription>
                    Get help via email. Response time: 24h.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">Copy Email</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Us
            </h2>
            <Card className="shadow-lg border-primary/10">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Describe your issue and we'll help you resolve it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="support-name">Name</Label>
                      <Input id="support-name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="support-email">Email</Label>
                      <Input id="support-email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="I need help with..." required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your issue in detail..." 
                      className="min-h-[150px]"
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}