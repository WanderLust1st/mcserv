/**
 * Server Configuration
 * Contains server settings that can be updated via admin panel
 */

export interface ServerConfig {
  ip: string
  port: number
  version: string
  description: string
  status: "online" | "offline"
  playerCount: number
  maxPlayers: number
  news: string[]
}

export const defaultConfig: ServerConfig = {
  ip: process.env.SERVER_IP || "play.yourserver.com",
  port: parseInt(process.env.SERVER_PORT || "25565"),
  version: "1.20.x",
  description: "Welcome to our Minecraft server! Join us for an amazing adventure.",
  status: "online",
  playerCount: 0,
  maxPlayers: 100,
  news: [
    "Server maintenance scheduled for Sunday at 3 AM EST",
    "New world spawn area has been added!",
    "Check out our Discord for updates and community events.",
  ],
}

export function getServerConfig(): ServerConfig {
  return {
    ...defaultConfig,
    ip: process.env.SERVER_IP || defaultConfig.ip,
    port: parseInt(process.env.SERVER_PORT || "25565"),
  }
}
