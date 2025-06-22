// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card } from "@/components/ui/card"
// import { X, Eye, EyeOff, BookOpen } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// interface AuthModalProps {
//   mode: "login" | "register"
//   onClose: () => void
//   onSwitchMode: (mode: "login" | "register") => void
// }

// export function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     city: "",
//     bio: "",
//   })

//   const cities = [
//     "Fortaleza",
//     "Caucaia",
//     "Juazeiro do Norte",
//     "Maracanaú",
//     "Sobral",
//     "Crato",
//     "Itapipoca",
//     "Maranguape",
//     "Iguatu",
//     "Quixadá",
//     "Canindé",
//     "Aquiraz",
//     "Pacatuba",
//     "Crateús",
//     "Aracati",
//   ]

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Implementar lógica de autenticação
//     console.log("Form submitted:", { mode, formData })
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <BookOpen className="w-6 h-6 text-[#009c3b]" />
//               <h2 className="text-xl font-bold text-[#131313]">{mode === "login" ? "Entrar" : "Criar Conta"}</h2>
//             </div>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="w-5 h-5" />
//             </Button>
//           </div>

//           {/* Welcome Message */}
//           <div className="mb-6 text-center">
//             <p className="text-[#6e6e6e] text-sm">
//               {mode === "login"
//                 ? "Entre na sua conta para continuar lendo e escrevendo"
//                 : "Crie sua conta e comece a ler e escrever histórias incríveis"}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {mode === "register" && (
//               <div>
//                 <Label htmlFor="name" className="text-sm font-medium text-[#131313]">
//                   Nome Completo
//                 </Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="mt-1"
//                 />
//               </div>
//             )}

//             <div>
//               <Label htmlFor="email" className="text-sm font-medium text-[#131313]">
//                 E-mail
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label htmlFor="password" className="text-sm font-medium text-[#131313]">
//                 Senha
//               </Label>
//               <div className="relative mt-1">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="pr-10"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="icon"
//                   className="absolute right-0 top-0 h-full px-3"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </Button>
//               </div>
//             </div>

//             {mode === "register" && (
//               <>
//                 <div>
//                   <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#131313]">
//                     Confirmar Senha
//                   </Label>
//                   <Input
//                     id="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                     className="mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="city" className="text-sm font-medium text-[#131313]">
//                     Cidade (Ceará)
//                   </Label>
//                   <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
//                     <SelectTrigger className="mt-1">
//                       <SelectValue placeholder="Selecione sua cidade" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {cities.map((city) => (
//                         <SelectItem key={city} value={city}>
//                           {city}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="bio" className="text-sm font-medium text-[#131313]">
//                     Sobre você (opcional)
//                   </Label>
//                   <Textarea
//                     id="bio"
//                     placeholder="Conte um pouco sobre você, seus interesses literários..."
//                     value={formData.bio}
//                     onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//                     className="mt-1 resize-none"
//                     rows={3}
//                   />
//                 </div>
//               </>
//             )}

//             <Button type="submit" className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90 text-white">
//               {mode === "login" ? "Entrar" : "Criar Conta"}
//             </Button>
//           </form>

//           {/* Switch Mode */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-[#6e6e6e]">
//               {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
//               <Button
//                 variant="link"
//                 className="text-[#009c3b] hover:text-[#009c3b]/80 p-0 ml-1"
//                 onClick={() => onSwitchMode(mode === "login" ? "register" : "login")}
//               >
//                 {mode === "login" ? "Cadastre-se" : "Faça login"}
//               </Button>
//             </p>
//           </div>

//           {/* Forgot Password (only for login) */}
//           {mode === "login" && (
//             <div className="mt-4 text-center">
//               <Button variant="link" className="text-sm text-[#6e6e6e] hover:text-[#009c3b]">
//                 Esqueceu sua senha?
//               </Button>
//             </div>
//           )}
//         </div>
//       </Card>
//     </div>
//   )
// }
