'use client';

import { SiGithub, SiInstagram, SiFacebook, SiLine } from '@icons-pack/react-simple-icons';
import { Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { Button } from '@/components/ui/button';
import { type ContactPerson } from '@/domains/main/components/information/data';

// 연락처 타입별 아이콘 매핑
const contactIcons = {
  phone: Phone,
  email: Mail,
  'linked-in': LinkedInIcon,
  github: SiGithub,
  instagram: SiInstagram,
  facebook: SiFacebook,
  line: SiLine,
} as const;

// 연락처 타입별 동작 함수
const contactActions = {
  phone: (value: string) => {
    window.location.href = `tel:${value}`;
  },
  email: (value: string) => {
    window.location.href = `mailto:${value}`;
  },
  'linked-in': (value: string) => {
    window.open(`https://linkedin.com/in/${value}`, '_blank');
  },
  github: (value: string) => {
    window.open(`https://github.com/${value}`, '_blank');
  },
  instagram: (value: string) => {
    window.open(`https://instagram.com/${value}`, '_blank');
  },
  facebook: (value: string) => {
    window.open(`https://facebook.com/${value}`, '_blank');
  },
  line: (value: string) => {
    window.open(`https://line.me/ti/p/${value}`, '_blank');
  },
} as const;

export function ContactItem({ contact }: { contact: ContactPerson }) {
  const handleContactClick = (type: keyof typeof contactActions, value: string) => {
    try {
      contactActions[type](value);
    } catch (err) {
      console.error('Failed to open contact:', err);
      toast.error('연락처를 열 수 없습니다');
    }
  };

  return (
    <div className="mb-3 flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex-1 space-y-1">
        <div className="text-lg font-bold text-white drop-shadow-sm">{contact.role}</div>
        <div className="text-sm text-gray-300">{contact.fullName}</div>
      </div>
      <div className="flex gap-2">
        {contact.contacts.map((contactInfo, index) => {
          const IconComponent = contactIcons[contactInfo.type];

          return (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => handleContactClick(contactInfo.type, contactInfo.value)}
              className="size-8 text-gray-300 hover:bg-white/10 hover:text-white [&_svg]:size-5 [&_svg]:shrink-0"
              title={contactInfo.type}
            >
              <IconComponent />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
