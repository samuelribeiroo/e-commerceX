import { PropsWithChildren } from "react";

function CardPost({ children }: PropsWithChildren) {
  return (
    <>
    <article className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col h-full">
      {children}
    </article>
    </>
  )
}

function CardPostContent({ children }: PropsWithChildren) {
  return (
    <>
    <div className="pt-0 pb-4 px-4 flex-grow">
      {children}
    </div>
    </>
  )
}

function CardPostFooter({ children }: PropsWithChildren) {
  return (
    <>
    <footer className="flex items-center p-6 pt-0">
      {children}
    </footer>
    </>
  )
}

export { CardPost, CardPostContent, CardPostFooter }