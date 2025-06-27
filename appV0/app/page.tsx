"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown } from "lucide-react"

interface Victory {
  game: string
  date: string
}

export default function VictoryTracker() {
  const [valeVictories, setValeVictories] = useState<Victory[]>([
    { game: "Monopoli", date: "12/03/25" },
    { game: "Cartas", date: "8/02/25" },
  ])

  const [tomVictories, setTomVictories] = useState<Victory[]>([{ game: "futbol", date: "15/03/25" }])

  const addVictory = (player: "vale" | "tom") => {
    const game = prompt("¿En qué juego ganaste?")
    if (game) {
      const today = new Date()
      const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().slice(-2)}`

      if (player === "vale") {
        setValeVictories([...valeVictories, { game, date }])
      } else {
        setTomVictories([...tomVictories, { game, date }])
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-4 border-black bg-white">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Te gano en todo</h1>
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vale Column */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Vale: {valeVictories.length}
                  {valeVictories.length > tomVictories.length && (
                    <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  )}
                </h2>

                <Card className="border-2 border-black min-h-[300px]">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {valeVictories.map((victory, index) => (
                        <div key={index} className="border border-gray-400 p-2 bg-white">
                          <span className="font-medium">{victory.game}</span>
                          <span className="ml-2 text-sm text-gray-600">{victory.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={() => addVictory("vale")}
                  className="w-full border-2 border-black bg-white text-black hover:bg-gray-100"
                  variant="outline"
                >
                  Agregar victoria
                </Button>
              </div>

              {/* Tom Column */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  Tom: {tomVictories.length}
                  {tomVictories.length > valeVictories.length && (
                    <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  )}
                </h2>

                <Card className="border-2 border-black min-h-[300px]">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {tomVictories.map((victory, index) => (
                        <div key={index} className="border border-gray-400 p-2 bg-white">
                          <span className="font-medium">{victory.game}</span>
                          <span className="ml-2 text-sm text-gray-600">{victory.date}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={() => addVictory("tom")}
                  className="w-full border-2 border-black bg-white text-black hover:bg-gray-100"
                  variant="outline"
                >
                  Agregar victoria
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
