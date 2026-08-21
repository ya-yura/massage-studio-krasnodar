import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Массаж Краснодар — подбор формата без угадывания",
  description: "Подберите формат массажа в Краснодаре: спортивный, восстановительный, классический, расслабляющий или массаж лица. Студия на Хакурате, 12 и выездной формат.",
  keywords: ["массаж Краснодар", "спортивный массаж Краснодар", "восстановительный массаж Краснодар"],
  openGraph: {
    title: "Массаж под вашу задачу — без угадывания по каталогу",
    description: "Ответьте на пять коротких вопросов и передайте запрос студии массажа в WhatsApp.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: { card: "summary_large_image", title: "Массаж под вашу задачу в Краснодаре", description: "Подбор формата массажа и запись через WhatsApp." },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
