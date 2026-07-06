"use client"

import { useSession, signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { isAdmin, getDiscordId } from "@/lib/session"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Megaphone, Settings, Shield, LogOut, Server as ServerIcon } from "lucide-react"

export default function AdminPage() {
  const [isAdminFlag, setIsAdminFlag] = useState<boolean | null>(null)
  const [users, setUsers] = useState<Array<{ id: string; name?: string; email?: string; discordId?: string; admin: boolean }>>([])
  const [news, setNews] = useState<string[]>([])
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Check admin status on mount
  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin()
      setIsAdminFlag(adminStatus)
    }
    checkAdmin()
  }, [])

  // Mock user data - in production, fetch from database
  useEffect(() => {
    if (isAdminFlag === null) return

    const mockUsers = [
      { id: "1", name: "AdminUser", email: "admin@example.com", discordId: "123456789", admin: true },
      { id: "2", name: "PlayerOne", email: "player@example.com", discordId: "987654321", admin: false },
      { id: "3", name: "BuilderBob", email: "builder@example.com", discordId: "111222333", admin: false },
    ]
    setUsers(mockUsers)

    const mockNews = [
      "Server maintenance scheduled for Sunday at 3 AM EST",
      "New world spawn area has been added!",
      "Check out our Discord for updates and community events.",
    ]
    setNews(mockNews)
  }, [isAdminFlag])

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
      await signIn("discord", { callbackUrl: "/login" })
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleAddNews = () => {
    const newEntry = prompt("Enter news announcement:")
    if (newEntry) {
      setNews([...news, newEntry])
    }
  }

  const handleRemoveNews = (index: number) => {
    setNews(news.filter((_, i) => i !== index))
  }

  const toggleAdminStatus = (userId: string) => {
    setUsers(users.map((user) =>
      user.id === userId ? { ...user, admin: !user.admin } : user
    ))
  }

  if (isAdminFlag === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAdminFlag) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        {/* Background particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="glass backdrop-blur-xl border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5">
            <CardContent className="pt-6 text-center space-y-4">
              <Shield className="w-12 h-12 mx-auto text-red-400 mb-4" />
              <h1 className="text-2xl font-bold text-white">Access Denied</h1>
              <p className="text-white/70">
                You don&apos;t have permission to access the admin panel.
              </p>
              <Button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 transition-all btn-press"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black/50 relative">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-neon-purple" />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 transition-all btn-press"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass backdrop-blur-xl border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 to-neon-blue/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome, Administrator!</h2>
                  <p className="text-white/70">Manage your server and community here</p>
                </div>
                <Badge variant="outline" className="border-neon-purple text-neon-purple">
                  Admin Mode Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass backdrop-blur-xl border-white/20 bg-white/5">
              <CardHeader className="pb-3">
                <Users className="w-8 h-8 text-neon-blue mb-2" />
                <CardTitle className="text-white">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{users.length}</div>
                <p className="text-sm text-white/50">Registered accounts</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass backdrop-blur-xl border-white/20 bg-white/5">
              <CardHeader className="pb-3">
                <ServerIcon className="w-8 h-8 text-neon-cyan mb-2" />
                <CardTitle className="text-white">Server Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">Online</div>
                <p className="text-sm text-white/50">All systems operational</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass backdrop-blur-xl border-white/20 bg-white/5">
              <CardHeader className="pb-3">
                <Shield className="w-8 h-8 text-neon-purple mb-2" />
                <CardTitle className="text-white">Admin Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-neon-purple">{users.filter((u) => u.admin).length}</div>
                <p className="text-sm text-white/50">With admin privileges</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* News Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass backdrop-blur-xl border-white/20 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <Megaphone className="w-6 h-6 text-neon-purple" />
                    Server News
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Manage announcements displayed on the server website
                  </CardDescription>
                </div>
                <Button onClick={handleAddNews} variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/20">
                  + Add News
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {news.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-white/50 py-8"
                  >
                    No news items. Add your first announcement!
                  </motion.p>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    {news.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-4 rounded-lg glass-dark bg-white/5 flex items-center justify-between group"
                      >
                        <span className="text-white">{item}</span>
                        <Button
                          onClick={() => handleRemoveNews(index)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-500/20 hover:text-red-400 transition-all"
                        >
                          Remove
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass backdrop-blur-xl border-white/20 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <Users className="w-6 h-6 text-neon-blue" />
                    User Management
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    View and manage registered users
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg glass-dark bg-white/5 hover:bg-white/8 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${user.admin ? "bg-neon-purple" : "bg-white/20"}`} />
                        <div>
                          <div className="text-white font-medium">{user.name || "Unknown User"}</div>
                          <div className="text-sm text-white/50">
                            {user.email || "No email"} • {user.discordId || "No Discord ID"}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => toggleAdminStatus(user.id)}
                        variant={user.admin ? "destructive" : "outline"}
                        size="sm"
                        className={`transition-all ${
                          user.admin
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
                            : "border-neon-purple text-neon-purple hover:bg-neon-purple/20"
                        }`}
                      >
                        {user.admin ? "Remove Admin" : "Make Admin"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-white/50 text-sm">
          Admin Dashboard • Protected by NextAuth.js • {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}
