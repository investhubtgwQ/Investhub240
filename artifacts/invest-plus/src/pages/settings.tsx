import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import {
  User, Bell, Shield, HelpCircle, LogOut, ChevronRight,
  Globe, Moon, Eye, FileText, ExternalLink, Info
} from "lucide-react";

interface SettingsRowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}

function SettingsRow({ icon, iconBg, label, sublabel, right, onClick, danger }: SettingsRowProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className={`text-sm font-medium ${danger ? "text-red-500" : "text-gray-900"}`}>{label}</div>
        {sublabel && <div className="text-xs text-gray-400 mt-0.5">{sublabel}</div>}
      </div>
      {right ?? <ChevronRight className="w-4 h-4 text-gray-300" />}
    </button>
  );
}

export default function Settings() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
        {isAuthenticated && user && (
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.fullName?.charAt(0).toUpperCase() ?? "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 truncate">{user.fullName}</div>
              <div className="text-sm text-gray-400 truncate">{user.email}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferences</span>
        </div>
        <div className="bg-white rounded-2xl mx-4 overflow-hidden divide-y divide-gray-50">
          <SettingsRow
            icon={<Globe className="w-4 h-4 text-blue-500" />}
            iconBg="bg-blue-50"
            label="Language"
            sublabel="English"
            right={<span className="text-sm text-gray-400 mr-1">English</span>}
          />
          <SettingsRow
            icon={<Moon className="w-4 h-4 text-indigo-500" />}
            iconBg="bg-indigo-50"
            label="Appearance"
            sublabel="Light mode"
            right={
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 mr-1">Light</span>
              </div>
            }
          />
          <SettingsRow
            icon={<Eye className="w-4 h-4 text-purple-500" />}
            iconBg="bg-purple-50"
            label="Hide Balance"
            sublabel="Show balance as ****"
            right={
              <div className="w-11 h-6 bg-gray-200 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm" />
              </div>
            }
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Notifications</span>
        </div>
        <div className="bg-white rounded-2xl mx-4 overflow-hidden divide-y divide-gray-50">
          <SettingsRow
            icon={<Bell className="w-4 h-4 text-orange-500" />}
            iconBg="bg-orange-50"
            label="Push Notifications"
            sublabel="Price alerts, transaction updates"
            right={
              <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
              </div>
            }
          />
          <SettingsRow
            icon={<Bell className="w-4 h-4 text-green-500" />}
            iconBg="bg-green-50"
            label="Email Notifications"
            sublabel="Investment returns, deposits"
            right={
              <div className="w-11 h-6 bg-blue-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
              </div>
            }
          />
        </div>
      </div>

      {/* Security */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Security</span>
        </div>
        <div className="bg-white rounded-2xl mx-4 overflow-hidden divide-y divide-gray-50">
          <SettingsRow
            icon={<Shield className="w-4 h-4 text-green-500" />}
            iconBg="bg-green-50"
            label="Two-Factor Authentication"
            sublabel="Add extra layer of security"
          />
          <SettingsRow
            icon={<Shield className="w-4 h-4 text-yellow-500" />}
            iconBg="bg-yellow-50"
            label="Change Password"
            sublabel="Update your account password"
          />
        </div>
      </div>

      {/* About */}
      <div className="mt-4">
        <div className="px-4 mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">About</span>
        </div>
        <div className="bg-white rounded-2xl mx-4 overflow-hidden divide-y divide-gray-50">
          <SettingsRow
            icon={<HelpCircle className="w-4 h-4 text-blue-500" />}
            iconBg="bg-blue-50"
            label="Help & Support"
            sublabel="FAQs and contact"
          />
          <SettingsRow
            icon={<FileText className="w-4 h-4 text-gray-500" />}
            iconBg="bg-gray-100"
            label="Terms of Service"
            right={<ExternalLink className="w-4 h-4 text-gray-300" />}
          />
          <SettingsRow
            icon={<Info className="w-4 h-4 text-gray-500" />}
            iconBg="bg-gray-100"
            label="App Version"
            right={<span className="text-sm text-gray-400 mr-1">1.0.0</span>}
          />
        </div>
      </div>

      {/* Logout */}
      <div className="mt-4 mx-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl px-4 py-4 flex items-center gap-3 hover:bg-red-50 active:bg-red-100 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-sm font-semibold text-red-500">Log Out</span>
        </button>
      </div>
    </div>
  );
}
