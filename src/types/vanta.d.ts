declare module "vanta/dist/vanta.fog.min" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const FOG: (opts: any) => any;
  export default FOG;
}

interface Window {
  Calendly?: {
    initPopupWidget: (opts: { url: string }) => void;
  };
}
