import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateNotificationId } from "~/src/widgets/notifications/lib/utils";

import { MessageI } from "~/src/shared/model";
import { INotification } from "~/src/widgets/notifications/model";

interface IInitialState {
  notifications: INotification[];
}

const initialState: IInitialState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<MessageI>) => {
      if (action.payload.field !== "global") return;
      const notId = generateNotificationId();
      state.notifications.push({
        ...action.payload,
        uuid: notId,
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.uuid !== action.payload,
      );
    },
  },
});

export const selectNotifications = (state: { notifications: IInitialState }) =>
  state.notifications;
export const { addNotification, deleteNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
