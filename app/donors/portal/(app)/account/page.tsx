"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  UserCircle2,
  Mail,
  Phone,
  CalendarHeart,
  Save,
  Bell,
  ShieldCheck,
  HelpCircle,
  Heart,
  CheckCircle2,
} from "lucide-react";
import {
  PageHeader,
  Card,
  PrimaryButton,
  GhostButton,
} from "@/components/donor/ui";
import { me, fmtKSh } from "@/data/donor";

export default function AccountPage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2400);
  }

  return (
    <div>
      <PageHeader
        eyebrow="My Profile"
        title="Your account"
        description="Update how we reach you, set your giving preferences, and review your record with us."
        actions={
          saved ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-emerald-700">
              <CheckCircle2 size={13} strokeWidth={2.5} /> Saved
            </span>
          ) : (
            <PrimaryButton icon={Save} onClick={save}>
              Save Changes
            </PrimaryButton>
          )
        }
      />

      <div className="mx-auto max-w-[1100px] space-y-6 px-5 py-7 md:px-8 md:py-10">
        {/* Identity */}
        <Card eyebrow="Who you are" title="Personal Details">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {session?.user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name || "Donor"}
                className="h-20 w-20 rounded-full border-2 border-amber-200 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-700">
                {(session?.user?.name?.[0] || me.shortName[0]).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-lg font-bold text-slate-900">
                {session?.user?.name || me.name}
              </p>
              <p className="text-[12px] text-slate-500">
                Donor ID · <span className="font-mono">{me.id}</span> · Member since{" "}
                {me.joined}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field
              icon={UserCircle2}
              label="Full Name"
              defaultValue={session?.user?.name || me.name}
            />
            <Field
              icon={Mail}
              label="Email"
              type="email"
              defaultValue={session?.user?.email || me.email}
            />
            <Field icon={Phone} label="Phone (M-Pesa)" defaultValue={me.phone} />
            <Field
              icon={CalendarHeart}
              label="Preferred Giving Day"
              defaultValue="27th of each month"
            />
          </div>
        </Card>

        {/* Communication preferences */}
        <Card eyebrow="How we reach you" title="Communication Preferences">
          <div className="space-y-3">
            <Toggle label="Monthly progress email" defaultChecked />
            <Toggle label="Photos & report cards from sponsored children" defaultChecked />
            <Toggle label="SMS receipts after every gift" defaultChecked />
            <Toggle label="Special appeals (only when truly urgent)" defaultChecked={false} />
          </div>
        </Card>

        {/* My giving snapshot */}
        <Card eyebrow="Your record with us" title="Giving Snapshot">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Snapshot label="Lifetime" value={fmtKSh(me.totalGiven)} />
            <Snapshot label="This Year" value={fmtKSh(me.thisYear)} />
            <Snapshot label="Sponsorships" value={String(me.activeSponsorships)} />
            <Snapshot label="Projects" value={String(me.projectsBacked)} />
          </div>
        </Card>

        {/* Security */}
        <Card eyebrow="Account safety" title="Security">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ShieldCheck size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-900">
                  Password
                </p>
                <p className="text-[12px] text-slate-500">
                  Last changed a long time ago. We recommend a refresh.
                </p>
              </div>
            </div>
            <GhostButton>Change Password</GhostButton>
          </div>
        </Card>

        {/* Help */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-700">
                <HelpCircle size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-amber-900">
                  Stuck on something?
                </p>
                <p className="text-[12.5px] text-amber-800/80">
                  Mr. Noah Mweruphe personally handles donor requests. He&apos;ll
                  reply by email, usually within the day.
                </p>
              </div>
            </div>
            <a
              href="mailto:excellentkenya@gmail.com?subject=Help%20with%20my%20donor%20account"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-700"
            >
              <Heart size={14} strokeWidth={2.25} />
              Email the Director
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  type = "text",
  defaultValue,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-amber-400">
        <Icon size={14} className="text-slate-400" strokeWidth={2} />
        <input
          type={type}
          defaultValue={defaultValue}
          className="w-full bg-transparent text-[13px] text-slate-900 outline-none"
        />
      </div>
    </label>
  );
}

function Toggle({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <span className="flex items-center gap-2 text-[13px] text-slate-700">
        <Bell size={13} strokeWidth={2} className="text-slate-400" />
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition ${
          on ? "bg-amber-600" : "bg-slate-300"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}
