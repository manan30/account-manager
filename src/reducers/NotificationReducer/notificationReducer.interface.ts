import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from 'utils/Constants/ActionTypes/NotificationReducerActionTypes';

export type NotificationItem = {
  id: number;
  content?: string;
  theme?: string;
};

export type NotificationState = {
  notifications: NotificationItem[];
};

export interface INotificationAction {
  type: typeof ADD_NOTIFICATION | typeof REMOVE_NOTIFICATION;
  payload: { id?: number; content?: string; theme?: string };
}
