import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { AlertTriangle, Brain, CheckCircle, Clock } from 'lucide-react'
import './App.css'

// AI capabilities data
const initialCapabilities = [
  // Category A: AI-Better Today
  { id: 1, title: "Classic board-game strategy (Go, chess, shogi)", category: "A", agiThreshold: "Low", description: "Self-play RL agents outperform top humans" },
  { id: 2, title: "Complex esports under evaluated constraints", category: "A", agiThreshold: "Low-moderate", description: "Grandmaster-level and pro-team wins via massive self-play" },
  { id: 3, title: "Protein 3D structure prediction", category: "A", agiThreshold: "Moderate", description: "AlphaFold reaches accuracy comparable to experimental for many targets" },
  { id: 4, title: "Image classification on landmark benchmarks", category: "A", agiThreshold: "Low-moderate", description: "SOTA models surpassed reported human error rates" },
  { id: 5, title: "Medical image triage (specific tasks)", category: "A", agiThreshold: "Moderate", description: "Models match/exceed specialists in controlled studies" },
  { id: 6, title: "Chip floorplanning (EDA optimization)", category: "A", agiThreshold: "Moderate", description: "RL systems produce placements comparable/superior to expert engineers" },
  { id: 7, title: "Algorithmic micro-optimization", category: "A", agiThreshold: "Moderate", description: "AI discovered faster primitives adopted into standard libraries" },
  { id: 8, title: "Code generation on narrow benchmarks", category: "A", agiThreshold: "Moderate", description: "LLMs pass sizable fractions of HumanEval and similar tests" },
  { id: 9, title: "High-volume document labeling & tagging", category: "A", agiThreshold: "Low", description: "Consistent, scalable extraction/classification at low error" },
  { id: 10, title: "Entity extraction from text", category: "A", agiThreshold: "Low", description: "Mature NLP; near-perfect on many formats" },
  
  // Category B: AI-Competitive / Near-Parity
  { id: 11, title: "Summarizing long documents", category: "B", agiThreshold: "Moderate", description: "AI excels at speed/coverage; human polishes nuance" },
  { id: 12, title: "Drafting professional emails & replies", category: "B", agiThreshold: "Low-moderate", description: "AI rapidly produces on-tone drafts; human approves" },
  { id: 13, title: "Creating meeting agendas & capturing minutes", category: "B", agiThreshold: "Moderate", description: "AI handles structure; human sets priorities" },
  { id: 14, title: "Competitive briefs & landscape scans", category: "B", agiThreshold: "Moderate", description: "AI surfaces patterns fast; human challenges assumptions" },
  { id: 15, title: "Market sizing & simple forecasts", category: "B", agiThreshold: "Moderate", description: "AI runs scenarios; human validates assumptions" },
  { id: 16, title: "Risk registers & mitigation options", category: "B", agiThreshold: "Moderate", description: "AI catalogs controls; human judges trade-offs" },
  { id: 17, title: "Policy/SOP drafting", category: "B", agiThreshold: "Moderate", description: "AI drafts from controls/citations; human ensures applicability" },
  { id: 18, title: "Customer-support triage & reply suggestions", category: "B", agiThreshold: "Moderate", description: "AI handles bulk with guardrails; edge cases to humans" },
  { id: 19, title: "Resume screening vs job criteria", category: "B", agiThreshold: "Moderate", description: "AI filters; human checks for bias/fit" },
  { id: 20, title: "Interview question & rubric generation", category: "B", agiThreshold: "Moderate", description: "AI drafts; human tunes for role/values" },
  { id: 21, title: "Training curricula from a corpus", category: "B", agiThreshold: "Moderate", description: "AI outlines skills, orders modules; human adds tacit know-how" },
  { id: 22, title: "SEO keyword research & clustering", category: "B", agiThreshold: "Low-moderate", description: "AI groups intents; human links to business goals" },
  { id: 23, title: "Marketing copy variants & ideation", category: "B", agiThreshold: "Low-moderate", description: "AI produces breadth; human selects voice" },
  { id: 24, title: "Presentation outlines & slide drafts", category: "B", agiThreshold: "Moderate", description: "AI drafts decks; human story-edits" },
  { id: 25, title: "Exploratory data analysis (EDA)", category: "B", agiThreshold: "Moderate", description: "AI suggests features/plots; human sanity-checks" },
  { id: 26, title: "Anomaly detection (logs, fraud, telemetry)", category: "B", agiThreshold: "Moderate", description: "AI flags patterns; human investigates" },
  { id: 27, title: "Prioritizing vulnerability backlogs", category: "B", agiThreshold: "Moderate", description: "AI cross-references exploitability; human weighs business risk" },
  { id: 28, title: "Incident-response step selection", category: "B", agiThreshold: "Moderate", description: "AI proposes next actions; commander approves" },
  { id: 29, title: "Contract redline suggestions", category: "B", agiThreshold: "High", description: "AI highlights risk language; counsel decides" },
  { id: 30, title: "Budget creation & variance analysis", category: "B", agiThreshold: "Moderate", description: "AI builds scenarios; human owns trade-offs" },
  { id: 31, title: "Scheduling & calendar optimization", category: "B", agiThreshold: "Low-moderate", description: "AI resolves constraints; human sets priorities" },
  { id: 32, title: "Travel itinerary planning", category: "B", agiThreshold: "Low-moderate", description: "AI proposes routes/lodging; human checks taste/risk" },
  { id: 33, title: "Meal planning & grocery optimization", category: "B", agiThreshold: "Low", description: "AI generates menus; human handles taste/diet nuance" },
  { id: 34, title: "Personal finance categorization & cash-flow plans", category: "B", agiThreshold: "Moderate", description: "AI automates; human sets goals" },
  { id: 35, title: "Document QA (consistency, references, style)", category: "B", agiThreshold: "Moderate", description: "AI flags issues; human resolves ambiguity" },
  { id: 36, title: "Multilingual translation (major pairs)", category: "B", agiThreshold: "Moderate", description: "Near-human in many pairs; human for nuance/legal" },
  { id: 37, title: "Transcription & diarization", category: "B", agiThreshold: "Low-moderate", description: "Very strong; human for edge audio" },
  { id: 38, title: "Photo curation & captioning", category: "B", agiThreshold: "Low-moderate", description: "AI excels breadth; human taste finals" },
  { id: 39, title: "Study-plan generation & spaced repetition", category: "B", agiThreshold: "Moderate", description: "AI tailors plans; human coaches motivation" },
  { id: 40, title: "Math & programming tutoring", category: "B", agiThreshold: "Moderate", description: "AI explains & generates problems; human mentors mindset" },
  
  // Category C: Human-Advantaged
  { id: 41, title: "Open-ended scientific hypothesis generation", category: "C", agiThreshold: "High", description: "Requires causal world models, experiment planning, epistemic humility" },
  { id: 42, title: "Cross-domain strategy under deep uncertainty", category: "C", agiThreshold: "High", description: "Long-horizon planning, counterfactual simulation, opportunity cost modeling" },
  { id: 43, title: "Multi-party negotiation & coalition-building", category: "C", agiThreshold: "High", description: "Theory of mind, incentive design, trust dynamics, reputational risk management" },
  { id: 44, title: "Ethical judgment & value trade-off resolution", category: "C", agiThreshold: "High", description: "Explicit normative reasoning, stakeholder value alignment, procedural fairness" },
  { id: 45, title: "Executive storytelling that shifts culture/behavior", category: "C", agiThreshold: "High", description: "Audience modeling, narrative sense-making, credibility & timing" },
  { id: 46, title: "Organizational design & role crafting", category: "C", agiThreshold: "High", description: "Tacit workflow understanding, incentives, political capital mapping" },
  { id: 47, title: "Talent identification & potential assessment", category: "C", agiThreshold: "High", description: "Longitudinal prediction, bias mitigation, context-sensitive evaluation" },
  { id: 48, title: "Crisis leadership & sense-making in novel events", category: "C", agiThreshold: "High", description: "Real-time model revision, bounded risk-taking, moral authority" },
  { id: 49, title: "Therapeutic coaching & deep interpersonal repair", category: "C", agiThreshold: "High", description: "Robust empathy, trust formation, cultural competence, harm minimization" },
  { id: 50, title: "Parenting & family decision-making", category: "C", agiThreshold: "High", description: "Child theory-of-mind, secure attachment cues, long-term psychosocial modeling" }
]

