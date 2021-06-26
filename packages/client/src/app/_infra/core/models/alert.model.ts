export class Alert {
  type: AlertType;
  message: string;
  param?: string;
  alertId: string;
  keepAfterRouteChange: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export const ALERT_TIMEOUT = 7000;
