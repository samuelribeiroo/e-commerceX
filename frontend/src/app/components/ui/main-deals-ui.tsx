"use client";

import { PropsWithChildren } from "react";

export default function PromoBanner() {
  return (
    <>
      <BannerContainer>
        <BannerBackground
          title={"Top Produtos Apple"}
          promo={""}
          href={"Ver mais"}
          src={`url('https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2Fstore-card-13-iphone-nav-202502.png?alt=media&token=a21712fc-59a2-4693-968a-1609e50189ff')`}
        />

        <BannerBackground
          title={"Top Produtos Samsung"}
          promo={""}
          href={"Ver mais"}
          src={`url('https://firebasestorage.googleapis.com/v0/b/third-project-89e32.appspot.com/o/PRODUTOS%2Fcelulares%2Fslides%2Fblog%2Fbanner-samsung.webp?alt=media&token=8951eb5e-ea1a-4927-a63b-7a65ea1ad519')`}
          textWhite
        />
      </BannerContainer>
    </>
  );
}

function BannerContainer({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">{children}</div>
    </>
  );
}


function BannerBackground(props: {
  title: string;
  promo: string;
  href: string;
  src: string;
  textWhite?: boolean;
}) {
  return (
    <>
      <div className="flex-1 border-2 border-gray-200 relative overflow-hidden rounded-lg bg-[##F9FBFC]">
        <div className="absolute inset-0 z-0">
          <div
            className="size-full bg-cover"
            style={{
              backgroundImage: props.src,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-[180px] p-6">
          <span>
            <h3 className={`${props.textWhite ? 'text-white' : 'text-black'} text-xl font-medium mt-12`}>
              {props.title}
            </h3>
            <p className={`${props.textWhite ? 'text-white' : 'text-black'} text-xl font-medium`}>{props.promo}</p>
          </span>

          <span>
            <button className={`${props.textWhite ? 'text-white' : 'text-black'} text-lg font-medium hover:underline`}>
              {props.href}
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
