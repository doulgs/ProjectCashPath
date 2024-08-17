import { ChartOverview } from "@/components/chart";
import { Releases } from "@/components/releases";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="sm:ml-14 p-4">
      <div className="grid grid-cols-1 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Geral</CardTitle>
              <DollarSign />
            </div>
            <CardDescription>Saldo atual disponivel</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold">R$ 10.000</p>
          </CardContent>
        </Card>
      </div>
      <section className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Entradas</CardTitle>
              <TrendingUp />
            </div>
            <CardDescription>Total de entradas nos ultimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold text-green-600">R$ 50.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Saidas</CardTitle>
              <TrendingDown />
            </div>
            <CardDescription>Total de saidas nos ultimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg font-bold text-red-600">R$ 40.000</p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Releases />
      </section>
    </main>
  );
}
