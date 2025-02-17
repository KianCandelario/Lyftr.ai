"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { poppins, inter, instrument_sans } from "@/lib/fonts/fonts"
import { login, signup } from "@/app/landing/login/actions"
import { useState } from "react"
import { usePasswordMatch } from "@/hooks/usePasswordMatch"
import { usePasswordValidator } from "@/hooks/usePasswordValidator"
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react"


export function AccountTab() {
  const [isChecked, setIsChecked] = useState(() => false);
  const [password, setPassword] = useState(() => "");
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  const [userEmail, setUserEmail] = useState(() => "");
  const [userPassword, setUserPassword] = useState(() => "");
  const [loading, setLoading] = useState(() => false);
  
  const { isMatch, errorMessage } = usePasswordMatch( password, confirmPassword );
  const { isValid, error_Valid_Message } = usePasswordValidator( password, confirmPassword );


  const showPassword = () => {
    setIsChecked((prevState) => !prevState);
  }

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    setLoading(false);

    if (result.success) {
      toast.success("Signed up successfully!", {
        description: result.message || "Please go to your email account to verify your email address."
      })
    }
    else {
      toast.error("An error has occured", {
        description: result.message || "There was an error with your inputs. Please try again."
      })
    }

    setUserEmail("");
    setUserPassword("");
    setConfirmPassword("");
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    setLoading(false);

    if (result.success) {
      toast.success("Logged in successfully!", {
        description: result.message || "Please wait a second..."
      })
      setTimeout(() => {
        redirect('/chat');
      }, 3500)
    }
    else {
      toast.error("Log in error.", {
        description: result.message || "Please double check your credentials and try again."
      })
    }

    setUserEmail("");
    setUserPassword("");
  }

  return (
    <Tabs defaultValue="sign_in" className="w-full">
      <TabsList className={`grid w-full grid-cols-2 ${poppins.className} mb-5`}>
        <TabsTrigger value="sign_in">sign in</TabsTrigger>
        <TabsTrigger value="sign_up">sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign_in">

      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-4">
          <div className={`${inter.className}`}>
            <Label htmlFor="email">email address</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="enter your email address"
              value={userEmail}
              onChange={
                (e) => {
                  setUserEmail(e.target.value);
                }
              } 
              required
            />
          </div>

          <div className={`${inter.className}`}>
            <Label htmlFor="password" className="font-xs">password</Label>
            <Input 
              type={isChecked ? "text" : "password"}
              id="password" 
              name="password" 
              placeholder="enter your password"
              value={userPassword}
              onChange={
                (e) => {
                  setUserPassword(e.target.value);
                }
              } 
              required 
            />
          </div>

          <div className="flex items-center gap-1">
            <Checkbox 
              id="show-password" 
              className="rounded" 
              checked={isChecked} 
              onCheckedChange={showPassword} 
            />
            <Label htmlFor="show-password" className={`${inter.className} text-xs`}>show password</Label>
          </div>

          <Button 
            variant="default" 
            className={`${inter.className} text-xs mt-3 font-bold`} 
            type="submit">
              { loading ? "Logging in..." : "Log in" }
            </Button>
        </div>

      </form>

      </TabsContent>
      <TabsContent value="sign_up">

      <form onSubmit={handleSignup}>
        <div className="flex flex-col gap-4">
          <div className={`${inter.className}`}>
            <Label htmlFor="email">email address</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="enter your email address" 
              value={userEmail}
              onChange={
                (e) => {
                  setUserEmail(e.target.value);
                }
              }
              required
            />
          </div>

          <div className={`${inter.className}`}>
            <Label htmlFor="password" className="font-xs">password</Label>
            <Input 
              type={isChecked ? "text" : "password"} 
              id="password" 
              name="password" 
              placeholder="enter your password" 
              value={userPassword}
              required
              onChange={
                (e) => {
                  setPassword(e.target.value);
                  setUserPassword(e.target.value);
                }
              }
            />
          </div>

          <div className={`${inter.className}`}>
            <Label htmlFor="confirm-password" className="font-xs">
              confirm password
            </Label>
            <Input 
              type={isChecked ? "text" : "password"} 
              id="confirm-password" 
              name="confirm-password" 
              placeholder="re-enter your password" 
              value={confirmPassword}
              required
              onChange={
                (e) => {
                  setConfirmPassword(e.target.value);
                }
              }
            />
            {/*{ isMatch ? ""
              : 
                <div>
                  <span className={`${instrument_sans.className} text-[0.70rem] text-red-500 mt-2 italic`}>
                    {errorMessage}
                  </span>
                </div>
            }
            { isValid ? ""
              :
                <div>
                  <span className={`${instrument_sans.className} text-[0.70rem] text-red-500 mt-1 italic`}>
                    {error_Valid_Message}
                  </span>
                </div>
            }*/
             isMatch && isValid ? ""
              :
              <Alert className="mt-3">
                <AlertTriangleIcon />
                <AlertTitle className={`${instrument_sans.className} font-bold`}>Oops! Something's wrong!</AlertTitle>
                <AlertDescription className={`${instrument_sans.className} text-xs`}>
                  {
                    isMatch ? ""
                    : errorMessage
                  }  { !isMatch && !isValid ? <br/ > : "" }  {
                    isValid ? "" :
                    error_Valid_Message
                  }
                </AlertDescription>
              </Alert>  
            }
          </div>

          <div className="flex items-center gap-1">
            <Checkbox 
              id="show-password" 
              className="rounded" 
              checked={isChecked} 
              onCheckedChange={showPassword}  
            />
            <Label htmlFor="show-password" className={`${inter.className} text-xs`}>show password</Label>
          </div>

          <Button 
            variant="default" 
            className={`
              ${inter.className} 
              text-xs mt-3 font-bold
              ${
                isValid && isMatch ? "" 
                : "opacity-50"
              }
            `}
            type="submit"
            disabled={!isValid || !isMatch}>
              {loading ? "Registering..." : "Register"}
            </Button>
        </div>

      </form>

      </TabsContent>
    </Tabs>
  )
}