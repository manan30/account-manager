import {
  NOTIFICATION_THEME_FAILURE,
  NOTIFICATION_THEME_SUCCESS,
  NOTIFICATION_THEME_WARNING
} from '../../utils/Constants/ThemeConstants';

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

type NotificationTheme =
  | typeof NOTIFICATION_THEME_SUCCESS
  | typeof NOTIFICATION_THEME_FAILURE
  | typeof NOTIFICATION_THEME_WARNING;

export interface INotificationAction {
  type: typeof ADD_NOTIFICATION | typeof REMOVE_NOTIFICATION;
  payload: { id?: number; content?: string; theme?: NotificationTheme };
}
