# AGI Progress Tracker - Kanban Board

An interactive kanban board that tracks the progress of AI capabilities toward Artificial General Intelligence (AGI). This application visualizes 50 different AI capabilities across three categories and provides real-time AGI progress tracking.

## Features

### 🎯 Core Functionality
- **Interactive Drag & Drop**: Move AI capabilities between categories with smooth animations
- **AGI Progress Index**: Real-time calculation showing progress toward AGI (0-99 scale)
- **Smart Categorization**: Three distinct categories with color-coded visual design
- **Move Explanations**: Required explanations when moving capabilities toward AI-better categories
- **Recent Move Highlighting**: Visual indicators for recently moved items with pulse animations

### 📊 AGI Progress System

The AGI Progress Index is calculated based on capability distribution:
- **AI-Better Today** (Category A): 2 points per capability
- **AI-Competitive** (Category B): 1 point per capability  
- **Human-Advantaged** (Category C): 0 points per capability

**Progress Formula**: `(Total Score / 50) × 99`

**Status Messages**:
- 0-30: "Early AI Development"
- 31-50: "AI Capabilities Growing"
- 51-70: "Significant AI Progress"
- 71-85: "Advanced AI Systems"
- 86-95: "Approaching AGI"
- 96-98: "AGI Nearly Achieved"
- **99: "AGI IMMINENT"** 🚨

### 🎨 Visual Design
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Color-Coded Categories**:
  - 🟢 **AI-Better Today**: Green theme (already superhuman)
  - 🟡 **AI-Competitive**: Yellow theme (near-parity with humans)
  - 🔴 **Human-Advantaged**: Red theme (strong AGI signals if surpassed)
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Professional Typography**: Clear hierarchy and readable content

### 🔄 Interactive Features
- **Drag & Drop**: Intuitive capability movement between categories
- **Explanation Modal**: Appears when moving capabilities toward AI-better categories
- **Recent Move Tracking**: 5-second highlight for moved items
- **Progress Bar**: Visual representation of AGI development
- **Capability Cards**: Detailed information including thresholds and descriptions

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion (available)
- **State Management**: React useState hooks

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (preferred) or npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd agi-kanban-board

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Development
```bash
# Start dev server with network access
pnpm run dev --host

# Access at http://localhost:5173
```

## Usage Guide

### Moving Capabilities
1. **Drag** any capability card to a different column
2. **Drop** it in the target category
3. **Explain** the move if moving toward AI-better categories
4. **Watch** the AGI Progress Index update in real-time

### Understanding Categories

#### AI-Better Today (Category A)
Capabilities where AI already consistently outperforms humans:
- Classic board games (Go, Chess)
- Protein structure prediction (AlphaFold)
- Image classification benchmarks
- Medical imaging (specific tasks)

#### AI-Competitive / Near-Parity (Category B)  
Strong AI-first candidates requiring human oversight:
- Document summarization
- Email drafting
- Data analysis
- Translation services

#### Human-Advantaged (Category C)
Areas where humans still excel (strong AGI signals if AI surpasses):
- Scientific hypothesis generation
- Ethical judgment
- Crisis leadership
- Therapeutic coaching

### AGI Progress Tracking
- Monitor the progress bar at the top
- Watch for status message changes
- **AGI IMMINENT** appears at 99/99 progress
- Each move toward AI-better categories increases the index

## Data Source

The 50 AI capabilities are based on a comprehensive analysis of current AI performance across domains, categorized by:
- **Current Performance**: How AI compares to humans today
- **AGI Threshold**: Difficulty level for achieving superhuman performance
- **Domain Specificity**: Narrow vs. general intelligence requirements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- AI capability analysis based on current research and benchmarks
- UI components from shadcn/ui
- Icons from Lucide React
- Built with React and Vite
