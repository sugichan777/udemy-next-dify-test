import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function PublicHeader() {
  return (
  <div>  
    <header className="border-b bg-blue-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="font-bold text-xl">
                  Public Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
                <Link href="/login">
                ログイン
                </Link>
            </Button>
            <Button asChild>
                <Link href="/register">
                登録
                </Link>
            </Button>    
        </div>

      </div>
    </header>
  </div>  
  )
}
