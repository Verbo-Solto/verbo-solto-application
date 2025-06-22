import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-[#131313] mb-2">Component Library</h3>
        <p className="text-[#6e6e6e]">Reusable components with consistent styling</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Buttons</h4>
          <div className="space-y-3">
            <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Primary Button</Button>
            <Button variant="outline" className="w-full">
              Secondary Button
            </Button>
            <Button variant="ghost" className="w-full">
              Ghost Button
            </Button>
          </div>
        </Card>

        {/* Form Elements */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Form Elements</h4>
          <div className="space-y-3">
            <Input placeholder="Enter your email" />
            <Input type="password" placeholder="Password" />
            <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Submit</Button>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Badges</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#009c3b]">Success</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </Card>

        {/* Avatars */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Avatars</h4>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        </Card>

        {/* Progress */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Progress</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Loading</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="p-6">
          <h4 className="font-semibold text-[#131313] mb-4">Color Palette</h4>
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-square bg-[#009c3b] rounded"></div>
            <div className="aspect-square bg-[#131313] rounded"></div>
            <div className="aspect-square bg-[#6e6e6e] rounded"></div>
            <div className="aspect-square bg-[#f4f4f4] rounded border"></div>
          </div>
        </Card>
      </div>
    </div>
  )
}
