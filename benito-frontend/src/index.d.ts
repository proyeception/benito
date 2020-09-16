declare module "react-alert-template-basic" {
  var AlertTemplate: any;
  export default AlertTemplate;
}

declare module "react-loading-overlay" {
  export type LoadingOverlayProps = {
    active?: boolean;
    fadeSpeed?: number;
    onClick?: () => void;
    className?: string;
    classNamePrefix?: string;
    spinner?: boolean;
    text?: string;
    styles?: any;
  };
  export default class LoadingOverlay extends React.Component<
    LoadingOverlayProps
  > {}
}
