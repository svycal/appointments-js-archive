import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "savvycal-booking": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { src?: string };
      "savvycal-booking-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { src?: string };
      "savvycal-booking-embed": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "client-email"?: string;
        "client-first-name"?: string;
        "client-last-name"?: string;
        locale?: string;
        service?: string;
        theme?: string;
      };
    }
  }
}
