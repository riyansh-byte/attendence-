import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type { AuthUser, UserRole } from "@/types";

// ─────────────────────────────────────────
// Auth Store
// ─────────────────────────────────────────

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "attendai-auth",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// ─────────────────────────────────────────
// UI Store
// ─────────────────────────────────────────

interface UIState {
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  mobileMenuOpen: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      mobileMenuOpen: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
      setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
    }),
    {
      name: "attendai-ui",
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
);

// ─────────────────────────────────────────
// Attendance Store
// ─────────────────────────────────────────

import type { AttendanceRecord, AttendanceStatus } from "@/types";

interface AttendanceSessionDraft {
  sessionId: string | null;
  classId: string | null;
  date: string;
  records: Record<string, AttendanceStatus>; // studentId → status
  isDirty: boolean;
  isSaving: boolean;
}

interface AttendanceState {
  draft: AttendanceSessionDraft;
  setSession: (sessionId: string, classId: string, date: string) => void;
  markStudent: (studentId: string, status: AttendanceStatus) => void;
  markAll: (studentIds: string[], status: AttendanceStatus) => void;
  setSaving: (isSaving: boolean) => void;
  clearDraft: () => void;
}

const defaultDraft: AttendanceSessionDraft = {
  sessionId: null,
  classId: null,
  date: new Date().toISOString().split("T")[0],
  records: {},
  isDirty: false,
  isSaving: false,
};

export const useAttendanceStore = create<AttendanceState>()(
  subscribeWithSelector((set) => ({
    draft: defaultDraft,
    setSession: (sessionId, classId, date) =>
      set({ draft: { ...defaultDraft, sessionId, classId, date } }),
    markStudent: (studentId, status) =>
      set((s) => ({
        draft: {
          ...s.draft,
          records: { ...s.draft.records, [studentId]: status },
          isDirty: true,
        },
      })),
    markAll: (studentIds, status) =>
      set((s) => ({
        draft: {
          ...s.draft,
          records: Object.fromEntries(studentIds.map((id) => [id, status])),
          isDirty: true,
        },
      })),
    setSaving: (isSaving) =>
      set((s) => ({ draft: { ...s.draft, isSaving } })),
    clearDraft: () => set({ draft: defaultDraft }),
  }))
);

// ─────────────────────────────────────────
// Notification Store
// ─────────────────────────────────────────

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  decrementUnread: () => void;
  clearUnread: () => void;
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  unreadCount: 2,
  setUnreadCount: (unreadCount) => set({ unreadCount }),
  decrementUnread: () => set((s) => ({ unreadCount: Math.max(0, s.unreadCount - 1) })),
  clearUnread: () => set({ unreadCount: 0 }),
}));
