export type NotificationItem = {
  id: number;
};

export type NotificationState = {
  notifications: NotificationItem[];
};

interface Action {
  type: string;
}

export interface NotificationAction extends Action {
  payload: { id: number; content: string; theme?: string };
}
