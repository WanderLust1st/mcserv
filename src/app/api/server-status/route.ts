import { NextResponse } from "next/server"

/**
 * Server Status API
 * Returns mock server status data
 * In production, this would fetch real data from your Minecraft server
 */

export async function GET() {
  try {
    // Simulate fetching server status
    // In production, you'd use a library like 'minecraft-server-status' or fetch from your server's RCON
    const serverStatus = {
      online: true,
      ip: process.env.SERVER_IP || "play.yourserver.com",
      port: parseInt(process.env.SERVER_PORT || "25565"),
      playerCount: Math.floor(Math.random() * 50), // Mock player count
      maxPlayers: 100,
      version: "1.20.x",
      motd: "Welcome to our Minecraft Server!",
      favicon: null, // You can add a server icon here
    }

    return NextResponse.json(serverStatus)
  } catch (error) {
    console.error("Server status error:", error)
    return NextResponse.json(
      {
        online: false,
        ip: process.env.SERVER_IP || "play.yourserver.com",
        port: parseInt(process.env.SERVER_PORT || "25565"),
        playerCount: 0,
        maxPlayers: 100,
        version: "unknown",
        motd: "Server is currently offline",
      },
      { status: 503 }
    )
  }
}
