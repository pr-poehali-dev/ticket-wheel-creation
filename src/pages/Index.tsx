import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [tokens, setTokens] = useState(5);
  const [showPurchase, setShowPurchase] = useState(false);
  const [currentSection, setCurrentSection] = useState("main");

  const rarityTypes = [
    {
      name: "Обычный",
      color: "bg-gray-600",
      chance: "40%",
      count: 40,
      price: 0,
    },
    {
      name: "Редкий",
      color: "bg-blue-600",
      chance: "25%",
      count: 25,
      price: 30,
    },
    {
      name: "Сверх редкий",
      color: "bg-purple-600",
      chance: "15%",
      count: 15,
      price: 45,
    },
    {
      name: "Эпический",
      color: "bg-pink-600",
      chance: "10%",
      count: 10,
      price: 50,
    },
    {
      name: "Мифический",
      color: "bg-orange-600",
      chance: "6%",
      count: 6,
      price: 75,
    },
    {
      name: "Легендарный",
      color: "bg-yellow-600",
      chance: "3%",
      count: 3,
      price: 100,
    },
    {
      name: "Рубиновый",
      color: "bg-red-600",
      chance: "1%",
      count: 1,
      price: 150,
    },
  ];

  const spinWheel = () => {
    if (tokens <= 0) {
      setShowPurchase(true);
      return;
    }

    setIsSpinning(true);
    setTokens(tokens - 1);

    setTimeout(() => {
      setIsSpinning(false);
      const randomIndex = Math.floor(Math.random() * rarityTypes.length);
      alert(
        `Поздравляем! Вы выиграли билет категории: ${rarityTypes[randomIndex].name}`,
      );
    }, 4000);
  };

  const renderMainContent = () => (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent mb-4">
          🎰 Колесо Фортуны
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Испытайте удачу и выиграйте билеты разной редкости!
        </p>
      </div>

      <div className="relative">
        <div
          className={`w-80 h-80 rounded-full border-8 border-primary relative overflow-hidden ${
            isSpinning ? "animate-spin-wheel" : ""
          } ${!isSpinning ? "animate-glow-pulse" : ""}`}
        >
          {rarityTypes.map((rarity, index) => {
            const angle = (360 / rarityTypes.length) * index;
            const nextAngle = (360 / rarityTypes.length) * (index + 1);

            return (
              <div
                key={rarity.name}
                className={`absolute w-full h-full ${rarity.color} opacity-80`}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((angle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((nextAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((nextAngle - 90) * Math.PI) / 180)}%)`,
                  transform: "rotate(0deg)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm transform rotate-${angle}">
                    {rarity.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-primary"></div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Ticket" className="text-primary" />
          <span className="text-2xl font-bold">Талоны: {tokens}</span>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={spinWheel}
            disabled={isSpinning || tokens <= 0}
            size="lg"
            className="bg-gradient-to-r from-primary to-yellow-400 hover:from-yellow-400 hover:to-primary text-black font-bold px-8 py-3 text-lg"
          >
            {isSpinning ? "Вращается..." : "Крутить колесо!"}
          </Button>

          <Button
            onClick={() => setShowPurchase(true)}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-black px-8 py-3 text-lg"
          >
            Купить талоны
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">
              Шансы на выигрыш
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rarityTypes.map((rarity) => (
                <div
                  key={rarity.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${rarity.color}`}
                    ></div>
                    <span className="font-medium">{rarity.name}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {rarity.chance}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">
              Стоимость билетов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rarityTypes.map((rarity) => (
                <div
                  key={rarity.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${rarity.color}`}
                    ></div>
                    <span className="font-medium">{rarity.name}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary font-bold"
                  >
                    {rarity.price === 0 ? "Бесплатно" : `${rarity.price} ₽`}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPurchaseDialog = () => (
    <Dialog open={showPurchase} onOpenChange={setShowPurchase}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">
            Покупка талонов
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">75 ₽</div>
            <div className="text-muted-foreground">за 1 талон</div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3"
              size="lg"
            >
              Купить 1 талон - 75 ₽
            </Button>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3"
              size="lg"
            >
              Купить 5 талонов - 350 ₽
            </Button>
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3"
              size="lg"
            >
              Купить 10 талонов - 650 ₽
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Оплата происходит через защищенный сервис
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderNavigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Crown" className="text-primary" size={24} />
            <span className="text-xl font-bold text-primary">
              Колесо Фортуны
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("main")}
              className={
                currentSection === "main"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Главная
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("rules")}
              className={
                currentSection === "rules"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Правила
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("profile")}
              className={
                currentSection === "profile"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Профиль
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentSection("support")}
              className={
                currentSection === "support"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Поддержка
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground">
      {renderNavigation()}

      <main className="container mx-auto px-4 py-24">
        {currentSection === "main" && renderMainContent()}

        {currentSection === "rules" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-8">
              Правила игры
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">
                    Как играть
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Купите талоны по 75 ₽ за штуку</li>
                    <li>• Нажмите "Крутить колесо!" для запуска</li>
                    <li>• Дождитесь остановки колеса</li>
                    <li>• Получите билет согласно выпавшей категории</li>
                  </ul>
                </div>

                <Separator className="bg-primary/20" />

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary">
                    Категории билетов
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rarityTypes.map((rarity) => (
                      <div
                        key={rarity.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-background/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded-full ${rarity.color}`}
                          ></div>
                          <span className="font-medium">{rarity.name}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          {rarity.chance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === "profile" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-8">
              Личный кабинет
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <h3 className="text-2xl font-bold text-primary">
                      Добро пожаловать!
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <span className="font-medium">Текущие талоны:</span>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary text-lg px-3 py-1"
                      >
                        {tokens}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                      <span className="font-medium">Всего прокруток:</span>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary text-lg px-3 py-1"
                      >
                        0
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === "support" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-8">
              Поддержка
            </h2>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎧</div>
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    Нужна помощь?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Наша служба поддержки готова помочь вам 24/7
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3"
                    size="lg"
                  >
                    <Icon name="MessageCircle" className="mr-2" />
                    Написать в чат
                  </Button>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3"
                    size="lg"
                  >
                    <Icon name="Mail" className="mr-2" />
                    Отправить email
                  </Button>

                  <div className="text-center text-sm text-muted-foreground mt-6">
                    Время ответа: обычно в течение 1 часа
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {renderPurchaseDialog()}
    </div>
  );
};

export default Index;
