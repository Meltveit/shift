'use client'

import { useState } from 'react';
import { Sparkles, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { generateShiftSuggestions } from '@/ai/flows/generate-shift-suggestions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const placeholderData = {
    employeeAvailability: JSON.stringify([
        { "employeeId": "2", "availableDays": ["Mon", "Wed", "Fri"] },
        { "employeeId": "3", "availableDays": ["Mon", "Tue", "Wed", "Thu"] },
        { "employeeId": "5", "availableDays": ["Tue", "Thu", "Fri", "Sat"] }
    ], null, 2),
    demandForecast: JSON.stringify({
        "Mon": { "required_staff": 2 },
        "Tue": { "required_staff": 1 },
        "Wed": { "required_staff": 2 },
        "Thu": { "required_staff": 1 },
        "Fri": { "required_staff": 2 }
    }, null, 2),
    laborCosts: JSON.stringify({
        "Barista": 15,
        "Cashier": 14,
        "Chef": 20
    }, null, 2),
};


export default function AiSuggestions() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [employeeAvailability, setEmployeeAvailability] = useState(placeholderData.employeeAvailability);
    const [demandForecast, setDemandForecast] = useState(placeholderData.demandForecast);
    const [laborCosts, setLaborCosts] = useState(placeholderData.laborCosts);
    const { toast } = useToast();
    const isBusinessPlan = true; // Mock plan check

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isBusinessPlan) {
            toast({
                title: "Upgrade Required",
                description: "AI Suggestions are only available on the Business plan.",
                variant: 'destructive'
            });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await generateShiftSuggestions({
                employeeAvailability,
                demandForecast,
                laborCosts,
            });
            setResult(response.shiftSuggestions);
            toast({
                title: "Suggestions Generated!",
                description: "AI has created a new shift plan.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate AI suggestions. Please try again.",
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="relative overflow-hidden">
             {!isBusinessPlan && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4 text-center">
                    <Sparkles className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-headline text-lg font-semibold mb-2">Unlock AI Suggestions</h3>
                    <p className="text-muted-foreground text-sm mb-4">Upgrade to the Business plan to automatically generate optimized schedules.</p>
                    <Button>Upgrade Now</Button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <div className="flex items-center gap-3">
                         <CardTitle className="flex items-center gap-2">
                            <Bot />
                            AI Shift Suggestions
                        </CardTitle>
                        <Badge variant="outline" className="border-accent text-accent">Business</Badge>
                    </div>
                    <CardDescription>
                        Generate an optimal schedule based on availability, demand, and costs.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="employeeAvailability">Employee Availability (JSON)</Label>
                        <Textarea id="employeeAvailability" value={employeeAvailability} onChange={(e) => setEmployeeAvailability(e.target.value)} rows={4} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="demandForecast">Demand Forecast (JSON)</Label>
                        <Textarea id="demandForecast" value={demandForecast} onChange={(e) => setDemandForecast(e.target.value)} rows={4} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="laborCosts">Labor Costs (JSON)</Label>
                        <Textarea id="laborCosts" value={laborCosts} onChange={(e) => setLaborCosts(e.target.value)} rows={3} />
                    </div>

                    {result && (
                         <Alert>
                            <Sparkles className="h-4 w-4" />
                            <AlertTitle>Generated Plan</AlertTitle>
                            <AlertDescription>
                                <pre className="mt-2 w-full whitespace-pre-wrap rounded-md bg-secondary p-4 text-xs">
                                    <code>{JSON.stringify(JSON.parse(result), null, 2)}</code>
                                </pre>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading || !isBusinessPlan}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                           <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate Suggestions
                           </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
