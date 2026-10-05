import { ArrowUpRight, Bell, Database, LockKeyhole, SlidersHorizontal, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMoney } from '@/lib/money/context';
import profileImage from '@/assets/profile.jpg';

export function SettingsOverview({ onSelect }: { onSelect: (tab: string) => void }) {
  const { data, demo } = useMoney();
  const unread = data.notifications.filter((notice) => !notice.read).length;
  return (
    <div className="settings-bento">
      <section className="settings-profile settings-tile">
        <div className="flex items-center gap-5 min-w-0">
          <img src={profileImage} alt="Your profile" className="settings-avatar" width={80} height={80} />
          <div className="min-w-0">
            <p className="settings-eyebrow">Personal workspace</p>
            <h2 className="break-words">{data.profile}</h2>
            <p className="text-sm text-muted-foreground mt-2">{demo ? 'Demo session' : 'Personal account'} · Money OS</p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap mt-7">
          <Button onClick={() => onSelect('Account')}><UserRound size={15} />Edit profile</Button>
          <Button variant="outline" onClick={() => onSelect('Account')}>Account details<ArrowUpRight size={15} /></Button>
        </div>
      </section>
      <section className="settings-session settings-tile">
        <div className="flex items-center justify-between gap-3">
          <p className="settings-eyebrow">Your data</p><Database size={20} className="text-information" />
        </div>
        <h2 className="mt-5">{demo ? 'Session only' : 'Finance service'}</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{demo ? 'Changes clear on refresh. Secure saving is not connected.' : 'Connected to your finance service.'}</p>
        <Button variant="link" className="p-0 justify-start mt-5 self-start h-auto" onClick={() => onSelect('Data')}>Manage data<ArrowUpRight size={14} /></Button>
      </section>
      {[
        { tab: 'Money', title: 'Preferences', icon: SlidersHorizontal, detail: `${data.currency} · ${data.categories.length} categories` },
        { tab: 'Privacy', title: 'Privacy', icon: LockKeyhole, detail: 'Personal & shared money' },
        { tab: 'Notifications', title: 'Notifications', icon: Bell, detail: `${unread} unread ${unread === 1 ? 'update' : 'updates'}` },
      ].map(({ tab, title, icon: Icon, detail }) => (
        <Button key={tab} variant="outline" className="settings-shortcut settings-tile group" onClick={() => onSelect(tab)}>
          <span className="settings-shortcut-top"><span className="settings-tool-icon"><Icon size={20} /></span><ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary" /></span>
          <span className="settings-shortcut-title">{title}</span>
          <span className="settings-shortcut-detail">{detail}</span>
        </Button>
      ))}
    </div>
  );
}