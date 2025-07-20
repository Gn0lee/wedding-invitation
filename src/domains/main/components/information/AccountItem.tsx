'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface AccountInfo {
  name: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export function AccountItem({ account }: { account: AccountInfo }) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('계좌번호가 복사되었습니다');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('복사에 실패했습니다');
    }
  };

  return (
    <div className="mb-3 flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex-1 space-y-1">
        <div className="text-lg font-bold text-white drop-shadow-sm">{account.name}</div>
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <span>{account.bank}</span>
          <span className="text-gray-400">•</span>
          <span>{account.accountHolder}</span>
        </div>
        <div className="font-mono text-base font-medium tracking-wide text-gray-100">
          {account.accountNumber}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(account.accountNumber)}
        className="ml-3 text-gray-300 hover:bg-white/10 hover:text-white"
      >
        <Copy className="size-5" />
      </Button>
    </div>
  );
}