function App() {
  const [capabilities, setCapabilities] = useState(initialCapabilities)
  const [draggedItem, setDraggedItem] = useState(null)
  const [showExplanationDialog, setShowExplanationDialog] = useState(false)
  const [currentMove, setCurrentMove] = useState(null)
  const [explanation, setExplanation] = useState('')
  const [recentlyMoved, setRecentlyMoved] = useState(new Set())

  // Calculate AGI progress
  const calculateAGIProgress = () => {
    const categoryA = capabilities.filter(cap => cap.category === 'A').length
    const categoryB = capabilities.filter(cap => cap.category === 'B').length
    const categoryC = capabilities.filter(cap => cap.category === 'C').length
    
    // Starting baseline: all items in their initial correct positions gives us 20 points
    // A=10 items (2 pts each) = 20, B=30 items (1 pt each) = 30, C=10 items (0 pts) = 0
    // Initial total = 50 points, but we want to start lower to show progress
    // So we'll use a different baseline where initial state = ~40% progress
    const totalScore = (categoryA * 2) + (categoryB * 1) + (categoryC * 0)
    
    // Scale the score to make 99 achievable when most items move to category A
    // Max theoretical: all 50 items in A = 100 points
    // We want initial state (20+30+0=50) to show around 40-50% progress
    const maxPossibleScore = 100 // All items in category A
    const progress = (totalScore / maxPossibleScore) * 99
    return Math.min(Math.round(progress), 99)
  }

  const getAGIStatusMessage = (progress) => {
    if (progress >= 99) return "AGI IMMINENT"
    if (progress >= 96) return "AGI Nearly Achieved"
    if (progress >= 86) return "Approaching AGI"
    if (progress >= 71) return "Advanced AI Systems"
    if (progress >= 51) return "Significant AI Progress"
    if (progress >= 31) return "AI Capabilities Growing"
    return "Early AI Development"
  }

  const handleDragStart = (e, capability) => {
    setDraggedItem(capability)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetCategory) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.category === targetCategory) return

    // Check if moving towards AI-better (right side of board)
    const isMovingTowardAI = (
      (draggedItem.category === 'C' && (targetCategory === 'B' || targetCategory === 'A')) ||
      (draggedItem.category === 'B' && targetCategory === 'A')
    )

    if (isMovingTowardAI) {
      setCurrentMove({ item: draggedItem, targetCategory })
      setShowExplanationDialog(true)
    } else {
      // Direct move without explanation
      moveCapability(draggedItem.id, targetCategory, '')
    }

    setDraggedItem(null)
  }

  const moveCapability = (id, targetCategory, explanation) => {
    setCapabilities(prev => prev.map(cap => 
      cap.id === id 
        ? { ...cap, category: targetCategory, moveExplanation: explanation, moveTimestamp: Date.now() }
        : cap
    ))
    
    // Mark as recently moved
    setRecentlyMoved(prev => new Set([...prev, id]))
    
    // Remove from recently moved after 5 seconds
    setTimeout(() => {
      setRecentlyMoved(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 5000)
  }

  const handleExplanationSubmit = () => {
    if (currentMove) {
      moveCapability(currentMove.item.id, currentMove.targetCategory, explanation)
      setShowExplanationDialog(false)
      setCurrentMove(null)
      setExplanation('')
    }
  }

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'A':
        return {
          title: 'AI-Better Today',
          description: 'Already at or beyond human performance',
          color: 'bg-green-50 border-green-200',
          headerColor: 'bg-green-100',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        }
      case 'B':
        return {
          title: 'AI-Competitive / Near-Parity',
          description: 'Strong AI-first candidates with human oversight',
          color: 'bg-yellow-50 border-yellow-200',
          headerColor: 'bg-yellow-100',
          icon: Clock,
          iconColor: 'text-yellow-600'
        }
      case 'C':
        return {
          title: 'Human-Advantaged',
          description: 'Strong AGI signals if AI surpasses humans',
          color: 'bg-red-50 border-red-200',
          headerColor: 'bg-red-100',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        }
      default:
        return {}
    }
  }

  const agiProgress = calculateAGIProgress()
  const agiStatus = getAGIStatusMessage(agiProgress)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">AGI Progress Tracker</h1>
          </div>
          
          {/* AGI Progress Bar */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">AGI Development Index</CardTitle>
                <Badge variant={agiProgress >= 99 ? "destructive" : agiProgress >= 86 ? "default" : "secondary"} className="text-sm">
                  {agiProgress >= 99 ? "🚨 " : ""}{agiStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Progress: {agiProgress}/99</span>
                  <span>{agiProgress >= 99 ? "AGI IMMINENT!" : `${99 - agiProgress} points to AGI`}</span>
                </div>
                <Progress value={agiProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['C', 'B', 'A'].map(category => {
            const config = getCategoryConfig(category)
            const categoryCapabilities = capabilities.filter(cap => cap.category === category)
            const IconComponent = config.icon

            return (
              <div
                key={category}
                className={`${config.color} rounded-lg border-2 border-dashed transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category)}
              >
                <div className={`${config.headerColor} p-4 rounded-t-lg border-b`}>
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                    <h2 className="font-semibold text-slate-900">{config.title}</h2>
                    <Badge variant="outline" className="ml-auto">
                      {categoryCapabilities.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{config.description}</p>
                </div>
                
                <div className="p-4 space-y-3 min-h-[600px]">
                  {categoryCapabilities.map(capability => (
                    <Card
                      key={capability.id}
                      className={`cursor-move transition-all duration-200 hover:shadow-md ${
                        recentlyMoved.has(capability.id) 
                          ? 'ring-2 ring-blue-400 shadow-lg animate-pulse' 
                          : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, capability)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-medium leading-tight">
                            {capability.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs shrink-0">
                            #{capability.id}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-xs mb-2">
                          {capability.description}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {capability.agiThreshold} threshold
                          </Badge>
                          {recentlyMoved.has(capability.id) && (
                            <Badge variant="default" className="text-xs bg-blue-100 text-blue-800">
                              Recently moved
                            </Badge>
                          )}
                        </div>
                        {capability.moveExplanation && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                            <strong>Move reason:</strong> {capability.moveExplanation}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Explanation Dialog */}
        <Dialog open={showExplanationDialog} onOpenChange={setShowExplanationDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Explain the Move</DialogTitle>
              <DialogDescription>
                You're moving "{currentMove?.item?.title}" towards AI being better. 
                Please explain why this capability has improved.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              placeholder="Explain why this AI capability has advanced (e.g., new breakthrough, better performance, wider adoption...)"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExplanationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleExplanationSubmit} disabled={!explanation.trim()}>
                Move Capability
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default App
