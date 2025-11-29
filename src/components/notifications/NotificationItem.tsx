import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, bn } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { type Notification } from '@/contexts/NotificationContext';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { language } = useLanguage();

  const getIcon = () => {
    switch (notification.type) {
      case 'info':
        return { Icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'warning':
        return { Icon: AlertTriangle, color: 'text-harvest-yellow', bg: 'bg-yellow-50' };
      case 'success':
        return { Icon: CheckCircle, color: 'text-primary', bg: 'bg-green-50' };
      case 'error':
        return { Icon: XCircle, color: 'text-destructive', bg: 'bg-red-50' };
      default:
        return { Icon: Info, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const { Icon, color, bg } = getIcon();

  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: language === 'bn' ? bn : enUS,
  });

  return (
    <Card className={cn("w-full shadow-md border-border/50 rounded-xl transition-opacity", !notification.isRead && "bg-secondary")}>
      <CardContent className="p-4 flex items-start gap-4">
        {!notification.isRead && (
          <div className="h-2 w-2 rounded-full bg-primary mt-1 flex-shrink-0 animate-pulse"></div>
        )}
        <div className={cn("h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0", bg, notification.isRead && "ml-4")}>
          <Icon className={cn("h-5 w-5", color)} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-foreground pr-2">
              {notification.message}
            </h4>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {timeAgo}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {notification.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;