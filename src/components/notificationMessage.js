import react from 'react';
import {Button, rows, TableSelectAll, ToastNotification, InlineNotification} from 'carbon-components-react';
import React from "react";


export default function NotificationMessage(props) {
  const toastNotificationProps = () => ({
    kind: props.settings.kind,
    lowContrast: true,
    role: 'alert',
    title: 'Notification',
    subtitle: props.settings.subtitle,
    caption: new Date().getTime(),
  });

  return (
      <InlineNotification
          {...toastNotificationProps()}
          style={{ marginBottom: '.5rem' }}
      />
  )
}
