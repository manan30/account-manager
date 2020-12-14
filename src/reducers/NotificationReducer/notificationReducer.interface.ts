export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export type NotificationItem = {
  id: number;
  content?: string;
  theme?: string;
};

export interface INotificationState {
  notifications: NotificationItem[];
}

export interface INotificationAction {
  type: typeof ADD_NOTIFICATION | typeof REMOVE_NOTIFICATION;
  payload: { id?: number; content?: string; theme?: string };
}
