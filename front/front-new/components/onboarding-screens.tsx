import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, Users, MessageSquare, Settings } from "lucide-react"

export function OnboardingScreens() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Screen */}
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-[#009c3b] rounded-full mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#131313] mb-4">Welcome to the Platform!</h2>
        <p className="text-[#6e6e6e] mb-6 max-w-md mx-auto">
          We're excited to have you here. Let's get you set up with everything you need to get started.
        </p>
        <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>

      {/* Progress Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="w-12 h-12 bg-[#009c3b] rounded-lg mb-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-[#131313] mb-2">Create Your Profile</h3>
          <p className="text-sm text-[#6e6e6e] mb-4">
            Add your personal information and profile picture to get started.
          </p>
          <Progress value={100} className="mb-3" />
          <div className="flex items-center text-sm text-[#009c3b]">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </div>
        </Card>

        <Card className="p-6">
          <div className="w-12 h-12 bg-[#d2d2d2] rounded-lg mb-4 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#6e6e6e]" />
          </div>
          <h3 className="font-semibold text-[#131313] mb-2">Connect with Others</h3>
          <p className="text-sm text-[#6e6e6e] mb-4">Find and connect with colleagues, friends, and new contacts.</p>
          <Progress value={60} className="mb-3" />
          <div className="flex items-center text-sm text-[#6e6e6e]">In Progress</div>
        </Card>

        <Card className="p-6">
          <div className="w-12 h-12 bg-[#d2d2d2] rounded-lg mb-4 flex items-center justify-center">
            <Settings className="w-6 h-6 text-[#6e6e6e]" />
          </div>
          <h3 className="font-semibold text-[#131313] mb-2">Customize Settings</h3>
          <p className="text-sm text-[#6e6e6e] mb-4">
            Personalize your experience with custom preferences and settings.
          </p>
          <Progress value={0} className="mb-3" />
          <div className="flex items-center text-sm text-[#6e6e6e]">Not Started</div>
        </Card>
      </div>

      {/* Tutorial Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-[#131313] mb-4">Quick Tutorial</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#009c3b] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-medium">1</span>
              </div>
              <div>
                <p className="font-medium text-[#131313]">Navigate the Dashboard</p>
                <p className="text-sm text-[#6e6e6e]">Learn how to use the main navigation and find key features.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#009c3b] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-white font-medium">2</span>
              </div>
              <div>
                <p className="font-medium text-[#131313]">Send Your First Message</p>
                <p className="text-sm text-[#6e6e6e]">Start a conversation and explore the messaging features.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#d2d2d2] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-[#6e6e6e] font-medium">3</span>
              </div>
              <div>
                <p className="font-medium text-[#131313]">Explore Advanced Features</p>
                <p className="text-sm text-[#6e6e6e]">Discover powerful tools to enhance your productivity.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-[#f4f4f4]">
          <h3 className="font-semibold text-[#131313] mb-4">Need Help?</h3>
          <p className="text-[#6e6e6e] mb-4">Our support team is here to help you get the most out of the platform.</p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-white">
              View Documentation
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-white">
              Join Community
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
