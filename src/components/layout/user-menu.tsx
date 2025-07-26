'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User as UserIcon, Settings, LogOut } from 'lucide-react'

interface UserMenuProps {
  user: Pick<User, 'id' | 'name' | 'email' | 'profileImageUrl' | 'role'>
}

export function UserMenu({ user }: UserMenuProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImageUrl || ''} alt={user.name || 'User'} />
            <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user.name || 'No name set'}</p>
            <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
            <p className="text-muted-foreground text-xs leading-none capitalize">
              {user.role.toLowerCase()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={() => signOut({ callbackUrl: '/sign-in' })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
