import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NotificationItem from '@/components/notifications/NotificationItem';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { notifications, unreadCount, markAllAsRead } = useNotification();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  // Mark all as read when the page is opened
  useEffect(() => {
    // A small delay gives a better UX feel, allowing the user to see the unread state briefly
    const timer = setTimeout(() => {
      markAllAsRead();
    }, 500);
    return () => clearTimeout(timer);
  }, [markAllAsRead]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-secondary">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-primary shadow-md">
        <div className="container mx-auto flex h-[68px] items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-primary-foreground">
                {getTranslation("Notifications", "নোটিফিকেশন")}
              </h1>
              <p className="text-sm font-normal text-green-200">
                {getTranslation("Your recent alerts", "আপনার সাম্প্রতিক সতর্কতা")}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              {getTranslation("Mark all as read", "সবগুলো পড়া হয়েছে")}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto w-full max-w-md space-y-4 py-6 px-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <Card className="mt-6 p-8 text-center shadow-lg border-border/50 rounded-2xl bg-background">
            <CardContent className="p-0 flex flex-col items-center justify-center h-48">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                {getTranslation("No Notifications Yet", "এখনো কোনো নোটিফিকেশন নেই")}
              </h3>
              <p className="text-sm text-muted-foreground/80 mt-1">
                {getTranslation("Important alerts will appear here.", "গুরুত্বপূর্ণ সতর্কতা এখানে দেখা যাবে।")}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;