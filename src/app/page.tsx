// Method 1: app/page.tsx - Root page redirect
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/landing')
}
