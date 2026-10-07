import Script from "next/script";
import { MedicionClics } from "./MedicionClics";

/**
 * Google Analytics 4 y píxel de Meta. Solo se cargan si las variables de entorno
 * tienen valor (NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_META_PIXEL_ID). Se cargan después
 * de que la página es interactiva para no afectar el rendimiento.
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const seguro = (v: string) => v.replace(/[^A-Za-z0-9-]/g, "");

  return (
    <>
      {(ga || pixel) && <MedicionClics />}
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${seguro(ga)}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seguro(ga)}');`}
          </Script>
        </>
      )}
      {pixel && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${seguro(pixel)}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
