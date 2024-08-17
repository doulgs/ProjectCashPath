import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Releases() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ultimos lançamentos</CardTitle>
          <DollarSign />
        </div>
        <CardDescription>Ultimos lançamentos realizados</CardDescription>
      </CardHeader>
      <CardContent>
        <article className="flex items-center justify-between gap-2 border-b py-2">
          <div className="flex items-center justify-between gap-2 border-b py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/doulgs.png" />
              <AvatarFallback>DD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold">Assinatura chat-GPT</p>
              <span className="text-[12px] sm:text-sm text-gray-400">
                assinatura mensal ref ao chat-gpt4
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold text-red-600">- R$ 400.00</p>
          </div>
        </article>

        <article className="flex items-center justify-between gap-2 border-b py-2">
          <div className="flex items-center justify-between gap-2 border-b py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/doulgs.png" />
              <AvatarFallback>DD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold">Fatura Santander</p>
              <span className="text-[12px] sm:text-sm text-gray-400">
                Fatura ref ao mes 07 do banco Santander
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold text-red-600">
              - R$ 4000.00
            </p>
          </div>
        </article>

        <article className="flex items-center justify-between gap-2 border-b py-2">
          <div className="flex items-center justify-between gap-2 border-b py-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/doulgs.png" />
              <AvatarFallback>DD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-semibold">Projetos</p>
              <span className="text-[12px] sm:text-sm text-gray-400">
                recebimentos mensais de projetos
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold text-green-600">
              R$ 5000.25
            </p>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
