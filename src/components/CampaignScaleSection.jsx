import React, { useState } from 'react';
import {
  UploadCloud,
  Users,
  Rocket,
  PhoneCall,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Play,
  FileSpreadsheet
} from 'lucide-react';
import { CAMPAIGN_WORKFLOW } from '../data/siteContent';

const STEP_ICONS = [
  UploadCloud,
  Users,
  Rocket,
  PhoneCall,
  BarChart3,
];

export function CampaignScaleSection({ onGetStarted }) {
  const [campaignProgress, setCampaignProgress] = useState(88);

  return (
    <section id="campaigns" className="py-24 sm:py-32 bg-[#FAF9FD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE7FF] border border-[#7657E8]/15 text-[#7657E8] text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Bulk Campaign Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171522] tracking-tight mb-4">
            One list.{' '}
            <span className="gradient-text-lavender">Thousands of conversations.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B7D] leading-relaxed">
            {CAMPAIGN_WORKFLOW.subtitle}
          </p>
        </div>

        {/* 5-Step Visual Workflow: Upload Contacts -> Select Employee -> Launch -> AI Calls -> Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16 max-w-6xl mx-auto">
          {CAMPAIGN_WORKFLOW.steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx] || Rocket;
            return (
              <div
                key={step.num}
                className="bg-white p-5 rounded-2xl border border-[#7657E8]/15 shadow-sm hover:shadow-md transition-shadow relative flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center font-bold text-sm mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#7657E8] uppercase tracking-wider mb-1">
                  Step {step.num}
                </span>
                <h4 className="text-sm font-bold text-[#171522] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-[#6F6B7D] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Campaign Command Center Dashboard */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#7657E8]/20 shadow-xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#7657E8]/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] text-[#7657E8] flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#171522]">
                  {CAMPAIGN_WORKFLOW.mockCampaign.name}
                </h4>
                <p className="text-xs text-[#6F6B7D]">
                  Assigned Employee: Harish Patel (Senior Sales AI) • Priority Calling Windows
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#20B486]/10 text-[#20B486] border border-[#20B486]/20">
              <span className="w-2 h-2 rounded-full bg-[#20B486] animate-pulse" />
              Campaign Active & Running
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-[#171522]">Live Progress ({campaignProgress}%)</span>
              <span className="text-[#7657E8]">{CAMPAIGN_WORKFLOW.mockCampaign.callsPlaced} / {CAMPAIGN_WORKFLOW.mockCampaign.totalContacts} Contacts Reached</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#EDE7FF] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] rounded-full transition-all duration-500"
                style={{ width: `${campaignProgress}%` }}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/10">
              <span className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Connected Calls</span>
              <span className="text-xl font-extrabold text-[#171522]">{CAMPAIGN_WORKFLOW.mockCampaign.connectedCalls}</span>
            </div>
            <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/10">
              <span className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Qualified Leads</span>
              <span className="text-xl font-extrabold text-[#7657E8]">{CAMPAIGN_WORKFLOW.mockCampaign.qualifiedLeads}</span>
            </div>
            <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/10">
              <span className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Booked Meetings</span>
              <span className="text-xl font-extrabold text-[#20B486]">{CAMPAIGN_WORKFLOW.mockCampaign.meetingsBooked}</span>
            </div>
            <div className="bg-[#FAF9FD] p-4 rounded-2xl border border-[#7657E8]/10">
              <span className="text-[10px] font-bold text-[#6F6B7D] uppercase tracking-wider block mb-1">Conversion Rate</span>
              <span className="text-xl font-extrabold text-[#171522]">{CAMPAIGN_WORKFLOW.mockCampaign.conversionRate}</span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-2">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#7657E8] to-[#9B7BF7] hover:from-[#6A47E5] hover:to-[#8E6DF5] shadow-lg shadow-[#7657E8]/30 transition-all hover:-translate-y-0.5"
            >
              <span>Create a campaign</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
