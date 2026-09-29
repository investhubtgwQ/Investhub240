import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useGetPlans, useCreateInvestment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Plans() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: plans, isLoading: isPlansLoading } = useGetPlans();
  const createInvestment = useCreateInvestment();
  const { toast } = useToast();
  
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [investAmount, setInvestAmount] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check query params for selected plan (from home page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get("selected");
    if (planId && !isModalOpen) {
      handleInvestClick(Number(planId));
      // Clean up URL
      window.history.replaceState({}, '', '/plans');
    }
  }, []);

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div></div>;
  }

  const handleInvestClick = (planId: number) => {
    if (!isAuthenticated) {
      setLocation("/login?redirect=/plans");
      return;
    }
    setSelectedPlanId(planId);
    setInvestAmount("");
    setIsModalOpen(true);
  };

  const handleConfirmInvestment = () => {
    const amount = Number(investAmount);
    const plan = plans?.find(p => p.id === selectedPlanId);
    
    if (!plan) return;
    
    if (isNaN(amount) || amount < plan.minAmount) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment for this plan is $${plan.minAmount.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }
    
    if (plan.maxAmount && amount > plan.maxAmount) {
      toast({
        title: "Invalid Amount",
        description: `Maximum investment for this plan is $${plan.maxAmount.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }

    createInvestment.mutate({
      data: {
        planId: plan.id,
        amount
      }
    }, {
      onSuccess: () => {
        setIsModalOpen(false);
        toast({
          title: "Investment Successful",
          description: `You have successfully invested $${amount.toLocaleString()} in ${plan.name}.`,
        });
        setLocation("/dashboard");
      },
      onError: (error) => {
        toast({
          title: "Investment Failed",
          description: error.data?.error || "Something went wrong.",
          variant: "destructive"
        });
      }
    });
  };

  const selectedPlan = plans?.find(p => p.id === selectedPlanId);
  const expectedReturn = selectedPlan && !isNaN(Number(investAmount)) 
    ? (Number(investAmount) * (selectedPlan.roiPercent / 100)).toFixed(2)
    : "0.00";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Investment Strategies</h1>
        <p className="text-xl text-muted-foreground">
          Select a portfolio strategy tailored to your timeline and return objectives. 
          All plans are executed by our quantitative engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {isPlansLoading ? (
          Array(3).fill(0).map((_, i) => (
             <div key={i} className="glass-card rounded-2xl h-[600px] animate-pulse bg-white/5" />
          ))
        ) : (
          plans?.map((plan, i) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`glass-panel rounded-2xl overflow-hidden flex flex-col relative ${
                plan.badgeLabel ? 'border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : ''
              }`}
            >
              {plan.badgeLabel && (
                <div className="bg-primary w-full text-center py-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  {plan.badgeLabel}
                </div>
              )}
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.description}</p>
                
                <div className="flex items-baseline gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-5xl font-mono font-bold text-success">{plan.roiPercent}%</span>
                  <span className="text-muted-foreground font-medium uppercase text-sm">Est. ROI</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Duration</span>
                    <span className="text-white font-mono font-medium">{plan.durationDays} Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Min Investment</span>
                    <span className="text-white font-mono font-medium">${plan.minAmount.toLocaleString()}</span>
                  </div>
                  {plan.maxAmount && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Max Investment</span>
                      <span className="text-white font-mono font-medium">${plan.maxAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 mb-8 flex-1">
                  <div className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Plan Features</div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-3 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleInvestClick(plan.id)}
                  size="lg"
                  className={`w-full font-bold text-lg h-14 ${
                    plan.badgeLabel 
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  Invest Now
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Investment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-white/10 text-foreground glass-panel shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Configure Investment</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You are investing in the <strong className="text-white">{selectedPlan?.name}</strong> plan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white/80">Investment Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                <Input 
                  id="amount" 
                  type="number"
                  placeholder={`${selectedPlan?.minAmount.toLocaleString()}`}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="pl-8 bg-black/40 border-white/20 text-white font-mono text-lg h-12 focus-visible:ring-primary"
                />
              </div>
              {selectedPlan && (
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Min: ${selectedPlan.minAmount.toLocaleString()}</span>
                  {selectedPlan.maxAmount && <span>Max: ${selectedPlan.maxAmount.toLocaleString()}</span>}
                </div>
              )}
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Projection Summary
              </h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Expected ROI</span>
                <span className="font-mono text-success font-bold">{selectedPlan?.roiPercent}%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-mono text-white">{selectedPlan?.durationDays} Days</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Estimated Return</span>
                <span className="font-mono text-xl text-success font-bold animate-pulse-glow">
                  ${expectedReturn}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-secondary/50 p-4 rounded-lg border border-white/5">
              <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                By confirming this investment, your funds will be locked for {selectedPlan?.durationDays} days. 
                Early withdrawal may incur penalties. Smart contracts execute trades automatically.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-white">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmInvestment} 
              disabled={createInvestment.isPending || !investAmount || Number(investAmount) < (selectedPlan?.minAmount || 0)}
              className="bg-primary hover:bg-primary/90 text-white min-w-[140px]"
            >
              {createInvestment.isPending ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>Confirm Investment <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
