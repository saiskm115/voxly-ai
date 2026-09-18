import React, { useState } from 'react';
import {
  Blocks,
  CheckCircle2,
  ExternalLink,
  Plus,
  RefreshCw,
  Key,
  Webhook
} from 'lucide-react';
import { SolidCard } from '../ui/SolidCard';
import { TactileButton } from '../ui/TactileButton';

export function IntegrationsModule() {
  const [integrations, setIntegrations] = useState([
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'CRM & Pipeline',
      description: 'Automatically creates deals, syncs call transcripts, and updates lead lifecycle stages.',
      status: 'connected',
      account: 'Apex Dental Partners (Portal: #912048)'
    },
    {
      id: 'salesforce',
      name: 'Salesforce Enterprise',
      category: 'CRM & Pipeline',
      description: 'Syncs BANT qualification scores, contacts, and custom telephony task activities.',
      status: 'disconnected',
      account: null
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      category: 'Calendar Booking',
      description: 'Allows AI voice agents to check live doctor availability and book patient slots in real-time.',
      status: 'connected',
      account: 'dr.patel@summitdental.com'
    },
    {
      id: 'cal-com',
      name: 'Cal.com / Calendly',
      category: 'Calendar Booking',
      description: 'Embeds round-robin team scheduling links directly into AI conversation turns.',
      status: 'disconnected',
      account: null
    },
    {
      id: 'slack',
      name: 'Slack Emergency Alerts',
      category: 'Alerts & Comms',
      description: 'Posts immediate alerts when a caller requests human escalation or gives negative sentiment.',
      status: 'connected',
      account: '#call-center-alerts'
    },
    {
      id: 'webhooks',
      name: 'Custom Webhook Dispatcher',
      category: 'Developer Webhooks',
      description: 'Dispatches signed JSON payloads on call.started, call.completed, and lead.qualified events.',
      status: 'connected',
      account: 'https://api.summitdental.com/v1/voice-events'
    }
  ]);

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'connected' ? 'disconnected' : 'connected',
              account: item.status === 'connected' ? null : 'Connected Workspace'
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#F7F7FB] tracking-tight">
          Integrations & Webhooks
        </h2>
        <p className="text-xs text-[#A19EAD] mt-0.5">
          Connect your CRM, calendar, and developer webhooks to synchronize conversation outcomes autonomously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((item) => {
          const isConnected = item.status === 'connected';
          return (
            <SolidCard key={item.id} className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#111019] border border-[#262438] flex items-center justify-center text-[#6344E7]">
                      <Blocks className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#F7F7FB]">{item.name}</h3>
                      <span className="text-[10px] text-[#6E6B7B] uppercase font-bold tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      isConnected
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/25'
                        : 'bg-[#111019] text-[#6E6B7B] border-[#262438]'
                    }`}
                  >
                    {isConnected ? 'Active' : 'Not Connected'}
                  </span>
                </div>

                <p className="text-xs text-[#A19EAD] leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.account && (
                  <div className="p-2 rounded-lg bg-[#111019] border border-[#262438] text-[11px] font-mono text-[#F7F7FB] truncate">
                    Target: {item.account}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#262438] flex items-center justify-between">
                <span className="text-[10px] text-[#6E6B7B]">OAuth 2.0 / SSL Encrypted</span>
                <TactileButton
                  size="xs"
                  variant={isConnected ? 'secondary' : 'primary'}
                  onClick={() => toggleConnection(item.id)}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </TactileButton>
              </div>
            </SolidCard>
          );
        })}
      </div>
    </div>
  );
}
